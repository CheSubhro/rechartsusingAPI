
import React, { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const BarChartComponent = () => {

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
            <BarChart width={600} height={300} data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="1. open" fill="rgb(0,200,5)" />
            </BarChart>
        </>
    )
}

export default BarChartComponent