import React, { useState } from 'react';
import { analyzeSkin } from '../services/geminiService';
import { SkinAnalysisResult } from '../types';
import LoadingSpinner from './LoadingSpinner';
import useGeolocation from '../hooks/useGeolocation';

interface SkinAnalysisProps {
  onAnalysisComplete: (result: SkinAnalysisResult) => void;
}

const SkinAnalysis: React.FC<SkinAnalysisProps> = ({ onAnalysisComplete }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const location = useGeolocation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const analysisResult = await analyzeSkin(imageFile, location.latitude, location.longitude);
      setResult(analysisResult);
      onAnalysisComplete(analysisResult);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze skin. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #67E8F9',
    borderRadius: '0.75rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    backgroundColor: '#F0FDFA'
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Get Your Personalized Skin Analysis</h2>
        <p className="mt-2 text-lg text-gray-600">Upload a clear, well-lit selfie to get started.</p>
      </div>

      <div
        className="relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if(file) {
            handleFileChange({ target: { files: [file] } } as any);
          }
        }}
      >
        <input
          type="file"
          id="selfie-upload"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
        <label htmlFor="selfie-upload" style={dropzoneStyles}>
          {imagePreview ? (
            <img src={imagePreview} alt="Your selfie" className="mx-auto h-64 w-64 object-cover rounded-lg" />
          ) : (
            <div className="text-cyan-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1-1m6-3l2 2m-1.5-7.5l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm">PNG, JPG, or WEBP</p>
            </div>
          )}
        </label>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleAnalyze}
          disabled={!imageFile || loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze My Skin'}
        </button>
      </div>
      
      {location.error && <p className="mt-4 text-center text-orange-500 text-sm">Note: {location.error} Providing general environmental advice.</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {loading && <LoadingSpinner />}

      {result && !loading && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800">Analysis Results</h3>
            <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg"><strong className="text-cyan-600">Skin Type:</strong> {result.skinType}</p>
                </div>
                <div>
                    <strong className="text-cyan-600">Concerns:</strong>
                    <ul className="list-disc list-inside ml-4">
                        {result.concerns.map((concern, index) => <li key={index}>{concern}</li>)}
                    </ul>
                </div>
                <div>
                    <strong className="text-cyan-600">Environmental Tip:</strong>
                    <p className="mt-1 text-gray-600">{result.environmentalAdvice}</p>
                </div>
            </div>
            <p className="mt-6 text-sm text-gray-500">Go to the Recommendations tab to see your personalized product suggestions.</p>
        </div>
      )}
    </div>
  );
};

export default SkinAnalysis;