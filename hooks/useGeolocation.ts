import { useState, useEffect } from 'react';
import { GeolocationState } from '../types';

const useGeolocation = (): GeolocationState => {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      let errorMessage = 'Failed to retrieve location.';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please enable it in your browser settings.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "The request to get user location timed out.";
          break;
      }
      setLocation((prev) => ({ ...prev, error: errorMessage }));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }, []);

  return location;
};

export default useGeolocation;
