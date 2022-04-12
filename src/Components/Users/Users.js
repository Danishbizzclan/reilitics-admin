import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Popconfirm, Spin, notification, message } from 'antd';
import Sidebar from '../Sidebar';
import { ReactComponent as DeleteIcon } from '../../assests/delete.svg';
import { ReactComponent as ViewIcon } from '../../assests/eyefill.svg';
import { NavLink } from 'react-router-dom';
import dateFormat from "dateformat";
import axios from 'axios';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const columns = [
    {
        title: 'Username',
        sorter: false,
        render: (record) => (
            <>
                <span className='font-weight-bold'>
                    {record.username}
                </span>
            </>
        )
    },
    {
        title: 'Name',
        sorter: false,
        render: (record) => (
            <>
                <span className=''>
                    {record.firstName + " " + record.lastName}
                </span>
            </>
        )
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'Role',
        dataIndex: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
        title: 'Date Added',
        sorter: true,
        render: (record) => (
            <>
                {dateFormat(record.createdAt, "yyyy/mm/dd, h:MM:ss tt")}
            </>
        )
    },
    {
        title: 'Action',
        key: 'action',
        sorter: false,
        render: (record) => (
            <>
                <Space size="middle">
                    <NavLink to={"/user/edit/" + record._id}> <Button className=' bgBlue' size={'small'}> Edit </Button> </NavLink>
                    <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteUser(record._id))}>
                        <Button className='' size={'small'} type='primary' danger> <DeleteIcon /> </Button> </Popconfirm>
                    <NavLink to={"/user/detail/" + record._id}> <Button className=' bgGreen' size={'small'} > <ViewIcon /> </Button></NavLink>
                </Space>
            </>
        ),
    },
];
const DeleteUser = (id) => {
    const link = "users/" + id
    axios.delete(link)
        .then((res) => {
            if (res.data.success) {
                message.success('User Deleted Successfully')
                window.location = "/users"
            }
        }).catch(function (error) {
            console.log(error)
        });
}
var array;
// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // DeleteMultiple(selectedRowKeys)
        if (selectedRowKeys?.length > 0) {
            array = selectedRowKeys;
        }
        console.log('arr', array)

    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

const DeleteMultiple = () => {
    console.log('id', array)
    const link = "users/deleteBulk"
    axios.post(link, {
        deleteUsers: array
    })
        .then((res) => {
            console.log('del', res)
            if (res.data.success === true) {
                message.success('User Deleted Successfully')
                window.location = "/users"
            }
        }).catch(function (error) {
            console.log(error)
        });
}
class Users extends React.Component {
    state = {
        bordered: false,
        loading: false,
        size: 'small',
        // expandable,
        title: undefined,
        showHeader,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        // bottom: 'bottomRight',
        search: '',
        bulkActions: '',
        filter: '',
        load: false,
        errorMessage: null,
        current: 1,
        totalPage: 0,
        selectedRowKeys: [], // Check here to configure the default column
        selectionType: 'checkbox',
        today: moment().format("YYYY-MM-DD"),
        day1: moment().subtract(1, "days").format("YYYY-MM-DD"),
        day7: moment().subtract(7, "days").format("YYYY-MM-DD"),
        day30: moment().subtract(30, "days").format("YYYY-MM-DD"),
    };
    onHandleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        // eslint-disable-next-line
        if (name === "filter" && value == 1) {
            this.setState({ load: true })
            const link = "users/byPeriod"
            axios.post(link,
                {
                    startDate: this.state.day1,
                    endDate: this.state.today
                }).then((res) => {
                    if (res.data.success === true) {
                        this.setState({
                            data: res.data.Data,
                        })
                    }
                })
        }
        // eslint-disable-next-line
        else if (name === "filter" && value == 7) {
            this.setState({ load: true })
            const link = "users/byPeriod"
            axios.post(link,
                {
                    startDate: this.state.day7,
                    endDate: this.state.today
                }).then((res) => {
                    if (res.data.success === true) {
                        this.setState({
                            data: res.data.Data,
                        })
                    }
                    console.log('res', res)
                })
        }
        // eslint-disable-next-line
        else if (name === "filter" && value == 30) {
            this.setState({ load: true })
            const link = "users/byPeriod"
            axios.post(link,
                {
                    startDate: this.state.day30,
                    endDate: this.state.today
                }).then((res) => {
                    if (res.data.success === true) {
                        this.setState({
                            data: res.data.Data
                        })
                    }
                })
        }
        else {
            this.setState({
                [name]: value
            })
        }

    }
    fetchData = async (page, value) => {
        try {
            const res = await Promise.all([
                value === "admin" ? axios.get("users/editors")
                    : value === "editors" ? axios.get("users/editors")
                        : value === "free" ? axios.get("package/free-members")
                            : value === "monthly" ? axios.get("package/monthly-members")
                                : axios.get(`users?pageNumber=${page}`)
            ]);
            this.setState({
                // data: (value === "published" ? res[0].data.categoriesFound
                //     : value === "draft" ? res[0].data.categoriesFound
                //         : value === "trashed" ? res[0].data.categoriesFound
                //             : value === "search" ? res[0].data.categories
                //                 : res[0].data.categories),
                data: value === "admin" ? res[0].data.editors
                    : value === "editors" ? res[0].data.editors
                        : value === "monthly" ? res[0].data.users
                            : res[0].data.users,
                totalPage: res[0].data.pages,
                // current: res[0].data.page,
                load: true
            })
            // this.onPageChange(page);
        } catch (error) {
            console.log(error?.response?.data)
            if (error.response.data.code === 401) {
                this.setState({ errorMessage: "Session Expired! Login Again" })
                localStorage.clear()
                window.location = "/login"
            }
            else if (error.response.data.code !== 401) {
                this.setState({ errorMessage: error.response.data.message })
            }
        };
    };

    componentDidMount() {
        this.fetchData(1);
    }

    handleYScrollChange = enable => {
        this.setState({ yScroll: enable });
    };

    handleDataChange = hasData => {
        this.setState({ hasData });
    };
    onPageChange = page => {
        this.setState({
            current: page,
        });
        this.fetchData(page)
        // this.setState({
        //     current: page,
        // });
    };
    render() {
        const { xScroll, yScroll, ...state } = this.state;
        const scroll = {};
        if (yScroll) {
            scroll.y = 240;
        }
        if (xScroll) {
            scroll.x = '100vw';
        }

        const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
        if (xScroll === 'fixed') {
            tableColumns[0].fixed = true;
            tableColumns[tableColumns.length - 1].fixed = 'right';
        }

        return (
            <>
                <Sidebar />
                <div className='content pt-5'>
                    <div className='col-11'>
                        <div className='displayFlex '>
                            <div className='displayFlex ml-2'>
                                <h6 className='mr-auto'>Users</h6>
                                <NavLink to='/user/add'>
                                    <Button className="bgBlue mx-2" size={'small'}> Add User </Button>
                                </NavLink>
                            </div>
                            <div className='displayFlex'>
                                <input type="text" className='lightBlue border-0 outline' value={state.search} onChange={this.onHandleChange} name='search' placeholder='Search' />
                                <Button className="bgBlue mx-1" size={'small'}> Search </Button>
                            </div>
                        </div>
                        <div className='row'>
                            <button className='btn' onClick={() => this.fetchData()}>All </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("", "admin")}>Admin </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("", "editors")}>Editors </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("", "free")}>Free Members </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("", "monthly")}>Monthly Members </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("", "new")}>New Members </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("", "cancelled")}>Cancelled Members </button>
                        </div>

                        <div className='displayFlex mt-3'>
                            <div className='displayFlex'>
                                <select value={state.bulkActions} onChange={this.onHandleChange} name='bulkActions' className='blue Radius2'>
                                    <option value="" className='blue'>Bulk Actions</option>
                                    <option value="saab" className='blue'>Delete</option>
                                </select>
                                <Button className="bgBlue mx-2" size={'small'} onClick={DeleteMultiple}> Apply </Button>
                            </div>
                            <div className='displayFlex'>
                                <Button className="border-0 mx-2" size={'small'}> Filter </Button>
                                <select onChange={this.onHandleChange} name='filter' className='blue Radius2'>
                                    <option value="" className='blue'>Select Period</option>
                                    <option value="1" className='blue'> 1 Day</option>
                                    <option value="7" className='blue'>7 Days</option>
                                    <option value="30" className='blue'>30 Days</option>
                                </select>
                            </div>
                            {console.log(state.filter)}
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Table
                            {...this.state}
                            pagination={{ pageSize: 10, current: this.state.current, onChange: this.onPageChange, total: this.state.totalPage * 10, showSizeChanger: false }}
                            columns={tableColumns}
                            dataSource={state.hasData ? this.state.data : null}
                            rowKey="_id"
                            rowSelection={{
                                type: state.selectionType,
                                ...rowSelection
                            }}
                            loading={{ indicator: <div><Spin indicator={antIcon} /></div>, spinning: !this.state.load }}
                            scroll={scroll} className="table-responsive"
                        />
                    </div>
                </div>
                {this.state.errorMessage !== null &&
                    notification['error']({
                        message: 'Error',
                        description: this.state.errorMessage,
                        placement: 'bottomLeft'
                    })
                }
            </>
        );
    }
}
export default Users;