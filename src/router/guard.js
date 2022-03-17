import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, Redirect, Link } from 'react-router-dom';

// Ant design
import { Button } from 'antd';

// GlobalContext
import { useGlobalStore } from 'src/contexts/globalContext';

// Router
import config from 'src/router/config';

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;

    height: calc(100vh - 47px);

    background: linear-gradient( 172deg, #FFC753 50%, white 50% );
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;

    height: 48px;
    width: 90%;

    max-width: 937px;
    padding-top: -23px;
    margin: ${({ rwdMode }) => rwdMode === 'desktop' ? '128px auto 48px auto' : '32px auto 32px auto'};

    background: transparent;
    background: #fff;

    border-radius: 30px;

    .ant-btn {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;

        height: 48px;
        border-radius: 40px;

        text-align: center;
        font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 24 : 18}px;
        font-family: Microsoft JhengHei;
    }

    .ant-btn:nth-child(1) {
        background:${({ btnColor }) => btnColor === 'weather' ? '#2B2B2B' : '#fff'};
        color:${({ btnColor }) => btnColor === 'weather' ? '#FFC753' : '#2B2B2B'};
    }

    .ant-btn:nth-child(2) {
        background:${({ btnColor }) => btnColor === 'todolist' ? '#2B2B2B' : '#fff'};
        color:${({ btnColor }) => btnColor === 'todolist' ? '#FFC753' : '#2B2B2B'};
    }
`;

/**
 * router detail
 *
 * @returns {JSX.Element} JSX
 */
const Guard = () => {
    const [btnColor, setBtnColor] = useState('weather'); // button color
    const { rwdMode } = useGlobalStore(); // RWD
    const { routes = [] } = config; // Routes array

    /**
     * When clicking tab for weather button
     */
    const onClickBtnWeather = () => setBtnColor('weather');

    /**
     * When clicking tab for todolist button
     */
    const onClickBtnTodolist = () => setBtnColor('todolist');

    return (
        <Container>
            <ButtonContainer
                btnColor={btnColor}
                rwdMode={rwdMode}
            >
                <Button type="link">
                    <Link
                        to="/"
                        onClick={onClickBtnWeather}
                    >
                        即時天氣預報
                    </Link>
                </Button>
                <Button type="link">
                    <Link
                        to="/todolist"
                        onClick={onClickBtnTodolist}
                    >
                        待辦清單
                    </Link>
                </Button>
            </ButtonContainer>
            {
                routes.map(({ path, exact, component: Component }) =>
                    <Route
                        key={Math.random().toString(16)}
                        path={path}
                        exact={exact}
                    >
                        <Component />
                    </Route>
                )
            }
            <Redirect to='/' />
        </Container>
    );
};

export default Guard;