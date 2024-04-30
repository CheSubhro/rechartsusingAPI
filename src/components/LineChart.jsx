
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const LineChartComponent = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo")
            .then(res => res.json())
            .then(
                (result) => {
                    const data = [];
                    for (var instance in result["Weekly Time Series"]) {
                        var mydata = (result["Weekly Time Series"][instance]);
                        mydata.date = instance;
                        data.push(mydata);
                    }
                    setItems(data.reverse());
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    return (
        <>
            <h2>IBM Weekly Opening Prices</h2>
            <LineChart width={600} height={300} data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="1. open" stroke="#8884d8" />
            </LineChart>
        </>
    )
}

export default LineChartComponent