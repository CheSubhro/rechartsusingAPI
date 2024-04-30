
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PieChartComponent = () => {

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
            <PieChart width={400} height={400}>
                <Pie dataKey="1. open" data={items.map(item => ({ name: item.date, value: parseFloat(item["1. open"]) }))} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
                    {
                        items.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0088FE' : '#00C49F'} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </>
    )
}

export default PieChartComponent