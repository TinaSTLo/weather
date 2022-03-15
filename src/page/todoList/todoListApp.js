import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

// Shared component
import TodoListCard from 'src/component/todoList/TodoListCard';

// Ant design
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
    width: 90%;
    max-width: 937px;
`;

const InputStyle = styled(Input)`
    width: 90%;
    max-width: 937px;
    height: ${({ rwdMode }) => rwdMode === 'desktop' ? 85 : 74}px;
    margin-bottom: 16px;
    padding-left: 16px;
    border-radius: 16px;

    box-shadow: 0px 3px 6px #00000029;

    font-size: 24px;

    input.ant-input {
        font-size: 18px;
    }
`;

const PlusButton = styled.a``;

const PlusOutlinedStyle = styled(PlusOutlined)`
    font-size: 22;
    color: '#1890ff;
`;

const TodoList = () => {
    const { id, todos, setTodos, rwdMode } = useGlobalStore();

    const [singleValue, setSingleValue] = useState(''); // Input value
    const inputRef = useRef(); // Input ref

    /**
     * Todolist input set singleValue
     *
     * @param {*} e event
     */
    const handleInputChange = (e) => {
        setSingleValue(e.target.value);
    };

    /**
     * Listening when press Enter, SetTodos value
     *
     * @param {*} e event
     */
    const onKeyPress = (e) => {
        const getInputValue = inputRef?.current?.state?.value;
        if (e.key === 'Enter' || e.type === 'click') {
            if (getInputValue) {
                setTodos([
                    ...todos,
                    {
                        id: id.current,
                        content: getInputValue,
                        isDone: false
                    }
                ]);
                setSingleValue('');
                id.current++;
            }
        }
    };

    /**
     * When singleValue change, focus input.
     */
    useEffect(() => {
        inputRef.current.focus();
    }, [singleValue]);

    return (
        <ThemeProvider theme={theme.light} >
            <InputStyle
                ref={inputRef}
                placeholder="請輸入待辦事項"
                onChange={handleInputChange}
                onKeyPress={onKeyPress}
                value={singleValue}
                rwdMode={rwdMode}
                suffix={
                    rwdMode !== 'desktop' &&
                    <PlusButton onClick={onKeyPress}>
                        <PlusOutlinedStyle />
                    </PlusButton>
                }
            />
            {/* <Button>Submit</Button> */}
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