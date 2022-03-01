import React, { useState } from 'react';
import { Table, Space } from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';

const AllPage = ({ todos }) => {
    const [hasData, setHasData] = useState(true);
    const [ellipsis, setEllipsis] = useState(false);
    // state = {
    //     rowSelection: {},
    //     scroll: undefined,
    //     hasData: true,
    //     top: 'none',
    //     bottom: 'none',
    // };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            sorter: true,
            render: () => (
                <a>
                    <CloseOutlined />
                </a>
                // <Space size="middle">
                //     <a>Delete</a>
                // </Space>
            ),
            align: 'right'
        },
    ];

    // const data = [
    //     {
    //         key: 1,
    //         name: 'John Brown',
    //     },
    //     {
    //         key: 2,
    //         name: 'John Brown',
    //     },
    //     {
    //         key: 3,
    //         name: 'John Brown',
    //     },
    //     {
    //         key: 4,
    //         name: 'John Brown',
    //     }
    // ];
    // for (let i = 1; i <= 5; i++) {
    //     data.push({
    //         key: i,
    //         name: 'John Brown',
    //         age: `${i}2`,
    //         address: `New York No. ${i} Lake Park`,
    //         description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    //     });
    // }
    // const { xScroll, yScroll, ...state } = this.state;

    // const scroll = {};
    // if (yScroll) {
    //     scroll.y = 240;
    // }
    // if (xScroll) {
    //     scroll.x = '100vw';
    // }

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const tableColumns = columns.map(item => ({ ...item, ellipsis: ellipsis }));
    // if (xScroll === 'fixed') {
    //     tableColumns[0].fixed = true;
    //     tableColumns[tableColumns.length - 1].fixed = 'right';
    // }
    // const [todos, setTodos] = useState([
    //     1
    // ]);

    // const handleButtonClick = () => {
    //     // 傳入參數: 新的 todo + 解構 todos
    //     setTodos(["new todo", ...todos]);
    // }

    return (
        <>
            <Table
                pagination='none'
                showHeader={false}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={tableColumns}
                dataSource={hasData ? todos : null}
            />
        </>
        // <div>
        //     {
        //         data.map((todo, index) => <div key={index} content={todo}>123</div>)
        //     }
        // </div>
    );
}

export default AllPage;