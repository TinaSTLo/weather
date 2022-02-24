import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import WeatherApp from '../../src/page/weather/WeatherApp';
import TodoListApp from '../../src/page/todoList/todoListApp';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    -webkit-flex-direction: column;
    flex-direction: column;
    flex-wrap: nowrap;
    height: calc(100vh - 47px);
    background: linear-gradient( 172deg, #FFC753 50%, white 50% );
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background: transparent;
    background: #fff;
    padding-top: -23px;
    height: 48px;
    width: 524px;
    margin: 128px auto 48px auto;

    .ant-btn {
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 40px;
        flex: 1;
        text-align: center;
        font-size:24px;
        font-family: Microsoft JhengHei;
    }

    .ant-btn:nth-child(1) {
        margin-left: -40%;
        background:${(props) => props.btnColor === 'weather' ? '#2B2B2B' : '#fff'};
        color:${(props) => props.btnColor === 'weather' ? '#FFC753' : '#2B2B2B'};
        &:hover {
            color: #FFC753;
        }
    }

    .ant-btn:nth-child(2) {
        margin-right: -40%;
        background:${(props) => props.btnColor === 'todolist' ? '#2B2B2B' : '#fff'};
        color:${(props) => props.btnColor === 'todolist' ? '#FFC753' : '#2B2B2B'};
        &:hover {
            color: #FFC753;
        }
    }
`;

const Guard = () => {
    const [btnColor, setBtnColor] = useState('weather');

    const onClickBtnWeather = () => {
        setBtnColor('weather');
    }

    const onClickBtnTodolist = () => {
        setBtnColor('todolist');
    }

    return (
        <Container>
            <ButtonContainer btnColor={btnColor}>
                <Button type="link">
                    <Link to="/weather" onClick={onClickBtnWeather}>
                        即時天氣預報
                    </Link>
                </Button>
                <Button type="link">
                    <Link to="/todolist" onClick={onClickBtnTodolist}>
                        待辦清單
                    </Link>
                </Button>
            </ButtonContainer>
            <Route path={'/weather'} component={WeatherApp} />
            <Route path={'/todolist'} component={TodoListApp} />
            <Redirect to='/weather' />
        </Container>
    );
};

export default Guard;