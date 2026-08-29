import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import axios from "axios";
import video from './video.mp4';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.");
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="bg-black/75 text-white rounded-lg p-5 max-w-md w-full z-10">
        <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>
        <div className="mb-4">
          <SearchBar fetchWeather={fetchWeather} />
        </div>

        {error && (
          <div className="mb-4 min-h-[40px] flex items-center justify-center text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        {weather && <div className="mt-2"><WeatherCard weather={weather} /></div>}
      </div>
    </div>
  );
}

export default App;