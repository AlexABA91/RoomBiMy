import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./mapInf.module.css";

const MapInf = ({ ingMap, latMap }) => {
  const position = [ingMap, latMap];
  const marker = {
    geocode: [ingMap, latMap],
    customIcon: new window.L.divIcon({
      className: "custom-marker",
      html: `<div class="custom-marker-content-page-info-root"><div class="custom-marker-content-page-info"></div></div>`,
    }),
  };
  return (
    <MapContainer center={position} zoom={10} className={style.mapContainer}>
      <TileLayer
        attribution={`<p class="tileLayer" >RoomBi Map</p>`}
        url={"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
      />
      <Marker position={marker.geocode} icon={marker.customIcon}></Marker>
    </MapContainer>
  );
};

export { MapInf };
