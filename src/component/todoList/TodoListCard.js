import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Empty, Tabs } from 'antd';
import AllPage from './allPage';

const { TabPane } = Tabs;

const TodoListCardWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-sizing: border-box;
    padding: 15px 0px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    border-radius: 16px;
    width: 937px;
    height: 514px;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const EmptyStyle = styled(Empty)`
    .ant-empty-description{
        font-size: 18px;
    }
`;

const TabsStyle = styled(Tabs)`
    width: 900px;
    .ant-tabs-tab {
        width: 275px;
        justify-content: center;
        .ant-tabs-tab-btn {
            color: #AAAAAA;
            font-size: 24px;
        }
        &.ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #2B2B2B;
            font-weight: 500;
        }
    }
    .ant-tabs-ink-bar {
        background: #2B2B2B;
    }
`;

const TabPaneStyle = styled(TabPane)`
    overflow: auto;
`;

const AllTodo = styled('div')`
    height: 330px;
`;


const WeatherCard = ({ todos, ...props }) => {

    return (
        <TodoListCardWrapper>
            {/* 沒資料顯示 */}
            {/* <EmptyStyle
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>
                        未有待辦事項，請由上方輸入<br/>輸入完成後按Enter即可將項目加入清單
                    </span>
                }
            >
            </EmptyStyle> */}

            {/* 有資料顯示 */}
            <TabsStyle defaultActiveKey="1" size='large'>
                <TabPaneStyle tab="全部" key="1">
                    <AllTodo>
                        {
                            todos.map((todo, index) => <div key={index}>{todo}</div>)
                        }
                    </AllTodo>
                    {/* <AllPage todos={todos}></AllPage> */}
                </TabPaneStyle>
                <TabPaneStyle tab="待完成" key="2">
                    待完成
                </TabPaneStyle>
                <TabPaneStyle tab="已完成" key="3">
                    已完成
                </TabPaneStyle>
            </TabsStyle>
        </TodoListCardWrapper >
    )
}

export default WeatherCard;