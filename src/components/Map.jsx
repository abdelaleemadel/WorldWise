import { useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const { cityId } = useParams();
  const [searchQuery, setSearchQuery] = useSearchParams();

  const lat = searchQuery.get("lat");
  const lng = searchQuery.get("lng");

  return (
    <div className={styles.mapContainer}>
      <p>cityId : {cityId}</p>
      <p>position lat: {lat}</p>
      <p>position lng: {lng}</p>
    </div>
  );
}

export default Map;
