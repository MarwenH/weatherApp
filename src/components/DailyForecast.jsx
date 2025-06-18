import { useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

const DailyForecast = () => {
  const { dailyForecastData, unitOfMeasure } = useContext(WeatherContext);

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
      {dailyForecastData && (
        <>
          <div className="grid grid-flow-row gap-4 inner-cell">
            {dailyForecastData.map((day) => {
              return (
                <div key={day.dt} className="">
                  <div className="flex items-center justify-between">
                    <div className="basis-2/5 flex items-center">
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        width={50}
                      />
                      <p>
                        {Math.round(day.main.temp)}
                        <sup>
                          {u == "metric" ? "°C" : u == "imperial" ? "°F" : "k"}
                        </sup>
                      </p>
                    </div>

                    <div className="basis-3/5">
                      {CurrentDateConverter(day.dt)}
                    </div>
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

export default DailyForecast;
