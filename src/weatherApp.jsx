
import SearchBox from "./SearchBox";
import InfoBox from "./infoBox";
import { useState } from "react";

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({
        city: "Surat",
        feelslike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "haze"
    });

    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo); // ✅ Updates weather info dynamically
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} /> {/* ✅ Pass update function */}
            <InfoBox info={weatherInfo} /> {/* ✅ Pass weather data as a prop */}
        </div>
    );
}
