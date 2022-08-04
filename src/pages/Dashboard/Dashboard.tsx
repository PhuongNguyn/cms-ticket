import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import {AiOutlineCalendar} from 'react-icons/ai'
import './Dashboard.css'
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJs,
  Tooltip as TTooltip,
  Title,
  ArcElement,
  Legend,
} from "chart.js";
import CalendarComponent from "../../components/Calendar/Calendar";
ChartJs.register(TTooltip, Title, ArcElement, Legend);



const Dashboard:React.FC = () =>{
    const [calendarStatistic, setCalendarStatistic] = useState<boolean>(false)
    const dataDonut = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
      const configDonut = {
        type: 'doughnut',
        data: dataDonut,
      };
    const data = {
        labels: ["III", "IIII"],
        datasets: [
          {
            data: [500, 500],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
            borderWidth: 2
          }
        ]
      };
    interface IDataChart{
        name: string,
        uv: string, 
        pv: number,
        amt: number 
    } 
    const dataChart:IDataChart[] = [
        {
          name: 'Thứ 2',
          uv: '140tr',
          pv: 2400,
          amt: 2400
        },
        {
          name: 'Thứ 3',
          uv: '180tr',
          pv: 1398,
          amt: 2210
        },
        {
          name: 'Thứ 4',
          uv: '180tr',
          pv: 9800,
          amt: 2290
        },
        {
          name: 'Thứ 5',
          uv: '220tr',
          pv: 3908,
          amt: 2000
        },
        {
          name: 'Thứ 6',
          uv: '260tr',
          pv: 3908,
          amt: 2000
        },
        {
          name: 'Thứ 7',
          uv: '180tr',
          pv: 3908,
          amt: 2000
        },
        {
          name: 'CN',
          uv: '220tr',
          pv: 3908,
          amt: 2000
        }
      ];
    
      const familyData = {
        labels: undefined,
        datasets: [
          {
            label: undefined,
            data: [13568, 56024],
            backgroundColor: ["#FF8A48", "#4F75FF"],
          },
        ],
      };
      const eventData = {
        labels: undefined,
        datasets: [
          {
            label: undefined,
            data: [28302, 30256],
            backgroundColor: ["#FF8A48", "#4F75FF"],
          },
        ],
      };
    return (
        <div className = 'dashboard'>
            <div className = 'dashboard__chart-header'>
                <p className ='dashboard__chart-header--title'>Doanh Thu</p>
                <div className = 'dashboard__chart-header-calendar'>
                    <p>Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()} <AiOutlineCalendar onClick = {()=>setCalendarStatistic(!calendarStatistic)} style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                    {calendarStatistic&&<CalendarComponent/>}
                </div>
            </div>
            <div className = 'dashboard__chart'>
                <div className = "">
                    <AreaChart
                        width={1110}
                        height={184}
                        data={dataChart}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                        style={{width: '100%', height: '194px'}}
                                >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="141.68%" stopColor="rgba(250, 160, 95, 0.26)" stopOpacity={1} />
                                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis axisLine={false} tickLine={false} dataKey="name" type = "category" />
                                <YAxis axisLine={false} tickLine={false} type ="category" />
                                <Tooltip />
                                <Area
                                    strokeWidth={2}
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#FF8A48"
                                    fill="url(#colorUv)"
                                />
                        </AreaChart>
                    </div>
            </div>
            <div className ='dashboard__content'>
                <div className = 'dashboard__content-header'>
                    <p className = 'dashboard__content-header--title'>Tổng doanh thu theo tuần</p>
                    <p className = 'dashboard__content-header--value'>525.145.000 <span>đồng</span></p>
                </div>
                <div className = 'dashboard__content-chart' style={{width: '100px', height: '100px'}}>
                    <div className = 'dashboard__content-chart--calendar'>
                        <div className = 'dashboard__chart-header-calendar'>
                            <p>Tháng {new Date().getMonth() + 1}, {new Date().getFullYear()} <AiOutlineCalendar style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                        </div>
                    </div>
                    <div className = 'dashboard__content-chart--family'>
                        <p>Gói gia đình</p>
                        <div className = 'dashboard__content-chart--family-chart'>
                            <Doughnut data={familyData}/>
                        </div>
                    </div>
                    <div className = 'dashboard__content-chart--event'>
                        <p>Gói sự kiện</p>
                        <div className = 'dashboard__content-chart--event-chart'>
                            <Doughnut data={eventData}/>
                        </div>
                    </div>
                    <div className="dashboard__content-chart-legend">
                        <p className = 'dashboard__content-chart-legend--used-ticket-wrapper'>
                            <div className = 'dashboard__content-chart-legend--used-ticket'></div>
                            <span>Vé đã sử dụng</span>
                        </p>
                        <p className = 'dashboard__content-chart-legend--unused-ticket-wrapper'>
                            <div className = 'dashboard__content-chart-legend--unused-ticket'></div>
                            <span>Vé chưa sử dụng</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard