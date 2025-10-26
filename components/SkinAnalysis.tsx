import React, { useState } from 'react';
import { analyzeSkin } from '../services/geminiService';
import { SkinAnalysisResult } from '../types';
import LoadingSpinner from './LoadingSpinner';
import useGeolocation from '../hooks/useGeolocation';

interface SkinAnalysisProps {
  onAnalysisComplete: (result: SkinAnalysisResult) => void;
}

interface ImageData {
  file: File;
  preview: string;
  id: string;
}

const SkinAnalysis: React.FC<SkinAnalysisProps> = ({ onAnalysisComplete }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const location = useGeolocation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage: ImageData = {
            file,
            preview: reader.result as string,
            id: Date.now().toString() + Math.random()
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });
      setResult(null);
      setError(null);
      event.target.value = '';
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleAnalyze = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image first.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Use the first image for analysis
      const analysisResult = await analyzeSkin(images[0].file, location.latitude, location.longitude);
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
    border: 'none',
    borderRadius: '0.75rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: '#F9FAFB'
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Get Your Personalized Skin Analysis</h2>
        <p className="mt-2 text-lg text-gray-600">Upload a clear, well-lit selfie to get started.</p>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <img
                src={img.preview}
                alt="Uploaded"
                className="w-full h-40 object-cover rounded-xl"
              />
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Delete image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        className="relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          if(files) {
            handleFileChange({ target: { files } } as any);
          }
        }}
      >
        <input
          type="file"
          id="selfie-upload"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleFileChange}
        />
        <label htmlFor="selfie-upload" style={dropzoneStyles}>
          <div className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="mt-4 font-light text-lg">
              {images.length > 0 ? 'Add more photos' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-sm text-gray-500 font-light mt-1">PNG, JPG, or WEBP</p>
          </div>
        </label>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleAnalyze}
          disabled={images.length === 0 || loading}
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