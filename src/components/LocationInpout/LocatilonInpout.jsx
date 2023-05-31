import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const LocatilonInpout = ({setPosition}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setSelectedLocation({ lat: latitude, lng: longitude });
          setPosition({ lat: latitude, lng: longitude });; // Set the initial selected location to the user's current position
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
    setPosition({ lat: lat(), lng: lng() });
    console.log('Latitude:', lat());
    console.log('Longitude:', lng());
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBMdJiJiIeDOaRZyGQNXozOAr9tYRDqAzM">
      {userLocation && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={selectedLocation || userLocation} // Use the selected location as the center of the map, fallback to user's current location if selected location is not available
          zoom={15}
          onClick={handleMarkerClick}
        >
          

          {/* Display the selected location marker */}
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LocatilonInpout;
