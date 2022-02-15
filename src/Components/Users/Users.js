import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Popconfirm, Spin, notification } from 'antd';
import Sidebar from '../Sidebar';
import { ReactComponent as DeleteIcon } from '../../assests/delete.svg';
import { ReactComponent as ViewIcon } from '../../assests/eyefill.svg';
import { NavLink } from 'react-router-dom';
import dateFormat from "dateformat";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        sorter: (a, b) => a.username - b.username,
    },
    {
        title: 'Name',
        sorter: true,
        render: (record) => (
            <>
            {record.firstName+ " "+ record.lastName}
            </>
        )
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email - b.email,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        sorter: (a, b) => a.role - b.role,
    },
    {
        title: 'Date Added',
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
                    <Popconfirm title="Sure to delete?" onConfirm={() => (record.key)}>
                        <Button className='' size={'small'} type='primary' danger> <DeleteIcon /> </Button> </Popconfirm>
                    <NavLink to={"/user/detail/" + record._id}> <Button className=' bgGreen' size={'small'} > <ViewIcon /> </Button></NavLink>
                </Space>
            </>
        ),
    },
];

const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({
        key: i,
        _id: i,
        name: 'John Brown',
        email: 'John@gmail.com',
        age: `${i}2`,
        role: 'Editor',
        date: '2021/09/22 at 8:07 am	',
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
}

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

class Users extends React.Component {
    state = {
        bordered: false,
        loading: false,
        pagination,
        size: 'small',
        // expandable,
        title: undefined,
        showHeader,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
        search: '',
        bulkActions: '',
        filter: '',
        load: false,
        errorMessage: null
    };

    onHandleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    fetchData = async (value, keyword) => {
        try {
            const res = await Promise.all([
                axios.get("users"),
                // value === "published" ? axios.get("category/status/published")
                //     : value === "draft" ? axios.get("category/status/drafted")
                //         : value === "trashed" ? axios.get("category/status/trashed")
                //             : value === "search" ? axios.get(`category?keyword=${keyword}`)
                //                 : axios.get("category"),
            ]);
            console.log(res)
            this.setState({
                // data: (value === "published" ? res[0].data.categoriesFound
                //     : value === "draft" ? res[0].data.categoriesFound
                //         : value === "trashed" ? res[0].data.categoriesFound
                //             : value === "search" ? res[0].data.categories
                //                 : res[0].data.categories),
                data: res[0].data.users,
                load: true
            })
        } catch {
            this.setState({ errorMessage: "Something went Wrong" })
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    handleRowSelectionChange = enable => {
        this.setState({ rowSelection: enable ? {} : undefined });
    };

    handleYScrollChange = enable => {
        this.setState({ yScroll: enable });
    };

    handleDataChange = hasData => {
        this.setState({ hasData });
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
                            <button className='btn' onClick={() => this.fetchData("published")}>Admin </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("draft")}>Editors </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("trashed")}>Free Members </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("trashed")}>Monthly Members </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("trashed")}>New Members </button>
                            <button className='btn'>| </button>
                            <button className='btn' onClick={() => this.fetchData("trashed")}>Cancelled Members </button>
                        </div>

                        <div className='displayFlex mt-3'>
                            <div className='displayFlex'>
                                <select value={state.bulkActions} onChange={this.onHandleChange} name='bulkActions' className='blue Radius2'>
                                    <option value="" className='blue'>Bulk Actions</option>
                                    <option value="saab" className='blue'>Saab</option>
                                    <option value="opel" className='blue'>Opel</option>
                                    <option value="audi" className='blue'>Audi</option>
                                </select>
                                <Button className="bgBlue mx-2" size={'small'}> Apply </Button>
                            </div>
                            <div className='displayFlex'>
                                <Button className="border-0 mx-2" size={'small'}> Filter </Button>
                                <select value={state.filter} onChange={this.onHandleChange} name='filter' className='blue Radius2'>
                                    <option value="" className='blue'>Select Period</option>
                                    <option value="saab" className='blue'>Saab</option>
                                    <option value="opel" className='blue'>Opel</option>
                                    <option value="audi" className='blue'>Audi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Table
                            {...this.state}
                            pagination={{ position: [this.state.top, this.state.bottom] }}
                            columns={tableColumns}
                            dataSource={state.hasData ? this.state.data : null}
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