import { WeatherProvider } from "./contexts/WeatherContext";

//Components

import Header from "./components/Header";
import TempWeather from "./components/TempWeather";
import Highlights from "./components/Highlights";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <WeatherProvider>
        <ThemeProvider>
          <div className="flex min-h-dvh items-center justify-center">
            <div className="w-full max-w-[1400px] p-4">
              {/****** header ******/}

              <Header />

              {/****** ctn ******/}
              <div className="grid grid-cols-1 min-xl:grid-cols-4 gap-4">
                <div className="grid max-md:grid-cols-1 max-xl:grid-cols-2 col-span-1 row-span-2 gap-4">
                  <div className="cell">
                    <TempWeather />
                  </div>
                  <div className="cell">
                    <h2 className="title-1">5 Day Forecast</h2>
                    <DailyForecast />
                  </div>
                </div>
                <div className="min-xl:col-span-3 row-span-2 grid gap-4">
                  <div className="cell">
                    <Highlights />
                  </div>
                  <div className="cell">
                    <h2 className="title-1">Hourly Forecast</h2>
                    <HourlyForecast />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </WeatherProvider>
    </>
  );
}

export default App;
