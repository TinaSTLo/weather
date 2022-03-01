import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react'
import TodoListCard from '../../component/todoList/TodoListCard';
import useWeatherApi from '../../hooks/useWeatherApi';
import { findLocation } from '../../utils';
import { Input } from 'antd';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#fff',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282',
    },
    dark: {
        backgroundColor: '#ededed',
        foregroundColor: '#fff',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282',
    },
};

// const TodoListContainer = styled.div`
//     background-color: '#ededed';
//     foreground-color: '#fff';
//     title-color: '#212121';
//     temperature-color: '#757575';
//     text-color: '#828282';
//     box-shadow: 0px 3px 6px #00000029;
//     border-radius: 16px;
//     height: 514px;
// `;

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
    const storageCity = localStorage.getItem('cityName');
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [currentPage, setCurrentPage] = useState('todoList');
    const [currentCity, setCurrentCity] = useState(storageCity || '臺北市');

    const currentLocation = findLocation(currentCity) || {};
    const [weatherElement, fetchData] = useWeatherApi(currentLocation);

    const [singleValue, setSingleValue] = useState('');
    const [todos, setTodos] = useState([1]);

    console.log('todos :>> ', todos);

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            // console.log('e :>> ', e.target.value);
            // setSingleValue(e.target.value);
            setTodos([e.target.value, ...todos]);
            setSingleValue('');
        }
    }

    return (
        // <TodoListContainer>
        <ThemeProvider theme={theme[currentTheme]}>
            <InputStyle placeholder="請輸入待辦事項" onKeyPress={onKeyPress}/>
            <Container>
                {
                    currentPage === 'todoList' && (
                        <TodoListCard
                            weatherElement={weatherElement}
                            fetchData={fetchData}
                            setCurrentPage={setCurrentPage}
                            setCurrentCity={setCurrentCity}
                            cityName={currentLocation.cityName}
                            todos={todos}
                        />
                    )
                }
                {/* {
                    currentPage === 'WeatherSetting' && (
                        <WeatherSetting
                            setCurrentPage={setCurrentPage}
                            setCurrentCity={setCurrentCity}
                            cityName={currentLocation.cityName}
                        />
                    )
                } */}
            </Container>
        </ThemeProvider>
    );
};

export default TodoList;