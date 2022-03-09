import React from 'react';
import styled from '@emotion/styled';

// Ant design
import { Empty, Tabs } from 'antd';

// Shared components
import TodoItem from 'src/component/todoList/todoItem';

const { TabPane } = Tabs;

const TodoListCardWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: ${props => props.todos.length === 0 ? 'center' : 'space-between'};

    width: 937px;
    height: 514px;
    padding: 15px 0px;
    min-width: 360px;
    box-sizing: border-box;
    border-radius: 16px;
    
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    background: #FFFFFF;
`;

const EmptyStyle = styled(Empty)`
    .ant-empty-description{
        font-size: 18px;
    }
`;

const TabsStyle = styled(Tabs)`
    width: 900px;

    .ant-tabs-tab {
        width: 278px;
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

const AllTodo = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;

    height: 260px;
    margin-left: 40px;
`;

const BottomFlex = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 0px 65px;
    margin-bottom: 18px;

    font-size: 24px;
`;

const CleanDone = styled.div`
    padding: 0px 30px;
    border: 1px solid #FEC753;
    border-radius: 13px;

    cursor: pointer;
`;

/**
 * 待辦清單頁面
 *
 * @param {object} todos todo object
 * @param {function(e)} setTodos 改變todo object
 *
 * @returns {JSX.Element}
 */
const TodoListCard = ({ todos, setTodos }) => {
    const notDoneNumber = todos.filter(todo => todo.isDone === false).length; // 未完成項目數量

    /**
     * 利用setTodos 改變todo object為done
     * @param {number} id 帶入該item的id
     */
    const handleToggleIsDone = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) { return todo; }
            return {
                ...todo,
                isDone: !todo.isDone
            };
        }));
    };

    /**
     * 刪除該筆item
     * @param {number} id 帶入該item的id
     */
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    /**
     * 清除所有已完成的item
     */
    const handleDeleteAllTodo = () => {
        setTodos(todos.filter(todo => todo.isDone === false));
    };


    return (
        <TodoListCardWrapper todos={todos}>
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
                                        todos.map((todo) =>
                                            <TodoItem
                                                key={-todo.id}
                                                todo={todo}
                                                handleToggleIsDone={handleToggleIsDone}
                                                handleDeleteTodo={handleDeleteTodo}
                                            />
                                        ).reverse()
                                    }
                                </AllTodo>
                            </TabPaneStyle>
                            <TabPaneStyle tab='待完成' key='2'>
                                <AllTodo>
                                    {
                                        todos
                                            .filter(todo => todo.isDone === false)
                                            .map((todo) =>
                                                <TodoItem
                                                    key={todo.id}
                                                    todo={todo}
                                                    handleToggleIsDone={handleToggleIsDone}
                                                    handleDeleteTodo={handleDeleteTodo}
                                                />
                                            ).reverse()
                                    }
                                </AllTodo>
                            </TabPaneStyle>
                            <TabPaneStyle tab='已完成' key='3'>
                                <AllTodo>
                                    {
                                        todos
                                            .filter(todo => todo.isDone === true)
                                            .map((todo) =>
                                                <TodoItem
                                                    key={todo.id}
                                                    todo={todo}
                                                    handleToggleIsDone={handleToggleIsDone}
                                                    handleDeleteTodo={handleDeleteTodo}
                                                />
                                            ).reverse()
                                    }
                                </AllTodo>
                            </TabPaneStyle>
                        </TabsStyle>
                        <BottomFlex>
                            {notDoneNumber}個待完成項目
                            <CleanDone onClick={handleDeleteAllTodo}>
                                清除已完成項目
                            </CleanDone>
                        </BottomFlex>
                    </>
            }
        </TodoListCardWrapper >
    );
};

export default TodoListCard;