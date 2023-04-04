import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MdDateRange } from "react-icons/md"
const API_KEY = '49e61f2e29de4dfdae3548dac32e2906';
import "./List.css";


const List = ({inputs, pastWeather, setPastWeather}) => {

    useEffect(() => {
        const getWeatherHist = async () => {
        const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=OKC&start_date=${inputs.startDate}&end_date=${inputs.endDate}&units=I&key=${API_KEY}`)
        const json = await response.json()
        setData(json.data);
        }
        getWeatherHist().catch(console.error);
    },[inputs])

    const setData = (data) => {
        const filterData = data.filter((item) => item.wind_spd <= inputs.windSpeed)

        !inputs.windSpeed ? setPastWeather(data) : setPastWeather(filterData); 
    }
    return (
        <table className="data-table">
            <tbody>
                { inputs && pastWeather.map((date, index) => 
                    <tr key={index}>
                        <td>
                            <Link to={`/WeatherDetails/${date.datetime}`}>
                                <span><MdDateRange /></span> {date.datetime}
                            </Link>
                        </td>
                        <td>{date.min_temp + "°F"}</td>
                        <td>{date.max_temp + "°F"}</td>
                        <td>{date.wind_spd + " m/s" + "🌬️"}</td>
                        <td>{date.clouds + "%" + "☁️"}</td>
                    </tr>
                ) 
                }
            </tbody>
            
            
        </table>
        
    )

};

export default List;
