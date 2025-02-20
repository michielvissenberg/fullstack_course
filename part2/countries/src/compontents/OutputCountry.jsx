import axios from 'axios'
import { useEffect, useState } from 'react'

const getWeather = (key, city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    return axios
        .get(url)
        .then(response => {
            return response.data
        })
        .catch(error => {console.error(error)})
}

const weatherForecast = async(key, city) => {
    try {
        const weather = await getWeather(key, city)
        if (weather) {
            return weather
        }
        else {
            console.log("data could not be fetched")
        }
    }
    catch (error) {
        console.error(error)
    }
}

const Output = (props) => {
    const key = props.apiKey
    const country = props.country
    const link = country.flags.png
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        weatherForecast(key, country.capital)
        .then(weatherData => {
            if (weatherData) {
                setWeather(weatherData)
                setLoading(false)
                console.log(weatherData)
            }
        })
    }, [country, key])

    if (loading){
        return <div></div>
    }

    const linkWeatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` 

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))}
            </ul>
            <img src={link} maxwidth={300}/>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img src={linkWeatherIcon} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>)
}

export default Output