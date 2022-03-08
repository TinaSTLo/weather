import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

// Shared component
import TodoListCard from 'src/component/todoList/TodoListCard';

// Ant design
import { Input } from 'antd';

// Global context
import { useGlobalStore } from 'src/contexts/globalContext';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#fff',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282'
    }
};

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    height: calc(100vh - 47px);
`;

const InputStyle = styled(Input)`
    width: 937px;
    height: 75px;
    margin-bottom: 16px;
    padding-left: 16px;
    border-radius: 16px;

    box-shadow: 0px 3px 6px #00000029;

    font-size: 24px;
`;

const TodoList = () => {
    const { id, todos, setTodos } = useGlobalStore();
    const [singleValue, setSingleValue] = useState(''); // input值

    /**
     * 待辦事項 input 設定singleValue值
     *
     * @param {*} e event
     */
    const handleInputChange = (e) => {
        setSingleValue(e.target.value);
    };

    /**
     * 監聽按Enter後 設定setTodos值
     *
     * @param {*} e event
     */
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value) {
                setTodos([
                    ...todos,
                    {
                        id: id.current,
                        content: e.target.value,
                        isDone: false
                    }
                ]);
                setSingleValue('');
                id.current++;
            }
        }
    };

    return (
        <ThemeProvider theme={theme.light}>
            <InputStyle
                placeholder="請輸入待辦事項"
                onChange={handleInputChange}
                onKeyPress={onKeyPress}
                value={singleValue}
            />
            <Container>
                <TodoListCard
                    todos={todos}
                    setTodos={setTodos}
                />
            </Container>
        </ThemeProvider>
    );
};

export default TodoList;