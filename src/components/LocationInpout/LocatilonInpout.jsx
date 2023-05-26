import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const LocatilonInpout = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleMarkerClick = event => {
    // Handle marker click and retrieve the selected location
    const { lat, lng } = event.latLng;
    setSelectedLocation({ lat: lat(), lng: lng() });

    // Log the coordinates
    console.log('Latitude:', lat());
    console.log('Longitude:', lng());
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBMdJiJiIeDOaRZyGQNXozOAr9tYRDqAzM">
      {userLocation && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={userLocation}
          zoom={15}
          onClick={handleMarkerClick}
        >
          {/* Display the user's location marker */}
          <Marker position={userLocation} />

          {/* Display the selected location marker */}
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LocatilonInpout;



