import React, { useState } from 'react';

const SearchBar = ({ fetchWeather }) => {

  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-6 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
