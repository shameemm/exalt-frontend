import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { scaleCategory } from 'chart.js/auto';
import { Line,Bar,PolarArea } from 'react-chartjs-2';
import './AdminDashboard.css'


function AdminDashboard() {
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Booking Graph',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  const data1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Graph',
        data: [23, 12, 76, 73, 44, 9, 50],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  return (
    <div>
        <div className="charts">
            <div className="chart-left">
            <Line data={data} height={200} width={250} />
            </div>
            <div className="chart-right">
            <Bar data={data1} height={200} width={250} />
            </div>
        </div>
        {/* <div className="charts">
            <div className="chart-left">
            <PolarArea data={data} height={200} width={250} />
            </div>
            <div className="chart-right">
            <Line data={data} height={200} width={250} />
            </div>
        </div> */}
      
    </div>
  )
}

export default AdminDashboard