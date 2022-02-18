import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Popconfirm, Spin, notification, message } from 'antd';
import Sidebar from '../Sidebar';
import { ReactComponent as DeleteIcon } from '../../assests/delete.svg';
import { ReactComponent as ViewIcon } from '../../assests/eyefill.svg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import dateFormat from "dateformat";
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
        title: 'Author',
        dataIndex: 'author',
        sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
        title: 'Date Added',
        render: (record) => (
            <>
                {dateFormat(record.createdAt, "yyyy/mm/dd, h:MM:ss tt")}
            </>
        )
    },
    // {
    //     title: 'View Count',
    //     dataIndex: 'count',
    //     sorter: (a, b) => a.count - b.count,
    // },
    // {
    //     title: 'Status',
    //     dataIndex: 'status',
    //     sorter: (a, b) => a.status - b.status,
    // },
    {
        title: 'Action',
        key: 'action',
        sorter: false,
        render: (record) => (
            <>
                <Space size="middle">
                    <NavLink to={"/post/edit/" + record._id}> <Button className=' bgBlue' size={'small'}> Edit </Button> </NavLink>
                    <Popconfirm title="Sure to delete?" onConfirm={() => (DeletePost(record._id))}>
                        <Button className='' size={'small'} type='primary' danger> <DeleteIcon /> </Button> </Popconfirm>
                    <NavLink to={"/post/detail/" + record._id}> <Button className=' bgGreen' size={'small'} > <ViewIcon /> </Button></NavLink>
                </Space>
            </>
        ),
    },
];

const DeletePost = (id) => {
    const link = "article/" + id
    axios.delete(link)
        .then((res) => {
            if (res.data.success) {
                message.success('Article Deleted Successfully')
                window.location = "/posts"
            }
        }).catch(function (error) {
            console.log(error)
        });
}

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

class Posts extends React.Component {
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
        data: [],
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

   fetchData = async (page, value, keyword) => {
        console.log(page)
        try {
            const res = await Promise.all([
                value === "search"? axios.get(`article?keyword=${keyword}`):
                axios.get(`article?pageNumber=${page}`)
            ]);
            this.setState({
                load: true,
                data: (value === "search"? res[0].data.articles:
                res[0].data.articles),
                totalPage: res[0].data.pages,
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
        console.log(this.state.current, 'current page')
        this.fetchData(this.state.current)
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
                                <h6 className='mr-auto'>Posts</h6>
                                <NavLink to='/post/add'>
                                    <Button className="bgBlue mx-2" size={'small'}> Add Post </Button>
                                </NavLink>
                            </div>
                            <div className='displayFlex'>
                                <input type="text" className='lightBlue border-0 outline' value={state.search} onChange={this.onHandleChange} name='search' placeholder='Search' />
                                <Button className="bgBlue mx-1" size={'small'} onClick={() => this.fetchData(this.state.current,"search", state.search)}> Search </Button>
                            </div>
                        </div>
                        {/* <table className="table table-responsive-md mt-3">
                            <tbody>
                                <tr className=''>
                                    <td className=' textCenter font_14'>All</td>
                                    <td className='borderLeft textCenter font_14'>Published</td>
                                    <td className='borderLeft textCenter font_14'>Draft</td>
                                    <td className='borderLeft textCenter font_14'>Trashed</td>
                                    <td className='borderLeft textCenter font_14'>Monthly Members</td>
                                    <td className='borderLeft textCenter font_14'>24 hour Members</td>
                                    <td className='borderLeft textCenter font_14'>New Members</td>
                                    <td className='borderLeft textCenter font_14'>Cancelled Members</td>
                                </tr>
                            </tbody>
                        </table> */}
                        <div className='displayFlex mt-3'>
                            <div className='displayFlex'>
                                <select value={state.bulkActions} onChange={this.onHandleChange} name='bulkActions' className='blue outline Radius2'>
                                    <option value="" className='blue'>Bulk Actions</option>
                                    <option value="saab" className='blue'>Saab</option>
                                    <option value="opel" className='blue'>Opel</option>
                                    <option value="audi" className='blue'>Audi</option>
                                </select>
                                <Button className="bgBlue mx-2" size={'small'}> Apply </Button>
                            </div>
                            <div className='displayFlex'>
                                <Button className="border-0 mx-2" size={'small'}> Filter </Button>
                                <select value={state.filter} onChange={this.onHandleChange} name='filter' className='blue outline Radius2'>
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
                            pagination={{ pageSize: 10, defaultCurrent: this.state.current, onChange: this.onPageChange, total: this.state.totalPage * 10, showSizeChanger: false }}
                            columns={tableColumns}
                            dataSource={state.hasData ? this.state.data : null}
                            loading={{ indicator: <div><Spin indicator={antIcon} /></div>, spinning: !this.state.load }}
                            scroll={scroll} className="table-responsive" />
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
export default Posts;