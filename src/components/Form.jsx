// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";
import Button from "./Button";
import { useCities } from "../contexts/CitiesProvider";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [isGeocodingError, setIsGeocodingError] = useState("");
  const [emoji, setEmoji] = useState(null);

  const [lat, lng] = useUrlPosition();
  const { isLoading, createCity } = useCities();
  const navigate = useNavigate();

  /* Get City details */
  useEffect(
    function () {
      async function getCityDetails() {
        try {
          setIsLoadingGeocoding(true);
          setIsGeocodingError("");
          const res = await fetch(
            `${BASE_URL}latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          const { city, countryCode, countryName, locality } = data;
          if (!countryName)
            throw new Error(
              "That doesn't seem to be a city. click somewhere else"
            );
          setCityName(city || locality || "");
          setCountry(countryName);
          setEmoji(convertToEmoji(countryCode));
        } catch (err) {
          setIsGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      getCityDetails();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    if (!cityName || !date) return;
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  /* JSX */
  if (!lat && !lng)
    return (
      <Message
        message={
          "There's no selected location, please select a city on the map"
        }
      />
    );
  if (isLoadingGeocoding || isLoading) return <Spinner />;
  if (isGeocodingError) return <Message message={isGeocodingError} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"} onClick={handleSubmit}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
