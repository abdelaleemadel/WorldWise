/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesProvider";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  const countries = [
    ...new Set(
      cities.map((city) => {
        return { country: city.country, emoji: city.emoji };
      })
    ),
  ];

  return (
    <div className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
