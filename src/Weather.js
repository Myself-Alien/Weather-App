import React, { useEffect, useState } from "react";

const API_KEY = "928c97544b1ba6c77834f437e11346d9";
const cities = ["Kolkata", "Delhi", "Mumbai"];

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchWeather = (city) => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weather data");
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather(selectedCity);
    const interval = setInterval(() => fetchWeather(selectedCity), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (date) =>
    date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour12: true,
    });

  return (
    <div className="container my-4">
      <h4 className="text-center mb-4">
        Current Date & Time: <br />
        <span className="fw-normal">{formatTime(currentTime)}</span>
      </h4>

      {/* Bootstrap Tabs */}
      <ul className="nav nav-tabs rounded-top">
        {cities.map((city) => (
          <li className="nav-item" key={city}>
            <button
              className={`nav-link ${selectedCity === city ? "active" : ""}`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          </li>
        ))}
      </ul>

      {/* Weather Data */}
      <div className="card rounded-0 extra">
        <div className="card-body rounded-0">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {weatherData && !loading && (
            <>
              <h5 className="card-title">
                {weatherData.name}, {weatherData.sys.country}
              </h5>
              <p className="card-text">
                <strong>Temperature:</strong> {weatherData.main.temp}°C
              </p>
              <p className="card-text">
                <strong>Weather:</strong> {weatherData.weather[0].description}
              </p>
              <p className="card-text">
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p className="card-text">
                <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
