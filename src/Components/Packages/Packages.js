import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Popconfirm, Spin, notification, message } from 'antd';
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
        title: 'Name',
        sorter: false,
        render: (record) => (
            <>
                <span className='font-weight-bold'>
                    {record.name}
                </span>
            </>
        )
    },
    {
        title: 'Type',
        dataIndex: 'packageType',
        // sorter: (a, b) => a.packageType - b.packageType,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        // sorter: (a, b) => a.price - b.price,
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
                    {/* <NavLink to={"/packages/edit/" + record._id}> <Button className=' bgBlue' size={'small'}> Edit </Button> </NavLink> */}
                    <Popconfirm title="Sure to delete?" onConfirm={() => (DeletePackage(record._id))}>
                        <Button className='' size={'small'} type='primary' danger> <DeleteIcon /> </Button> </Popconfirm>
                    <NavLink to={"/packages/detail/" + record._id}> <Button className=' bgGreen' size={'small'} > <ViewIcon /> </Button></NavLink>
                </Space>
            </>
        ),
    },
];

const DeletePackage = (id) => {
    const link = "package/" + id
    axios.delete(link)
        .then((res) => {
            if (res.data.success) {
                message.success('Package Deleted Successfully')
                window.location = "/packages"
            }
        }).catch(function (error) {
            console.log(error)
        });
}
// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

class Packages extends React.Component {
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
                axios.get("package"),
            ]);
            this.setState({
                data: res[0].data.packages,
                load: true
            })
        } catch {
            this.setState({ errorMessage: "Something went Wrong" })
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    // handleRowSelectionChange = enable => {
    //     this.setState({ rowSelection: enable ? {} : undefined });
    // };

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
                                <h6 className='mr-auto'>Packages & Pricing</h6>
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
export default Packages;