
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./searchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "23315538ae6edf5b863a5f9a2470695f";
    
    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.message || "City not found");
            }

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };

            return result;
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError(true);
            return null;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        setError(false);
        console.log("Searching for:", city);

        let newInfo = await getWeatherInfo();
        if (newInfo) {
            updateInfo(newInfo);
            setCity(""); // Clear input on successful search
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city"
                    label="City Name" 
                    variant="outlined" 
                    required 
                    value={city}
                    onChange={handleChange}
                />
                <br />
                <br />
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{ color: "red" }}>No such place exists!!</p>}
            </form>
        </div>
    );
}
