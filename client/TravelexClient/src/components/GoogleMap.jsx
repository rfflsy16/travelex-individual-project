import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function Location() {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setPosition(userLocation);
        },
        () => {
          alert("Lokasi tidak dapat ditemukan. Menggunakan lokasi default.");
          setPosition(center);
        }
      );
    } else {
      setPosition(center);
    }
  }, []);

  if (!position) {
    return <div>Memuat lokasi...</div>;
  }

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const circle = new window.google.maps.Circle({
          center: { lat: latitude, lng: longitude },
          radius: 50000,
        });
        autocompleteRef.current.setBounds(circle.getBounds());
      });
    }
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setPosition(newPosition);
        map.panTo(newPosition);
        new window.google.maps.Marker({
          position: newPosition,
          map: map,
        });
      }
    }
  };

  const locateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setPosition(newPosition);
          map.panTo(newPosition);
          new window.google.maps.Marker({
            position: newPosition,
            map: map,
          });
        },
        () => alert("Lokasi tidak dapat ditemukan.")
      );
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCEbN8cyVZsw4vP6KdP7giQdhhgE_bsGXQ"
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
        onLoad={(map) => setMap(map)}
        options={{
          mapTypeId: "roadmap",
          tilt: 0,
        }}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Cari lokasi..."
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "240px",
              height: "40px",
              padding: "0 12px",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              outline: "none",
              textOverflow: "ellipses",
              position: "absolute",
              left: "10px",
              top: "10px",
              backgroundColor: "white",
            }}
          />
        </Autocomplete>
        <button
          onClick={locateMe}
          style={{
            position: "absolute",
            top: "10px",
            left: "260px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#45a049")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#4CAF50")
          }
        >
          Cari Lokasi Saya
        </button>
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
}
