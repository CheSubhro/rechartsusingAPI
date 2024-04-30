
import React from "react"
import { useState, useEffect } from "react";
import {Line, LineChart, Tooltip} from 'recharts'

const Graph = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const data = [];

    useEffect(() => {
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo")
        .then(res => res.json())
        .then(
            (result) => {
                for (var instance in result["Weekly Time Series"] ) {
                    var mydata = (result["Weekly Time Series"][instance])
                    mydata.date= instance
                    data.push(mydata)
                }
                setItems(data.reverse())
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
        }, [])
        
    return (
        <>
            <LineChart width={500} height={250} margin={{ top: 150, right: 30, left: 20, bottom: 5 }} data={items}>
                <Line dot={false}  type="monotone" dataKey="1. open" stroke="rgb(0,200,5)" yAxisId="100" />
                <Tooltip />
            </LineChart>
        </>
    )
}

export default Graph