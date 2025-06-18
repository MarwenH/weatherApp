import { useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

const HourlyForecast = () => {
  const { hourlyForecastData, unitOfMeasure } = useContext(WeatherContext);

  const unixTimeConverter = (sysTime) => {
    const unix_timestamp = sysTime;

    const date = new Date(unix_timestamp * 1000);

    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    let minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.slice(1, 3) + " " + ampm;

    return formattedTime;
  };

  let u = unitOfMeasure;

  return (
    <>
      {hourlyForecastData && (
        <>
          <div className="grid grid-cols-5 max-md:grid-cols-2 gap-4 ">
            {hourlyForecastData.map((hour) => {
              return (
                <div className="inner-cell" key={hour.dt}>
                  <div className="flex items-center justify-center flex-col">
                    <div>
                      <p>
                        {Math.round(hour.main.temp)}
                        <sup>
                          {u == "metric" ? "°C" : u == "imperial" ? "°F" : "k"}
                        </sup>
                      </p>
                    </div>

                    <div>
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                        width={50}
                      />
                    </div>

                    <div>{unixTimeConverter(hour.dt)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default HourlyForecast;
