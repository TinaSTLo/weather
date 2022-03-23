import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

// Ant design
import { Empty, Tabs } from 'antd';

// Shared components
import TodoItem from 'src/component/todoList/todoItem';

// GlobalContext
import { useGlobalStore } from 'src/contexts/globalContext';

// i18n
import { useIntl } from 'react-intl';

const { TabPane } = Tabs;

const TodoListCardWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: ${({ todos }) => todos.length === 0 ? 'center' : 'space-between'};

    width: 100%;
    min-height: ${({ rwdMode, todos }) => rwdMode === 'desktop' ? 514 : todos.length === 0 ? 213 : 542}px;
    padding: 15px 0px;
    box-sizing: border-box;
    border-radius: 16px;
    
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    background: #FFFFFF;
`;

const EmptyStyle = styled(Empty)`
    .ant-empty-description{
        font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 18 : 16}px;
    }
`;

const TabsStyle = styled(Tabs)`
    width: 100%;
    
    .ant-tabs-tab {
        justify-content: center;
        width: ${({ wrapperWidth }) => wrapperWidth ? wrapperWidth / 3 : 312}px;

        .ant-tabs-tab-btn {
            color: #AAAAAA;
            font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 24 : 18}px;
        }
        &.ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #2B2B2B;
            font-weight: 500;
        }
    }

    .ant-tabs-nav .ant-tabs-nav-wrap {
        flex-direction: column;

        .ant-tabs-nav-list {
            justify-content: space-evenly;
        }
    }

    .ant-tabs-ink-bar {
        background: #2B2B2B;
    }
`;

const TabPaneStyle = styled(TabPane)`
    overflow: auto;
    width: 95%;
`;

const AllTodo = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;

    height: ${({ rwdMode }) => rwdMode === 'desktop' ? 260 : 300}px;
    margin-left: ${({ rwdMode }) => rwdMode === 'desktop' ? 60 : 15}px;
    overflow-x: hidden;
`;

const BottomFlex = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 0px 60px;
    margin-bottom: 18px;
    ${({ rwdMode }) => {
        if (rwdMode !== 'desktop') {
            return `
                flex-direction: column;
                align-items: center;
            `;
        }
    }};
`;

const NotDone = styled.div`
    font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 24 : 18}px;
    ${({ rwdMode }) => {
        if (rwdMode !== 'desktop') {
            return `
                padding-bottom: 34px;
            `;
        }
    }};
`;

const CleanDone = styled.div`
    padding: ${({ rwdMode }) => rwdMode === 'desktop' ? '0px 30px;' : '3px 36px'}; 
    border: 1px solid #FEC753;
    border-radius: 13px;

    cursor: pointer;
    font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 24 : 16}px;
`;

const EmptyText = styled.div`
    margin-top: 40px;
`;

/**
 * Todo List Layout
 *
 * @param {object} todos            Todo object
 * @param {function(e)} setTodos    Change todo object
 *
 * @returns {JSX.Element}
 */
const TodoListCard = ({ todos, setTodos }) => {
    const notDoneNumber = todos.filter(todo => todo.isDone === false).length; // Not done items number

    const { rwdMode } = useGlobalStore(); // RWD

    const [wrapperWidth, setWrapperWidth] = useState(null); // Client width
    const wrapperRef = useRef(null); // Wrapper Ref

    const { formatMessage: i18n } = useIntl(); // i18n

    /**
     * Use setTodos and change todo object to done
     * @param {number} id Item id when clicking
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
     * Delete this item
     * @param {number} id Item id when clicking
     */
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    /**
     * Clear all items which are done
     */
    const handleDeleteAllTodo = () => {
        setTodos(todos.filter(todo => todo.isDone === false));
    };

    /**
     * When window change size set wrapper width change
     */
    useEffect(() => {
        window.onresize = () => {
            setWrapperWidth(wrapperRef.current?.clientWidth);
        };
    }, [wrapperWidth]);


    return (
        <TodoListCardWrapper
            todos={todos}
            rwdMode={rwdMode}
            ref={wrapperRef}
        >
            {
                todos.length === 0
                    ?
                    <EmptyStyle
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                            <EmptyText>
                                {i18n({ id: 'todoListCard_no_todolist' })/* 未有待辦事項，請由上方輸入 */}
                                <br />
                                {i18n({ id: 'todoListCard_press_enter' })/* 輸入完成後按Enter即可將項目加入清單 */}
                            </EmptyText>
                        }
                        rwdMode={rwdMode}
                    >
                    </EmptyStyle>
                    :
                    <>
                        <TabsStyle
                            defaultActiveKey='1'
                            size='large'
                            rwdMode={rwdMode}
                            tabBarStyle={{ color: '#800' }}
                            wrapperWidth={wrapperWidth}
                        >
                            <TabPaneStyle tab={i18n({ id: 'todoListCard_tab_all' })/* 全部 */} key='1'>
                                <AllTodo rwdMode={rwdMode}>
                                    {
                                        todos.map((todo) =>
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
                            <TabPaneStyle tab={i18n({ id: 'todoListCard_tab_not_completed' })/* 待完成 */} key='2'>
                                <AllTodo rwdMode={rwdMode}>
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
                            <TabPaneStyle tab={i18n({ id: 'todoListCard_tab_completed' })/* 已完成 */} key='3'>
                                <AllTodo rwdMode={rwdMode}>
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
                        <BottomFlex rwdMode={rwdMode}>
                            <NotDone rwdMode={rwdMode}>
                                {notDoneNumber} {i18n({ id: 'todoListCard_items_completed' })/* 個待完成項目 */}
                            </NotDone>
                            <CleanDone
                                onClick={handleDeleteAllTodo}
                                rwdMode={rwdMode}
                            >
                                {i18n({ id: 'todoListCard_clear_completed' })/* 清除已完成項目 */}
                            </CleanDone>
                        </BottomFlex>
                    </>
            }
        </TodoListCardWrapper >
    );
};

export default TodoListCard;