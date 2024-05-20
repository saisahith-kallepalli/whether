import styles from "../styles/WeatherCard.module.scss";
import Clock from "react-clock";
import clear from "../icons/clear-day.svg";
import partlyCloudy from "../icons/partly-cloudy-day.svg";
import cloudy from "../icons/cloudy.svg";
import rain from "../icons/rain.svg";
import heavyRain from "../icons/heavy-rain.svg";
import snow from "../icons/snow.svg";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useParams } from "next/navigation";
const WeatherCard = ({ data }: any) => {
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const { city } = useParams();
  useEffect(() => {
    console.log(data);
  }, []);

  const getWeatherIcon = (code: number) => {
    switch (code) {
      case 0:
        return clear;
      case 1:
        return partlyCloudy;
      case 2:
        return cloudy;
      case 3:
        return rain;
      case 61:
        return snow;
      case 80:
        return heavyRain;
      default:
        return clear;
    }
  };

  const hourly = data?.hourly || {};
  const currentWeather = hourly.time?.reduce(
    (acc: any, each: any, index: number) => {
      if (
        new Date().getDate() === new Date(each).getDate() &&
        selectedHour === new Date(each).getHours()
      ) {
        acc = {
          time: hourly.time[index],
          temperature: hourly.temperature_2m[index],
          humidity: hourly.relative_humidity_2m[index],
          precipitation: hourly.precipitation[index],
          rain: hourly.rain[index],
          weatherCode: hourly.weather_code[index],
        };
      }
      return acc;
    },
    {}
  );

  const formatDate = (dateString: string) => {
    const options: any = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const mapFuncDay = () => {
    const datar: any = [];
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => today.getDate() + i + 1);
    const time = new Date().getHours();

    hourly.time?.forEach((date: any, index: number) => {
      if (
        dates.includes(new Date(date).getDate()) &&
        selectedHour === new Date(date).getHours()
      ) {
        datar.push(
          <div className={styles.forecastItem} key={index}>
            <Image
              src={getWeatherIcon(hourly.weather_code[index])}
              alt="Weather Icon"
              className={styles.forecastImage}
            />
            <div className={styles.forecastDetails}>
              <h3>{formatDate(hourly.time[index])}</h3>
              <h2>{hourly.temperature_2m[index]} °C</h2>
              <p>Humidity: {hourly.relative_humidity_2m[index]} %</p>
              <p>Precipitation: {hourly.precipitation[index]} mm</p>
              <p>Rain: {hourly.rain[index]} mm</p>
              <p>Weather Code: {hourly.weather_code[index]}</p>
            </div>
          </div>
        );
      }
    });
    return datar;
  };
  const handleHourChange = (event: any) => {
    setSelectedHour(Number(event.target.value));
  };
  return (
    <div className={styles.weatherCard}>
      <h1
        style={{
          fontSize: "70px",
          backgroundColor: "#13161a27",
          paddingLeft: "10px",
        }}>
        {city} Weather Forecast
      </h1>
      <div className={styles.selectHour}>
        <label htmlFor="hour-select">Select Hour: </label>
        <select
          id="hour-select"
          value={selectedHour}
          onChange={handleHourChange}>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>
              {i}:00
            </option>
          ))}
        </select>
      </div>
      <h2 style={{ paddingLeft: "10px" }}>Current Weather</h2>
      <div className={styles.currentWeather}>
        <Image
          src={getWeatherIcon(currentWeather?.weatherCode)}
          alt="Weather Icon"
          className={styles.imageStyle}
        />
        <div className={styles.weatherDetails}>
          <h3>{formatDate(currentWeather?.time)}</h3>
          <h2>{currentWeather?.temperature} °C</h2>
          <p>Humidity: {currentWeather?.humidity} %</p>
          <p>Precipitation: {currentWeather?.precipitation} mm</p>
          <p>Rain: {currentWeather?.rain} mm</p>
        </div>
      </div>

      <h2 style={{ paddingLeft: "10px" }}>7-Day Forecast</h2>
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}>
        {mapFuncDay()}
      </div>
    </div>
  );
};

export default WeatherCard;
