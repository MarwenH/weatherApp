import { useContext } from "react";

// icons
import { FiMapPin } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import WeatherContext from "../contexts/WeatherContext";

const TempWeather = () => {
  const { weatherData, unitOfMeasure } = useContext(WeatherContext);

  const CurrentDateConverter = (sysTime) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const unix_timestamp = sysTime;
    const currentDate = new Date(unix_timestamp * 1000);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];

    var formattedDate = dayOfWeek + " " + day + "-" + month + "-" + year;

    return formattedDate;
  };

  let u = unitOfMeasure;

  return (
    <>
      {weatherData && (
        <>
          <h2 className="title-1">Now </h2>
          <div className="grid grid-flow-col gap-4">
            <div className="inner-cell">
              <div className="flex items-center justify-around">
                <div className="basis-1/2 mb-8">
                  <p className="text-5xl my-4">
                    {Math.round(weatherData.main.temp)}
                    <sup>
                      {u == "metric" ? "°C" : u == "imperial" ? "°F" : "k"}
                    </sup>
                  </p>
                  <p>{weatherData.weather[0].description}</p>
                </div>
                <div className="basis-1/2">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  />
                </div>
              </div>
              <hr />
              <div className="flex items-center justify-start">
                <div>
                  <div className="flex flex-row items-center mb-1">
                    <FaRegCalendarAlt className="text-lg" />
                    <span className="mx-2">
                      {CurrentDateConverter(weatherData.dt)}
                    </span>
                  </div>

                  <div className="flex flex-row items-center mb-1">
                    <FiMapPin className="text-lg" />
                    <span className="mx-2">
                      {weatherData.name}, {weatherData.sys.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TempWeather;
