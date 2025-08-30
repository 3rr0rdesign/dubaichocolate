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

// 🌿 Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Helvetica Neue", Arial, sans-serif;
    background: linear-gradient(180deg, #f4fff4, #ffffff);
    color: #2f4f2f;
    height: 100vh;
    overflow: hidden;
  }
`;

// 📱 Floating App Title
const FloatingTitle = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(47, 79, 47, 0.9);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

// 🗺️ Map wrapper
const MapWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

// ✨ Popup styling
const PopupContent = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: #2f4f2f;

  b {
    font-size: 1.05rem;
    color: #006400;
  }

  a {
    display: inline-block;
    margin-top: 0.6rem;
    padding: 0.5rem 0.8rem;
    background: #2f4f2f;
    color: #fff;
    border-radius: 10px;
    text-decoration: none;
    font-size: 0.85rem;
  }

  a:hover {
    background: #3b6e3b;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <FloatingTitle>🍫 Dubai Chocolate Map 🌿</FloatingTitle>

      <MapWrapper>
        <MapContainer
          center={[41.0082, 28.9784]} // Istanbul
          zoom={12}
          style={{ height: "100%", width: "100%" }}
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
                  <b>{shop.name}</b> <br />
                  {shop.address} <br />
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
