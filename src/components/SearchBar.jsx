import { useContext, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import WeatherContext from "../contexts/WeatherContext";

const SearchBar = () => {
  const [cityName, setCityName] = useState("");

  const { fetchWeatherByCity, unitOfMeasure } = useContext(WeatherContext);
  return (
    <>
      <div className="flex items-center justify-around">
        <div className="form-elem">
          <IoIosSearch className="icon" />
          <input
            type="text"
            placeholder="Enter your city ..."
            className="mx-2 outline-0 "
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            className="inset-0 ring-1 ring-gray-500 rounded-md btn cursor-pointer px-1"
            onClick={() => fetchWeatherByCity(cityName, unitOfMeasure)}
          >
            search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
