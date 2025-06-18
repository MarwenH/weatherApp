import { ConfigProvider, Drawer, Flex, Segmented } from "antd";
import { useContext } from "react";

//icons
import { IoClose } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useDarkMode } from "../contexts/ThemeContext";
import WeatherContext from "../contexts/WeatherContext";

const SettingsMenu = ({ isOpen, onClose }) => {
  const { unitOfMeasure, cityName, handleUnitOfMeasure } =
    useContext(WeatherContext);

  const { darkMode, setDarkMode } = useDarkMode();

  // console.log(unitOfMeasure);

  // const [language, setLanguge] = useState("EN");

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              paddingLG: "0",
            },
            Segmented: {
              itemColor: "#99a1af",
              itemHoverBg: "#e17100",
              itemSelectedColor: "#0e1424",
              itemSelectedBg: "#e17100",
              itemActiveBg: "#e17100",
            },
          },
        }}
      >
        <Drawer
          onClose={onClose}
          open={isOpen}
          width={320}
          className="drawer p-0"
          closable={false}
        >
          {/* header */}

          <div className="flex items-center justify-between  bg-gray-950/20 p-4 mb-2">
            <h2>Settings</h2>
            <button
              onClick={() => {
                onClose();
              }}
              className="form-elem btn cursor-pointer"
            >
              <IoClose className="icon" />
            </button>
          </div>

          {/* Body */}

          <div className="p-5">
            <div className="my-5">
              <p className="title-2 pl-1">Unit of measure :</p>

              <Segmented
                options={["metric", "imperial", "standard"]}
                value={unitOfMeasure}
                shape="round"
                onChange={(value) => handleUnitOfMeasure(cityName, value)}
                size="middle"
              />
            </div>

            <div className="my-5">
              <p className="title-2 pl-1">Mode :</p>

              <Segmented
                options={[
                  { value: "light", icon: <FaSun /> },
                  { value: "dark", icon: <FaMoon /> },
                ]}
                value={darkMode ? "dark" : "light"}
                shape="round"
                onChange={(value) => setDarkMode(value === "dark")}
                size="middle"
              />
            </div>

            {/* <div className="my-5">
              <p className="title-2 pl-1">Languages :</p>

              <Segmented
                options={["EN", "AR"]}
                value={language}
                shape="round"
                onChange={(value) => setLanguge(value)}
                size="middle"
              />
            </div> */}
          </div>
        </Drawer>
      </ConfigProvider>
    </>
  );
};
export default SettingsMenu;
