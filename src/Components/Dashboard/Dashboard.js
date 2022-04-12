import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import Sidebar from '../Sidebar';
import { ReactComponent as NewUsersIcon } from '../../assests/usersLight.svg';
import { ReactComponent as CancelledIcon } from '../../assests/usersdark.svg';
import { ReactComponent as FreeUsersIcon } from '../../assests/usersyellow.svg';
import { ReactComponent as HoursIcon } from '../../assests/usersgreen.svg';
import { ReactComponent as DollarIcon } from '../../assests/dollar.svg';
import moment from 'moment';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Dashboard = () => {
    const [loading, setLoading] = React.useState(false);
    // const [free, setFree] = React.useState("");
    // const [full, setFull] = React.useState("");
    const [income, setIncome] = React.useState("");
    const [x, setX]= React.useState();
    const [y, setY]= React.useState();
    var today = moment().format("YYYY-MM-DD");
    var day1 = moment().subtract(1, "days").format("YYYY-MM-DD");
    var day7 = moment().subtract(7, "days").format("YYYY-MM-DD");
    var day30 = moment().subtract(30, "days").format("YYYY-MM-DD");
    const state = {
        filter: "",
    }
    const [FormData, setFormData] = React.useState(state);
    const { filter } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        // eslint-disable-next-line
        if (name === "filter" && value == 1) {
            setLoading(true)
            const link = "income/byPeriod"
            axios.post(link,
                {
                    startDate: day1,
                    endDate: today
                }).then((res) => {
                    if (res.data.success === true) {
                        setIncome(res?.data?.Data)
                        setX(res?.data?.Data?.transactions?.map((item, index) => (item["updatedAt"])))
                        setY(res?.data?.Data?.transactions?.map((item, index) => (item["income"])))
                        setLoading(false)
                    }
                })
        }
        // eslint-disable-next-line
        else if (name === "filter" && value == 7) {
            setLoading(true)
            const link = "income/byPeriod"
            axios.post(link,
                {
                    startDate: day7,
                    endDate: today
                }).then((res) => {
                    if (res.data.success === true) {
                        setIncome(res?.data?.Data)
                        setX(res?.data?.Data?.transactions?.map((item, index) => (item["updatedAt"])))
                        setY(res?.data?.Data?.transactions?.map((item, index) => (item["income"])))
                        setLoading(false)
                    }
                    console.log('res', res)
                })
        }
        // eslint-disable-next-line
        else if (name === "filter" && value == 30) {
            setLoading(true)
            const link = "income/byPeriod"
            axios.post(link,
                {
                    startDate: day30,
                    endDate: today
                }).then((res) => {
                    if (res.data.success === true) {
                        setIncome(res?.data?.Data)
                        setX(res?.data?.Data?.transactions?.map((item, index) => (item["updatedAt"])))
                        setY(res?.data?.Data?.transactions?.map((item, index) => (item["income"])))
                        setLoading(false)
                    }
                })
        }
        else {
            setFormData({
                ...FormData,
                [name]: value
            })
        }

    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);
    const fetchData = async (page, value) => {
        setLoading(true);
        // debugger;
        try {
            const res = await Promise.all([
                axios.get(`income`),
                // axios.get(`package/free-members`),
                // axios.get(`package/24hour-members`),

                //         : value === "trashed" ? axios.get("category/status/trashed")
                //             : value === "search" ? axios.get(`category?keyword=${keyword}`)
                //                 : axios.get("category"),
            ]);
            console.log(res)
            // setFree(res[1]?.data?.users?.length ?? 0);
            // setFull(res[2]?.data?.users?.length?? 0);
            setIncome(res[0]?.data?.Data)
            setX(res?.data?.Data?.transactions?.map((item, index) => (item["updatedAt"])))
            setY(res?.data?.Data?.transactions?.map((item, index) => (item["income"])))
            setLoading(false)
            // this.onPageChange(page);
        } catch (error) {
            setLoading(false)
            console.log(error.response.data)
            if (error.response.data.code === 401) {
                localStorage.clear()
                window.location = "/login"
            }
        };
    };
    console.log(x)
    console.log(y)
    const initialstate = {
        series: [{
            data: [{ x: '01/06/2022', y: 54 }, { x: '03/08/2022', y: 17 }, { x: '03/28/2022', y: 26 }]
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
            // xaxis: {
            //     type: 'datetime',
            //     categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            // },
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
                        <div className=' Light mx-1 mt-2'>
                            <h6 className='ml-3 mt-3'>Members</h6>
                            <div className='row mx-2 my-2'>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #0F74AF', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <NewUsersIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">24 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle bgBlue text-center p-1 m-0 font_16">New Members</h6>
                                </div>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #48A7DF', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <CancelledIcon /> </h5>
                                        <h6 className="card-subtitle mb-2 text-center">35 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle text-center p-1 m-0 font_16" style={{ backgroundColor: '#48A7DF', color: 'white' }}>Cancelled Members</h6>
                                </div>
                            </div>
                        </div>
                        <div className=' Light mx-1 mt-2'>
                            <h6 className='ml-3 mt-3'>Members By Packages</h6>
                            <div className='row  mx-2 my-2'>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #0F74AF', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <NewUsersIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">12 Members</h6>
                                    </div>
                                    <h6 className="card-subtitle bgBlue text-center p-1 m-0 font_16">Paid Monthly</h6>
                                </div>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #FFB100', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <FreeUsersIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">{
                                            loading === true ?
                                                antIcon :
                                                23 + " Members"}</h6>
                                    </div>
                                    <h6 className="card-subtitle text-center p-1 m-0 font_16" style={{ backgroundColor: '#FFB100', color: 'white' }}>Free</h6>
                                </div>
                                <div className="card mx-2 mt-1" style={{ width: "200px", border: '1px solid #12BF7D', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"> <HoursIcon /> </h5>
                                        <h6 className="card-subtitle mt-2 text-center">{
                                            loading === true ?
                                                antIcon :
                                                25 + " Members"}</h6>
                                    </div>
                                    <h6 className="card-subtitle text-center p-1 m-0 font_16" style={{ backgroundColor: '#12BF7D', color: 'white' }}>24 Hours</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    {console.log(income)}
                    <div className='row mx-0'>
                        <div className=' mx-0 mt-2'>
                            <div className='row mx-2 my-2'>
                                <div className="card mx-2 mt-1" style={{ width: "300px", border: '1px solid #22BF7D', borderRadius: '4px' }}>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='mr-auto mx-auto'>
                                                <h6 className="card-subtitle mt-2 text-center font-weight-bold">
                                                    {
                                                        loading === true ?
                                                            antIcon :
                                                            "$" + income?.total}</h6>
                                                <h6 className="card-subtitle mt-2 text-center">Income Generated</h6>
                                                <select onChange={onHandleChange} name='filter' className='blue Radius2'>
                                                    <option value="" className='blue'>Select Period</option>
                                                    <option value="1" className='blue'> 1 Day</option>
                                                    <option value="7" className='blue'>7 Days</option>
                                                    <option value="30" className='blue'>30 Days</option>
                                                </select>
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