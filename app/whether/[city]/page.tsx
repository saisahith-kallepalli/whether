"use client";
import WeatherCard from "@/components/WeatherCard";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Whether() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchedWether = async (latitude: any, longitude: any) => {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code`
    );
    console.log(response.data);
    setWeatherData(response.data);
  };
  useEffect(() => {
    const city = searchParams.get("city");
    console.log(city);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    if (latitude && longitude) {
      fetchedWether(latitude, longitude);
    }
  }, []);
  return (
    <div>
      <WeatherCard data={weatherData} />
    </div>
  );
}

export default Whether;
