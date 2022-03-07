import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react'
import TodoListCard from '../../component/todoList/TodoListCard';
import { Input } from 'antd';
import { useGlobalStore } from 'src/contexts/globalContext';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#fff',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282',
    }
};

const Container = styled.div`
    height: calc(100vh - 47px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
`;

const InputStyle = styled(Input)`
    width: 937px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 16px;
    height: 75px;
    margin-bottom: 16px;
    font-size: 24px;
    padding-left: 16px;
`;

const TodoList = () => {
    const [singleValue, setSingleValue] = useState('');
    const { id, todos, setTodos } = useGlobalStore();

    const handleInputChange = (e) => {
        setSingleValue(e.target.value);
    }
    console.log('todos :>> ', todos);
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (e.target.value) {
                setTodos([
                    {
                        id: id.current,
                        content: e.target.value,
                        isDone: false
                    }, ...todos]
                );
                setSingleValue('');
                id.current++;
            }
        }
    }

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