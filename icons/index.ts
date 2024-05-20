import clear from "./clear-day.svg";
import partlyCloudy from "./partly-cloudy-day.svg";
import cloudy from "./cloudy.svg";
import rain from "./rain.svg";
import heavyRain from "./heavy-rain.svg";
import snow from "./snow.svg";

export const getWeatherIcon = (code: number) => {
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
