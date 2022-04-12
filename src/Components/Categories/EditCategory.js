import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Popconfirm, message, Spin } from 'antd';
import Sidebar from '../Sidebar';
import { ReactComponent as DeleteIcon } from '../../assests/delete.svg';
import axios from 'axios';

const columns = [
    {
        title: 'Cateogories',
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
        title: 'Post Counts',
        dataIndex: 'postCount',
        sorter: (a, b) => a.postCount - b.postCount,
    },
    {
        title: 'Action',
        key: 'action',
        sorter: false,
        render: (record) => (
            <>
                <Space size="middle">
                    <a href={"/category/edit/" + record._id}> <Button className=' bgBlue' size={'small'}> Edit </Button> </a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => (DeleteCategory(record._id))}>
                        <Button className='' size={'small'} type='primary' danger> <DeleteIcon /> </Button> </Popconfirm>
                </Space>
            </>
        ),
    },
];

const DeleteCategory = (id) => {
    const link = "category/" + id
    axios.delete(link)
        .then((res) => {
            if (res.data.success) {
                message.success('Category Deleted Successfully')
                window.location = "/categories"
            }
        }).catch(function (error) {
            console.log(error)
        });
}

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

var array;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        if(selectedRowKeys?.length>0){
            array=selectedRowKeys;
        }
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};
const DeleteMultiple = () => {
    console.log('id', array)
    const link = "category/deleteBulk"
    axios.post(link,{
        deleteCategories:array
    })
        .then((res) => {
            console.log('del',res)
            if (res.data.success===true) {
                message.success('Arcicles Deleted Successfully')
                window.location = "/posts"
            }
        }).catch(function (error) {
            console.log(error)
        });
}
class EditCategory extends React.Component {
    formRef = React.createRef();
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
        name: '',
        slug: '',
        data: [],
        current: 1,
        totalPage: 0,
        id: '',
        load: false,
        selectionType: 'checkbox'
    };

    onHandleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    fetchData = async (page, value) => {
        try {
            const res = await Promise.all([
                axios.get("category/" + this.props.match.params._id),
                value === "published" ? axios.get("category/status/published")
                    : value === "draft" ? axios.get("category/status/drafted")
                        : value === "trashed" ? axios.get("category/status/trashed")
                            : axios.get(`category?pageNumber=${page}`),
            ]);
            this.setState({
                data: (value === "published" ? res[1].data.categoriesFound
                    : value === "draft" ? res[1].data.categoriesFound
                        : value === "trashed" ? res[1].data.categoriesFound
                            : res[1].data.categories),
                totalPage: res[0].data.pages,
                name: res[0].data.categoryFound.name,
                slug: res[0].data.categoryFound.slug,
                id: res[0].data.categoryFound._id,
                load: true
            })
        } catch {
            console.log('error');
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
    EditCategory = (id) => {
        const link = "category/" + id
        axios.put(link,
            {
                name: this.state.name,
                slug: this.state.slug
            })
            .then((res) => {
                if (res.data.success) {
                    message.success('Category Updated Successfully')
                    window.location = "/categories"
                }
            }).catch(function (error) {
                console.log(error)
            });
    }

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
                    <div className='displayFlex ml-2'>
                        <h6 className='mr-auto font-weight-bold'>Categories</h6>
                    </div>
                    <div className='row '>
                        <div className='col-md-4 ml-lg-2 pt-5'>
                            <h6 className=' font-weight-bold'>Edit Category</h6>
                            <div className='mt-2'>
                                <div className='px-0'>
                                    <div className='col-md-12 mt-2 px-0'>
                                        <input placeholder="Name" name="name" value={state.name} onChange={this.onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                        <p className='mt-1'>The name is how it appears on your site.</p>
                                    </div>

                                    <div className='col-md-12 mt-2 px-0'>
                                        <input placeholder="Slug" name="slug" value={state.slug} onChange={this.onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2" />
                                        <p className='mt-1'>The “slug” is the URL-friendly version of the name. It is
                                            usually all lowercase and contains only letters, numbers,
                                            and hyphens.</p>
                                    </div>
                                    <div className='col-md-12 mt-2 px-0'>
                                        <Button size="middle" type="primary" htmlType="submit" onClick={() => this.EditCategory(state.id)} className=" Radius8 ">
                                            Update Category
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-7 mx-auto'>
                            <div className='row'>
                                <button className='btn' onClick={() => this.fetchData()}>All </button>
                                <button className='btn'>| </button>
                                <button className='btn' onClick={() => this.fetchData("published")}>Published </button>
                                <button className='btn'>| </button>
                                <button className='btn' onClick={() => this.fetchData("draft")}>Draft </button>
                                <button className='btn'>| </button>
                                <button className='btn' onClick={() => this.fetchData("trashed")}>Trashed </button>
                            </div>
                            <div className='row mt-3'>
                                <div className='mr-auto'>
                                    <div className='displayFlex  '>
                                        <select value={state.bulkActions} onChange={this.onHandleChange} name='bulkActions' className='blue Radius2 outline'>
                                            <option value="" className='blue'>Bulk Actions</option>
                                            <option value="saab" className='blue'>Delete</option>
                                        </select>
                                        <Button className="bgBlue mx-2" size={'small'} onClick={DeleteMultiple}> Apply </Button>
                                    </div>
                                </div>
                                <div className='ml-auto'>
                                    <div className='displayFlex'>
                                        <input type="text" className='lightBlue border-0 outline' value={state.search} onChange={this.onHandleChange} name='search' placeholder='Search' />
                                        <Button className="bgBlue mx-1" size={'small'}> Search </Button>
                                    </div>
                                </div>

                            </div>
                            <div className='mt-2'>
                                <Table
                                    {...this.state}
                                    rowKey="_id"
                                    rowSelection={{
                                        type: state.selectionType,
                                        ...rowSelection,
                                    }}
                                    pagination={{ pageSize: 10, defaultCurrent: this.state.current, onChange: this.onPageChange, total: this.state.totalPage * 10, showSizeChanger: false }}
                                    columns={tableColumns}
                                    dataSource={state.hasData ? this.state.data : null}
                                    loading={{ indicator: <div><Spin /></div>, spinning: !this.state.load }}
                                    scroll={scroll} className="table-responsive " />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default EditCategory;