import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Spin, notification } from 'antd';
import Sidebar from '../Sidebar';
import dateFormat from "dateformat";
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = [
    {
        title: 'First Name',
        key: 'firstName',
        sorter: true,
        render: (record) => (
            <>
                {record.firstName}
            </>
        ),
    },
    {
        title: 'Last Name',
        key: 'lastName',
        sorter: true,
        render: (record) => (
            <>
                {record.lastName}
            </>
        ),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email - b.email,
    },
    {
        title: 'Date',
        key: 'createdAt',
        sorter: true,
        render: (record) => (
            <>
                {dateFormat(record.createdAt, "yyyy/mm/dd, h:MM:ss tt")}
            </>
        )
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        sorter: (a, b) => a.subject - b.subject,
    },
    {
        title: 'Message',
        dataIndex: 'message',
        sorter: (a, b) => a.message - b.message,
    }
];

const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({
        key: i,
        _id: i,
        title: 'How to transfer photos from iPhone to Mac?',
        author: 'Tabish',
        categories: `Categories`,
        date: '2021/09/22 at 8:07 am	',
        count: '2',
        status: `Draft`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
}

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

class Contact extends React.Component {
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
        load: false,
        isModalVisible: false,
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
                axios.get("contacts"),
            ]);
            this.setState({
                data: res[0].data.contact,
                load: true
            })
        } catch {
            this.setState({
                errorMessage: "Something Went Wrong"
            })
        }
    };

    componentDidMount() {
        this.fetchData();
    }
    showModal = () => {
        this.setState({ isModalVisible: true })
    }
    handleOk = () => {
        this.setState({ isModalVisible: false })
    };
    handleCancel = () => {
        this.setState({ isModalVisible: false })
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
                                <h6 className='mr-auto'>Contact Forms</h6>
                            </div>
                            <div className='displayFlex'>
                                <input type="text" className='lightBlue border-0 outline' value={state.search} onChange={this.onHandleChange} name='search' placeholder='Search' />
                                <Button className="bgBlue mx-1" size={'small'}> Search </Button>
                            </div>
                        </div>
                        <div className='row'>
                            <button className='btn' >All (13) </button>
                            <button className='btn'>| </button>
                            <button className='btn' >Spam </button>
                        </div>
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
                            pagination={{ position: [this.state.top, this.state.bottom] }}
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
export default Contact;