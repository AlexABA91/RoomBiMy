import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./mapMain.module.css";
import { useAppSelector } from "@/app/redux/hook";
import { CardMap } from "@/app/components/map-main/card-map/CardMap";

const MapMain = () => {
  const apartments = useAppSelector(
    (state) => state.apartmentsReducer.apartmentsMap
  );

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Помилка отримання місцезнаходження:", error);
      }
    );
  }, []);

  if (userPosition === null) {
    return <p>Завантаження...</p>;
  }
  // Створюємо масив з маркерами та їх даними
  const markers = [];
  for (let i = 0; i < apartments.length; i++) {
    const marcer = {
      geocode: [apartments[i].ingMap, apartments[i].latMap],
      apartment: apartments[i],
      customIcon: new window.L.divIcon({
        className: "custom-marker",
        html: `<div class="custom-marker-content"><p class="custom-marker-txt">$${apartments[i].pricePerNight}</p></div>`,
      }),
    };
    markers.push(marcer);
  }

  return (
    <div className={style.mapContainer}>
      <MapContainer
        center={userPosition}
        zoom={6}
        style={{ height: "70vh", width: "99vw" }}
      >
        <TileLayer
          attribution={`<p class="tileLayer" >RoomBi Map</p>`}
          url={"https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.geocode}
            icon={marker.customIcon}
          >
            <Popup>
              <CardMap {...marker.apartment} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export { MapMain };
