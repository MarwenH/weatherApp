import { useContext } from "react";

// icons
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { BiWater } from "react-icons/bi";
import { MdOutlineVisibility } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";
import { FiWind } from "react-icons/fi";

import WeatherContext from "../contexts/WeatherContext";

function Highlights() {
  const { weatherData, airPollutionData, error } = useContext(WeatherContext);

  const SunriseSunsetConverter = (sysTime) => {
    const unix_timestamp = sysTime;

    const date = new Date(unix_timestamp * 1000);

    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    let minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.slice(1, 3) + " " + ampm;

    return formattedTime;
  };

  const aqiText = {
    1: {
      text: "Good",
      color: "bg-green-600",
    },
    2: {
      text: "Fair",
      color: "bg-lime-600",
    },
    3: {
      text: "Moderate",
      color: "bg-yellow-600",
    },
    4: {
      text: "Poor",
      color: "bg-orange-600",
    },
    5: {
      text: "Very Poor	",
      color: "bg-red-600",
    },
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {!error && !weatherData && (
        <p>⏳ Getting your location and fetching data...</p>
      )}
      {weatherData && (
        <>
          {/* <div>
            <h3>🌍 Data based on your location:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <hr />
            <pre>{JSON.stringify(airPollutionData , null, 2)}</pre>
          </div> */}
          {/* <pre>{JSON.stringify(forecast, null, 2)}</pre> */}

          <h2 className="title-1">Today's highlights</h2>
          <div className="grid grid-rows-2 gap-4">
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
              <div className="inner-cell">
                <h3 className="sub-title">Sunrise & Sunset</h3>
                <hr />
                <div className="flex items-center justify-start">
                  <div className="basis-1/2">
                    <p className="title-2">Sunrise</p>
                    <div className="flex items-center text-xl my-2">
                      <FiSunrise className="text-2xl" />
                      <span className="mx-2">
                        {SunriseSunsetConverter(weatherData.sys.sunrise)}
                      </span>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <p className="title-2">Sunset</p>
                    <div className="flex items-center text-xl my-2">
                      <FiSunset className="text-2xl" />
                      <span className="mx-2">
                        {SunriseSunsetConverter(weatherData.sys.sunset)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inner-cell">
                <div className="flex items-center justify-between">
                  <h3 className="sub-title">Air Quality Index</h3>
                  <div
                    className={`rounded-2xl px-3 py-0.5 ${
                      aqiText[airPollutionData.list[0].main.aqi].color
                    }`}
                  >
                    {aqiText[airPollutionData.list[0].main.aqi].text}
                  </div>
                </div>
                <hr />
                <div className="flex items-center justify-start">
                  <div className="basis-1/5 text-center">
                    <div>
                      <FiWind className="text-2xl m-auto" />
                    </div>
                  </div>

                  <div className="basis-1/5 text-center">
                    <p className="title-2">PM2.5</p>
                    <span>{airPollutionData.list[0].components.pm2_5}</span>
                  </div>

                  <div className="basis-1/5 text-center">
                    <p className="title-2">
                      NO<sub>2</sub>
                    </p>
                    <span>{airPollutionData.list[0].components.no2}</span>
                  </div>

                  <div className="basis-1/5 text-center">
                    <p className="title-2">
                      O<sub>3</sub>
                    </p>
                    <span>{airPollutionData.list[0].components.o3}</span>
                  </div>

                  <div className="basis-1/5 text-center">
                    <p className="title-2">CO</p>
                    <span>{airPollutionData.list[0].components.co}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4">
                <div className="inner-cell">
                  <p className="title-2">humidity</p>
                  <div className="flex items-center my-2">
                    <WiHumidity className="text-2xl" />
                    <span className="mx-1">{weatherData.main.humidity}</span>
                    <sub>%</sub>
                  </div>
                </div>
                <div className="inner-cell">
                  <p className="title-2">pressure</p>
                  <div className="flex items-center my-2">
                    <BiWater className="text-2xl" />
                    <span className="mx-1">{weatherData.main.pressure}</span>
                    <sub>hPa</sub>
                  </div>
                </div>
                <div className="inner-cell">
                  <p className="title-2">visibility</p>
                  <div className="flex items-center my-2">
                    <MdOutlineVisibility className="text-2xl" />
                    <span className="mx-1">
                      {weatherData.visibility / 1000}
                    </span>
                    <sub>Km</sub>
                  </div>
                </div>
                <div className="inner-cell">
                  <p className="title-2">Feels like</p>
                  <div className="flex items-center my-2">
                    <CiTempHigh className="text-2xl" />
                    <span className="mx-1">
                      {Math.round(weatherData.main.feels_like)}
                    </span>
                    <sup>°C</sup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Highlights;
