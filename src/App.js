import React from "react";
import "./App.css";
import WeatherBg from "./Component/Weathervid.mp4";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="col-md-4 offset-md-4 p-5">
        <div className="weatherBox">
          <Weather />
          <video autoPlay loop muted className="WeatherBg">
            <source src={WeatherBg} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default App;
