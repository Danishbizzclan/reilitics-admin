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

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;

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
        totalPage: 0
    };

    onHandleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    fetchData = async (page, value) => {
        console.log('page:', page)
        console.log('value:', value)
        try {
            const res = await Promise.all([
                value === "admin" ? axios.get("users/editors")
                    : value === "editors" ? axios.get("users/editors")
                    : value === "free" ? axios.get("package/free-members")
                    : value === "monthly" ? axios.get("package/monthly-members")
                        : axios.get(`users?pageNumber=${page}`),
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
                data: value === "admin" ? res[0].data.editors
                    : value === "editors" ? res[0].data.editors
                    : value === "monthly" ? res[0].data.users
                     :res[0].data.users,
                totalPage: res[0].data.pages,
                // current: res[0].data.page,
                load: true
            })
            // this.onPageChange(page);
        } catch {
            this.setState({ errorMessage: "Something went Wrong" })
        }
    };

    componentDidMount() {
        this.fetchData(1);
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
    onPageChange = page => {
        console.log(page);
        this.setState({
            current: page,
        });
        console.log(page, 'current page')
        this.fetchData(page)
        // this.setState({
        //     current: page,
        // });
    };
    render() {
        const { xScroll, yScroll, ...state } = this.state;
        console.log(this.state.totalPage)
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
                            <button className='btn' onClick={() => this.fetchData()}>All ({this.state?.data?.length}) </button>
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
                    {console.log(this.state.data,'data')}
                    <div className='mt-3'>
                        <Table
                            {...this.state}
                            pagination={{ pageSize: 10, current: this.state.current, onChange: this.onPageChange, total: this.state.totalPage * 10, showSizeChanger: false }}
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