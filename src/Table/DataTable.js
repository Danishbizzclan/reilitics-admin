import React from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Username',
    dataIndex: 'name',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Name',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Email',
    dataIndex: 'name',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Role',
    dataIndex: 'name',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Date Added',
    dataIndex: 'name',
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a className="ant-dropdown-link">
          More actions <DownOutlined />
        </a>
      </Space>
    ),
  },
];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
const showHeader = true;
const pagination = { position: 'bottom' };

class DataTable extends React.Component {
  state = {
    bordered: false,
    loading: false,
    pagination,
    size: 'default',
    // expandable,
    title: undefined,
    showHeader,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomRight',
  };


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
        <div>
          <table class="table">
            <tbody>
              <tr className='borderLeft'>
                <td className='borderLeft textCenter font_14'>All</td>
                <td className='borderLeft textCenter font_14'>Admin</td>
                <td className='borderLeft textCenter font_14'>Editors</td>
                <td className='borderLeft textCenter font_14'>Free Members</td>
                <td className='borderLeft textCenter font_14'>Monthly Members</td>
                <td className='borderLeft textCenter font_14'>24 hour Members</td>
                <td className='borderLeft textCenter font_14'>New Members</td>
                <td className='borderLeft textCenter font_14'>Cancelled Members</td>
              </tr>
            </tbody>
          </table>
          <div className='displayFlex '>
            <div className='displayFlex ml-2'>
              <h6 className='mr-auto'>Users</h6>
              <Button className='mx-3' size={'small'}> Button </Button>
            </div>
            <div className='displayFlex'>
              <input type="text" className='lightBlue border-0' placeholder='Search' />
              <Button className='mx-3' size={'small'}> Button </Button>
            </div>
          </div>
        </div>
        <Table
          {...this.state}
          pagination={{ position: [this.state.top, this.state.bottom] }}
          columns={tableColumns}
          dataSource={state.hasData ? data : null}
          scroll={scroll} className="table-responsive"
        />
      </>
    );
  }
}
export default DataTable;