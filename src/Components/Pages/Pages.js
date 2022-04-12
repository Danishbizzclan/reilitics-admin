import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Popconfirm, Spin, notification, message } from 'antd';
import Sidebar from '../Sidebar';
import { ReactComponent as DeleteIcon } from '../../assests/delete.svg';
import { ReactComponent as ViewIcon } from '../../assests/eyefill.svg';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
    {
        title: 'Title',
        sorter: false,
        render: (record) => (
            <>
                <span className='font-weight-bold'>
                    {record.title}
                </span>
            </>
        )
    },
    {
        title: 'View Count',
        dataIndex: 'viewCount',
        sorter: (a, b) => a.viewCount - b.viewCount,
    },
    {
        title: 'Action',
        key: 'action',
        sorter: false,
        render: (record) => (
            <>
                <Space size="middle">
                    <NavLink to={"/page/edit/" + record._id}> <Button className=' bgBlue' size={'small'}> Edit </Button> </NavLink>
                    <Popconfirm title="Sure to delete?" onConfirm={() => (DeletePage(record._id))}>
                        <Button className='' size={'small'} type='primary' danger> <DeleteIcon /> </Button> </Popconfirm>
                    <NavLink to={"/page/view/" + record._id}> <Button className=' bgGreen' size={'small'} > <ViewIcon /> </Button></NavLink>
                </Space>
            </>
        ),
    },
];

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

const DeletePage = (id) => {
    const link = "page/" + id
    axios.delete(link)
        .then((res) => {
            if (res.data.success) {
                message.success('Page Deleted Successfully')
                window.location = "/pages"
            }
        }).catch(function (error) {
            console.log(error)
        });
}


class Pages extends React.Component {
    state = {
        bordered: false,
        loading: false,
        pagination,
        size: 'small',
        // expandable,
        title: undefined,
        showHeader,
        // rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
        search: '',
        bulkActions: '',
        filter: '',
        data: [],
        load: false,
        errorMessage: null,
        successMessage: null,
        current: 1,
        totalPage: 0
    };

    onHandleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    fetchData = async (page, value, keyword) => {
        try {
            const res = await Promise.all([
                value === "search" ? axios.get("page?keyword=" + keyword) :
                    axios.get(`page?pageNumber=${page}`),
            ]);
            this.setState({
                data: value === "search" ? res[0].data.result : res[0].data.result,
                totalPage: res[0].data.pages,
                load: true
            })
        } catch {
            // throw Error("Promise");
            // message.error("Something went wrong")
            this.setState({ errorMessage: "Something went Wrong" })
        }
    };

    componentDidMount() {
        this.fetchData(1);
    }
    onPageChange = page => {
        this.setState({
            current: page,
        });
        this.fetchData(page)
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
                                <h6 className='mr-auto'>Pages</h6>
                            </div>
                            <div className='displayFlex'>
                                <input type="text" className='lightBlue border-0 outline' value={state.search} onChange={this.onHandleChange} name='search' placeholder='Search' />
                                <Button className="bgBlue mx-1" size={'small'} onClick={() => this.fetchData(this.state.current, "search", this.state.search)}> Search </Button>
                            </div>
                        </div>
                    </div>
                    <div className='ml-lg-4 ml-0 mt-3'>
                        <Table
                            {...this.state}
                            pagination={{ pageSize: 10, defaultCurrent: this.state.current, onChange: this.onPageChange, total: this.state.totalPage * 10, showSizeChanger: false }}
                            columns={tableColumns}
                            dataSource={state.hasData ? this.state.data : null}
                            loading={{ indicator: <div><Spin indicator={antIcon} /></div>, spinning: !this.state.load }}
                            scroll={scroll} className="table-responsive " />
                    </div>
                </div>
                {this.state.errorMessage !== null &&
                    notification['error']({
                        message: 'Error',
                        description: this.state.errorMessage,
                        placement: 'bottomLeft'
                    })
                }
                {this.state.successMessage !== null &&
                    notification['sucess']({
                        message: 'Success',
                        description: this.state.successMessage,
                        placement: 'bottomLeft'
                    })
                }
            </>
        );
    }
}
export default Pages;