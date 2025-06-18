import { useContext, useState } from "react";
import WeatherContext from "../contexts/WeatherContext";

//ICONS
import { IoSettingsOutline } from "react-icons/io5";
import { BiTargetLock } from "react-icons/bi";
import SearchBar from "./SearchBar";
import SettingsMenu from "./SettingsMenu";

const Header = () => {
  const { fetchWeatherByLocation, unitOfMeasure } = useContext(WeatherContext);

  const [isOpen, setIsOpen] = useState(false);

  const showDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  console.log(isOpen);

  return (
    <>
      <div className="grid max-md:grid-cols-1 grid-cols-2 gap-4 mb-10 items-center">
        <div className="flex items-center justify-between">
          <div className=" border-none">
            <img src="../images/w-logo.png" alt="" width={70} />
          </div>
          <div className="col-span-2">
            <SearchBar />
          </div>
        </div>

        <div className=" flex items-center justify-between max-md:justify-end">
          <button
            className="form-elem btn cursor-pointer mx-2"
            onClick={() => fetchWeatherByLocation(unitOfMeasure)}
          >
            <BiTargetLock className="icon" />
            <span className="mx-2 hidden md:block">Current Location</span>
          </button>
          <button
            onClick={() => {
              showDrawer();
            }}
            className="form-elem btn cursor-pointer"
          >
            <IoSettingsOutline className="icon" />
          </button>
        </div>
      </div>
      <SettingsMenu isOpen={isOpen} onClose={closeDrawer} />
    </>
  );
};

export default Header;
