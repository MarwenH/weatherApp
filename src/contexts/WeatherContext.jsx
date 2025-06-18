import { createContext, useEffect, useReducer } from "react";

import weatherReducer from "../reducers/weatherReducer";

import {
  initialState,
  fillHourlyForecast,
  fillForecastDays,
} from "../reducers/weatherReducer";

import axios from "axios";

const APT_KEY = import.meta.env.VITE_API_KEY;

const WeatherContext = createContext();
export default WeatherContext;

export function WeatherProvider({ children }) {
  const [dataWeatherState, dispatch] = useReducer(weatherReducer, initialState);

  const fetchWeatherData = async (lat, lng, unit) => {
    try {
      const [weatherRes, airRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: { lat, lon: lng, units: unit, appid: APT_KEY },
        }),
        axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`, {
          params: { lat, lon: lng, units: unit, appid: APT_KEY },
        }),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: { lat, lon: lng, units: unit, appid: APT_KEY },
        }),
      ]);

      //setData(weatherRes.data);
      dispatch({ type: "SetWeatherData", payload: weatherRes.data });
      dispatch({ type: "setAirPollution", payload: airRes.data });
      dispatch({
        type: "setHourlyForecastData",
        payload: fillHourlyForecast(forecastRes.data.list),
      });

      dispatch({
        type: "setDailyForecastData",
        payload: fillForecastDays(forecastRes.data.list),
      });
    } catch (err) {
      dispatch({
        type: "setError",
        payload: "Failed to fetch weather data: " + err.message,
      });
    }
  };

  const fetchWeatherByLocation = (unit) => {
    dispatch({ type: "setCityName", payload: null });

    console.log(unit);

    if (!navigator.geolocation) {
      dispatch({ type: "setError", payload: "Geolocation not supported." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude, unit);
      },
      () => {
        dispatch({ type: "setError", payload: "Location permission denied." });
      }
    );
  };

  const fetchWeatherByCity = async (cityName, unit) => {
    if (!cityName) {
      return;
    }

    dispatch({ type: "setCityName", payload: cityName });

    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { q: cityName, units: unit, appid: APT_KEY },
        }
      );

      const { lat, lon } = weatherRes.data.coord;

      const [airRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`, {
          params: { lat, lon, units: unit, appid: APT_KEY },
        }),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: { lat, lon, units: unit, appid: APT_KEY },
        }),
      ]);

      dispatch({ type: "SetWeatherData", payload: weatherRes.data });
      dispatch({ type: "setAirPollution", payload: airRes.data });
      dispatch({
        type: "setHourlyForecastData",
        payload: fillHourlyForecast(forecastRes.data.list),
      });
      dispatch({
        type: "setDailyForecastData",
        payload: fillForecastDays(forecastRes.data.list),
      });

      dispatch({ type: "setError", payload: null });
    } catch (err) {
      dispatch({
        type: "setError",
        payload: "City not found or network error." + err,
      });
    }
  };

  const handleUnitOfMeasure = (cityName = null, unit) => {
    dispatch({
      type: "setUnitOfMeasure",
      payload: unit,
    });

    localStorage.setItem("unitOfMeasure", unit);

    if (cityName) {
      fetchWeatherByCity(cityName, unit);
    } else {
      fetchWeatherByLocation(unit);
    }
  };

  useEffect(() => {
    fetchWeatherByLocation(initialState.unitOfMeasure);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        ...dataWeatherState,
        fetchWeatherByCity,
        fetchWeatherByLocation,
        handleUnitOfMeasure,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
