import React from 'react';
import styled from '@emotion/styled';
import { Empty, Tabs } from 'antd';
import TodoItem from './todoItem';

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
    align-items: center;
    flex-direction: column;
    justify-content: space-between
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
    height: 260px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    // align-items: stretch;
    justify-content: flex-start;
`;

const BottomFlex = styled('div')`
    width: 100%;
    padding: 0px 65px;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    margin-bottom: 18px;
`;

const TodoNumber = styled('div')`

`;

const CleanDone = styled('div')`
    border: 1px solid #FEC753;
    border-radius: 13px;
    padding: 0px 30px;
`;

const WeatherCard = ({ todos, setTodos, ...props }) => {

    const handleToggleIsDone = id => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            return {
                ...todo,
                isDone: !todo.isDone
            }
        }));
    }

    const handleDeleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const notDoneNumber = todos.filter(todo => todo.isDone === false).length;

    return (
        <TodoListCardWrapper>
            {
                todos.length === 0
                    ?
                    <EmptyStyle
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <span>
                                未有待辦事項，請由上方輸入<br />輸入完成後按Enter即可將項目加入清單
                            </span>
                        }
                    >
                    </EmptyStyle>
                    :
                    <>
                        <TabsStyle defaultActiveKey='1' size='large'>
                            <TabPaneStyle tab='全部' key='1'>
                                <AllTodo>
                                    {
                                        todos.map((todo) => <TodoItem
                                            todo={todo}
                                            handleToggleIsDone={handleToggleIsDone}
                                            handleDeleteTodo={handleDeleteTodo}
                                        />)
                                    }
                                </AllTodo>
                            </TabPaneStyle>
                            <TabPaneStyle tab='待完成' key='2'>
                                待完成
                            </TabPaneStyle>
                            <TabPaneStyle tab='已完成' key='3'>
                                已完成
                            </TabPaneStyle>
                        </TabsStyle>
                        <BottomFlex>
                            <TodoNumber>
                                {notDoneNumber}個待完成項目
                            </TodoNumber>
                            <CleanDone>
                                清除已完成項目
                            </CleanDone>
                        </BottomFlex>
                    </>
            }
        </TodoListCardWrapper >
    )
}

export default WeatherCard;