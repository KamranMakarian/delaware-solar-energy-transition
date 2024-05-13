import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line } from 'recharts';
import './CustomLineChart.css';

const data = [
  { name: 'Jan', top: 4000, middle: 2400, bottom: 1500 },
  { name: 'Feb', top: 3000, middle: 1398, bottom: 1000 },
  { name: 'Mar', top: 7500, middle: 5200, bottom: 2290 },
  { name: 'Apr', top: 2780, middle: 2500, bottom: 2000 },
  { name: 'May', top: 5200, middle: 4800, bottom: 2181 },
  { name: 'Jun', top: 4800, middle: 3800, bottom: 2500 },
  { name: 'Jul', top: 5000, middle: 4300, bottom: 2100 },
  { name: 'Aug', top: 4000, middle: 2400, bottom: 1400 },
  { name: 'Sep', top: 3000, middle: 1398, bottom: 750 },
  { name: 'Oct', top: 7000, middle: 2800, bottom: 2290 },
  { name: 'Nov', top: 2780, middle: 2408, bottom: 2000 },
  { name: 'Dec', top: 3500, middle: 2800, bottom: 2181 },
];

const AreaChartExample = () => {
  return (
    
    <ComposedChart width={600} height={400} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />     
      <Area type="linear" dataKey="bottom" stackId="1" stroke="gray" fill="transparent" />            
      <Area type="linear" dataKey="top" stackId="1" stroke="gray" fill="white" />
      <Line type="linear" dataKey="middle" stroke="#8884d8" strokeWidth={3}/>
    </ComposedChart>
  );
}

export default AreaChartExample;
