import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import shops from "./shops.json";
import styled, { createGlobalStyle } from "styled-components";

// 🍫 Bigger emoji marker (48px)
const chocolateIcon = L.divIcon({
  className: "custom-icon",
  html: "<div style='font-size: 2.2rem'>🍫</div>",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

// 🌿 Global styles + mobile fixes
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    background: linear-gradient(180deg, #5c3d2e, #fefae0); /* chocolate gradient */
    color: #2f4f2f;
    overflow: hidden;
    -webkit-overflow-scrolling: none;
    touch-action: none; /* prevent buggy scrolling/tap issues */
  }

  .leaflet-container {
    height: 100% !important;
    width: 100% !important;
  }
`;

// 📱 Floating App Title
// 📱 Floating App Title
const FloatingTitle = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(78, 42, 21, 0.9); /* chocolate brown */
  color: #fff8f0; /* softer off-white for text */
  padding: 0.6rem 1.2rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;


// 🗺️ Map wrapper with rounded corners
const MapWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;

  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;

// ✨ Popup styling
const PopupContent = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #2f4f2f;

  b {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.2rem;
    color: #4e2a15;
  }

  small {
    font-size: 0.8rem;
    color: #555;
  }

  a {
    display: inline-block;
    margin-top: 0.6rem;
    padding: 0.6rem 1rem;
    background: #4e2a15;
    color: #fff;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.85rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  a:hover {
    background: #63391d;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <FloatingTitle>Chocolate Scanner</FloatingTitle>

      <MapWrapper>
        <MapContainer
          center={[41.0082, 28.9784]} // Istanbul
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          tap={false} // fix mobile tap bug
        >
          {/* Softer tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {shops.map((shop, i) => (
            <Marker key={i} position={[shop.lat, shop.lng]} icon={chocolateIcon}>
              <Popup>
                <PopupContent>
                  <b>{shop.name}</b>
                  <small>{shop.address}</small>
                  <br />
                  <a href={shop.mapsUrl} target="_blank" rel="noreferrer">
                    📍 Open in Maps
                  </a>
                </PopupContent>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </>
  );
}

export default App;
