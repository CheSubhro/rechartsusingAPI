import { useState } from 'react'
import './App.css'
import Graph from '../src/components/Graph'
import BarChartComponent from './components/BarChart'
import PieChartComponent from './components/PieChart'
import LineChartComponent from './components/LineChart'

function App() {

	return (
		<>
			<Graph/>
			{/* <BarChartComponent/> */}
			{/* <PieChartComponent/> */}
			<LineChartComponent/>
		</>
	)
}

export default App
