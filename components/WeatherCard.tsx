import React, { useState } from "react";
import styles from "../styles/WeatherCard.module.scss";
import Clock from "react-clock";
import clear from "../icons/clear-day.svg";
import partlyCloudy from "../icons/partly-cloudy-day.svg";
import cloudy from "../icons/cloudy.svg";
import rain from "../icons/rain.svg";
import heavyRain from "../icons/heavy-rain.svg";
import snow from "../icons/snow.svg";
import Image from "next/image";

const WeatherCard = ({ data }: any) => {
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
  const [value, setValue] = useState(new Date());
  const hourly = data?.hourly;
  const currentWeather: any = [];
  const current = hourly?.time?.forEach((each: any, index: number) => {
    if (
      new Date().getDate() === new Date(each).getDate() &&
      new Date().getHours() === new Date(each).getHours()
    ) {
      currentWeather[0] = {
        time: hourly?.time[index],
        temperature: hourly?.temperature_2m[index],
        humidity: hourly?.relative_humidity_2m[index],
        precipitation: hourly?.precipitation[index],
        rain: hourly?.rain[index],
        weatherCode: hourly?.weather_code[index],
      };
    }
  });
  // utils/formatDate.js
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
    const dates = [1, 2, 3, 4, 5, 6, 7].map((each) => {
      let newD: any = today.getDate() + each;
      return newD;
    });
    const time = new Date().getHours();
    hourly?.time?.forEach((date: any, index: number) => {
      if (
        dates.includes(new Date(date).getDate()) &&
        time === new Date(date).getHours()
      ) {
        datar.push(
          <div className={styles.forecastItem} key={index}>
            <Image
              src={getWeatherIcon(hourly?.weather_code[index])}
              alt="Weather Icon"
            />
            <p>Time: {formatDate(hourly?.time[index])}</p>
            <p>Temperature: {hourly?.temperature_2m[index]} °C</p>
            <p>Humidity: {hourly?.relative_humidity_2m[index]} %</p>
            <p>Precipitation: {hourly?.precipitation[index]} mm</p>
            <p>Rain: {hourly?.rain[index]} mm</p>
            <p>Weather Code: {hourly?.weather_code[index]}</p>
          </div>
        );
      }
    });
    return datar;
  };
  console.log(currentWeather);
  return (
    <div className={styles.weatherCard}>
      <h1> Weather Forecast</h1>

      <h2>Current Weather</h2>
      <div>
        <Image
          src={getWeatherIcon(currentWeather?.[0].weatherCode)}
          alt="Weather Icon"
        />
        <p>Time: {currentWeather?.[0].time}</p>
        <p>Temperature: {currentWeather?.[0].temperature} °C</p>
        <p>Humidity: {currentWeather?.[0].humidity} %</p>
        <p>Precipitation: {currentWeather?.[0].precipitation} mm</p>
        <p>Rain: {currentWeather?.[0].rain} mm</p>
        <p>Weather Code: {currentWeather?.[0].weatherCode}</p>
      </div>
      <h2>7-Day Forecast</h2>
      <div>{mapFuncDay()}</div>
    </div>
  );
};

export default WeatherCard;
