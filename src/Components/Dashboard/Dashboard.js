import React from 'react'
import ReactApexChart from 'react-apexcharts';
import Sidebar from '../Sidebar';
import { ReactComponent as NewUsersIcon } from '../../assests/usersLight.svg'
import { ReactComponent as CancelledIcon } from '../../assests/usersdark.svg'
import { ReactComponent as FreeUsersIcon } from '../../assests/usersyellow.svg'
import { ReactComponent as HoursIcon } from '../../assests/usersgreen.svg'
import { ReactComponent as DollarIcon } from '../../assests/dollar.svg'

const Dashboard = () => {
    const initialstate = {
        series: [{
            data: [{ x: '05/06/2014', y: 54 }, { x: '05/08/2014', y: 17 }, { x: '05/28/2014', y: 26 }]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        }
    }
    return (
        <>
            <Sidebar />
            <div className="content pt-5">
                <div className=''>
                    <div className='row mx-0'>
                        <div className=' Light mx-0 mt-2'>
                            <h6 className='ml-3 mt-3'>Members</h6>
                            <div className='row mx-2 my-2'>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #0F74AF', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <NewUsersIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">25 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle bgBlue text-center p-1 m-0 font_16">New Members</h6>
                                </div>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #48A7DF', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <CancelledIcon /> </h5>
                                        <h6 className="card-subtitle mb-2 text-center">25 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle text-center p-1 m-0 font_16" style={{ backgroundColor: '#48A7DF', color: 'white' }}>Cancelled Members</h6>
                                </div>
                            </div>
                        </div>
                        <div className=' Light mx-0 mt-2'>
                            <h6 className='ml-3 mt-3'>Members By Packages</h6>
                            <div className='row  mx-2 my-2'>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #0F74AF', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <NewUsersIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">25 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle bgBlue text-center p-1 m-0 font_16">Paid Monthly</h6>
                                </div>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #FFB100', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <FreeUsersIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">25 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle text-center p-1 m-0 font_16" style={{ backgroundColor: '#FFB100', color: 'white' }}>Free</h6>
                                </div>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #12BF7D', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <HoursIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">25 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle text-center p-1 m-0 font_16" style={{ backgroundColor: '#12BF7D', color: 'white' }}>24 Hours</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mx-0'>
                        <div className=' mx-0 mt-2'>
                            <div className='row mx-2 my-2'>
                                <div className="card mx-2 mt-1" style={{ width: "300px", border: '1px solid #22BF7D', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='mr-auto mx-auto'>
                                                <h6 className="card-subtitle mt-2 text-center font-weight-bold">$2000</h6>
                                                <h6 className="card-subtitle mt-2 text-center">Income Generated</h6>
                                            </div>
                                            <div className='ml-auto mx-auto'>
                                                <h5 className="card-title "> <DollarIcon /> </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ant-table-wrapper mt-3'>
                    <h6 className='ml-3 mt-3'>Income Generated</h6>
                    <ReactApexChart options={initialstate.options} series={initialstate.series} type="area" height={350} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;