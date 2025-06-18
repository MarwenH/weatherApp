export const initialState = {
  weatherData: null,
  airPollutionData: null,
  hourlyForecastData: null,
  dailyForecastData: null,
  unitOfMeasure: localStorage.getItem("unitOfMeasure") ?? "metric",
  cityName: null,
  error: null,
};

export default function WeatherReducer(state, action) {
  switch (action.type) {
    case "SetWeatherData": {
      return { ...state, weatherData: action.payload };
    }
    case "setAirPollution": {
      return { ...state, airPollutionData: action.payload };
    }
    case "setHourlyForecastData": {
      return { ...state, hourlyForecastData: action.payload };
    }
    case "setDailyForecastData": {
      return { ...state, dailyForecastData: action.payload };
    }

    case "setUnitOfMeasure": {
      return { ...state, unitOfMeasure: action.payload };
    }

    case "setCityName": {
      return { ...state, cityName: action.payload };
    }

    case "setError": {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
}

export const fillHourlyForecast = (list) => {
  return list.slice(0, 10);
};

export const fillForecastDays = (list) => {
  let listOfDays = [];
  for (let i = 7; i < list.length; i += 8) {
    listOfDays.push(list[i]);
  }
  return listOfDays;
};
