import React, { useState, useEffect } from 'react';
import { analyzeSkin } from '../services/geminiService';
import { SkinAnalysisResult } from '../types';
import LoadingSpinner from './LoadingSpinner';
import useGeolocation from '../hooks/useGeolocation';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface SkinAnalysisProps {
  onAnalysisComplete: (result: SkinAnalysisResult) => void;
}

interface ImageData {
  file: File;
  preview: string;
  id: string;
}

interface SavedPhoto {
  id: string;
  image_url: string;
  created_at: string;
  analysis_result?: SkinAnalysisResult;
  product_recommendations?: any;
}

const SkinAnalysis: React.FC<SkinAnalysisProps> = ({ onAnalysisComplete }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);
  const [showJourney, setShowJourney] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>('');
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const location = useGeolocation();
  const { user } = useAuth();

  // Load saved photos
  useEffect(() => {
    if (user) {
      loadSavedPhotos();
    }
  }, [user]);

  // Fetch city name when location is available
  useEffect(() => {
    const getCityName = async () => {
      if (location.latitude && location.longitude) {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          const city = data.city || data.locality || 'Your location';
          const region = data.principalSubdivision || '';
          setCityName(region ? `${city}, ${region}` : city);
        } catch {
          setCityName('Your location');
        }
      }
    };
    getCityName();
  }, [location.latitude, location.longitude]);

  const loadSavedPhotos = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('skin_journey')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSavedPhotos(data);
    }
  };

  const deleteJourneyEntry = async (id: string) => {
    if (!user) return;

    const confirmed = window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const { error: deleteError } = await supabase
        .from('skin_journey')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        setError('Failed to delete entry');
      } else {
        await loadSavedPhotos();
        setError('✅ Entry deleted successfully');
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete entry');
    } finally {
      setDeletingId(null);
    }
  };

  const saveToJourney = async () => {
    console.log('Save button clicked');
    console.log('User:', user);
    console.log('Images:', images.length);
    console.log('Result:', result);

    if (!user) {
      setError('You must be signed in to save photos');
      return;
    }

    if (images.length === 0) {
      setError('No image to save');
      return;
    }

    if (!result) {
      setError('Please complete an analysis first');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      console.log('Starting save process...');

      // Convert image to base64 and save directly to database
      const file = images[0].file;
      const reader = new FileReader();

      const base64Image = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      console.log('Image converted to base64, length:', base64Image.length);

      // Save to database with base64 image
      const { data, error: dbError } = await supabase
        .from('skin_journey')
        .insert({
          user_id: user.id,
          image_url: base64Image,
          analysis_result: result
        })
        .select();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Save successful:', data);

      await loadSavedPhotos();
      setError('✅ Photo saved successfully! Check "My Skin Journey" tab.');
      setTimeout(() => setError(null), 5000);
      setShowJourney(true);
    } catch (err: any) {
      console.error('Save error:', err);
      setError('❌ Failed to save photo: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

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
      {/* Toggle between analysis and journey */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setShowJourney(false)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            !showJourney
              ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          New Analysis
        </button>
        <button
          onClick={() => setShowJourney(true)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            showJourney
              ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          My Skin Journey ({savedPhotos.length})
        </button>
      </div>

      {showJourney ? (
        /* Skin Journey View */
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">My Skin Journey</h2>
            <p className="mt-2 text-lg text-gray-600">Track your skin progress over time</p>
          </div>

          {savedPhotos.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-gray-600">No photos saved yet</p>
              <p className="mt-2 text-sm text-gray-500">Complete an analysis and save your photos to track your progress</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {savedPhotos.map((photo) => {
                console.log('Photo data:', {
                  id: photo.id,
                  has_image: !!photo.image_url,
                  image_length: photo.image_url?.length,
                  image_preview: photo.image_url?.substring(0, 100)
                });
                return (
                <div key={photo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteJourneyEntry(photo.id)}
                    disabled={deletingId === photo.id}
                    className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all disabled:opacity-50"
                    title="Delete entry"
                  >
                    {deletingId === photo.id ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>

                  <div className="md:flex">
                    {photo.image_url && photo.image_url.length > 0 ? (
                      <div className="relative w-full md:w-1/3 h-64 cursor-pointer group" onClick={() => setEnlargedImage(photo.image_url)}>
                        <img
                          src={photo.image_url}
                          alt="Skin journey"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', photo.image_url?.substring(0, 100));
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {/* Zoom overlay */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full md:w-1/3 h-64 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No image</p>
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <p className="text-sm text-gray-500 mb-4">
                        {new Date(photo.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>

                      {photo.analysis_result && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Analysis</h4>
                          <p className="text-sm mb-2"><span className="font-semibold text-cyan-600">Skin Type:</span> {photo.analysis_result.skinType}</p>
                          <div className="flex flex-wrap gap-1">
                            {photo.analysis_result.concerns.map((concern, idx) => (
                              <span key={idx} className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full">
                                {concern}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {photo.product_recommendations && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Recommended Products</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold text-cyan-600">Cleanser:</span> {photo.product_recommendations.cleanser?.name}</p>
                            <p><span className="font-semibold text-cyan-600">Serum:</span> {photo.product_recommendations.serum?.name}</p>
                            <p><span className="font-semibold text-cyan-600">Moisturizer:</span> {photo.product_recommendations.moisturizer?.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Analysis View */
        <>
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
          capture="user"
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

      {/* Environmental Context Display */}
      {images.length > 0 && !loading && !result && (
        <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {location.latitude && location.longitude && cityName ? (
                  <>
                    📍 Analyzing from: <span className="text-cyan-600">{cityName}</span>
                  </>
                ) : (
                  <>
                    📍 Location access {location.error ? 'disabled' : 'detecting...'}
                  </>
                )}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {location.latitude && location.longitude ? (
                  "We'll factor in your local climate, humidity, and pollution levels for personalized recommendations."
                ) : (
                  "Enable location for environmental insights tailored to your area."
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {location.error && <p className="mt-4 text-center text-orange-500 text-sm">Note: {location.error} Providing general environmental advice.</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {loading && (
        <div className="mt-8">
          <LoadingSpinner />
          <p className="text-center mt-4 text-gray-600 animate-pulse">
            Analyzing your skin with AI...
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            This may take a few seconds
          </p>
        </div>
      )}

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
            <div className="mt-6 flex gap-4">
              <button
                onClick={saveToJourney}
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-medium py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save to My Journey'}
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">Go to the Recommendations tab to see your personalized product suggestions.</p>
        </div>
      )}
        </>
      )}

      {/* Image Enlargement Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <button
            onClick={() => setEnlargedImage(null)}
            className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-75 hover:bg-opacity-100 rounded-full p-3 transition-all"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default SkinAnalysis;