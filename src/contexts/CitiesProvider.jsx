import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase.js";

/* "https://my-json-server.typicode.com/abdelaleemadel/worldwise-cities"; */

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  /* Fetching cities and set them into the cities state */
  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      let { data: cities, error } = await supabase.from("cities").select("*");
      error ? console.log(error) : "";
      setCities(cities);
      setIsLoading(false);
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    let { data: city, error } = await supabase
      .from("cities")
      .select("*")
      .eq("id", id)
      .single();
    error ? console.log(error) : "";
    setCurrentCity(city);
    setIsLoading(false);
  }

  async function deleteCity(id) {
    setIsLoading(true);
    let { error } = await supabase.from("cities").delete().eq("id", id);

    error
      ? console.log(error)
      : setCities((cities) => [...cities.filter((city) => city.id != id)]);

    setIsLoading(false);
  }

  async function createCity(newCity) {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("cities")
      .insert([newCity])
      .select();

    setCities((cities) => [...cities, data[0]]);
    error ? console.log(error) : "";
    setIsLoading(false);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const value = useContext(CitiesContext);
  return value;
}
export { CitiesProvider, useCities };
