// src/components/MapModal.jsx
import { useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function MapModal({ destination, onClose }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 p-4" ref={mapRef}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Lokasi: {destination.name}
        </h3>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: destination.latitude,
            lng: destination.longitude,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat: destination.latitude,
              lng: destination.longitude,
            }}
          />
        </GoogleMap>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
