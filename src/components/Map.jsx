import { useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";

function Map() {
  /* const { cityId } = useParams();
  const [searchQuery, setSearchQuery] = useSearchParams();

  const lat = searchQuery.get("lat");
  const lng = searchQuery.get("lng"); */
  const [centerPosition, setCenterPosition] = useState([40, 40]);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={centerPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={centerPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
