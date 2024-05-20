"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/navigation";
import CityCard from "@/components/CityCard";

const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [searched, setSearched] = useState<Array<any>>([]);
  const router = useRouter();
  const fetchSearchedCites = async (city: string) => {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    setSearched(response.data.results);
    console.log(response.data);
  };
  
  useEffect(() => {
    // const fetchWeatherData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `/api/weather?city=${selectedCity || "New York"}`
    //     );
    //     setWeatherData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching weather data:", error);
    //   }
    // };
    // fetchWeatherData();
  }, [selectedCity]);

  const handleSearch = (city: string) => {
    setSelectedCity(city);
    fetchSearchedCites(city);
    // router.push(`/?city=${city}`, undefined, { shallow: true });
  };
  console.log(searched);
  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.whetherCites}>
        {searched?.map((data: any, index: number) => (
          <CityCard data={data} />
        ))}
      </div>
    </div>
  );
};

export default Home;
