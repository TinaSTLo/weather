import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

// Data
import sunriseAndSunsetData from 'src/sunrise-sunset.json';

// Shared component
import WeatherCard from 'src/component/weather/WeatherCard';

// API
import useWeatherApi from 'src/hooks/useWeatherApi';

// Tool
import { findLocation } from 'src/utils.js';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#fff',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#2B2B2B',
        textColor: '#2B2B2B'
    },
    dark: {
        backgroundColor: '#1F2022',
        foregroundColor: '#121416',
        boxShadow: '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
        titleColor: '#fff',
        temperatureColor: '#dddddd',
        textColor: '#cccccc'
    }
};

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    height: calc(100vh - 47px);
`;

/**
 * 處理目前時間狀態
 * @param {string} locationName 地區名稱
 *
 * @returns {string} day/night
 */
const getMoment = (locationName) => {
    const location = sunriseAndSunsetData.find((data) => data.locationName === locationName);
    if (!location) { return null; }

    const now = new Date();

    const nowDate = new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
        .format(now)
        .replace(/\//g, '-');

    const locationDate = location.time && location.time.find((time) => time.dataTime === nowDate);
    const sunriseTimestamp = new Date(`${locationDate.dataTime} ${locationDate.sunrise}`).getTime();
    const sunsetTimestamp = new Date(`${locationDate.dataTime} ${locationDate.sunset}`).getTime();

    const nowTimeStamp = now.getTime();

    return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
        ? 'day'
        : 'night';
};

/**
 * 天氣頁面
 *
 * @returns {JSX.Element}
 */
const WeatherApp = () => {
    const storageCity = localStorage.getItem('cityName'); // localStorage取城市名稱

    const [currentTheme, setCurrentTheme] = useState('light'); // 目前主題
    const [currentCity, setCurrentCity] = useState(storageCity || '臺北市'); //目前城市名稱

    const currentLocation = findLocation(currentCity) || {}; // 目前地點
    const [weatherElement, fetchData] = useWeatherApi(currentLocation);

    const moment = useMemo(() => getMoment(currentLocation.sunriseCityName), [currentLocation.sunriseCityName]);

    /**
     * 設定主題
     */
    useEffect(() => {
        setCurrentTheme(moment === 'day' ? 'light' : 'dark');
    }, [moment]);

    /**
     * localStorage設定城市名稱
     */
    useEffect(() => {
        localStorage.setItem('cityName', currentCity);
    }, [currentCity]);

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                <WeatherCard
                    weatherElement={weatherElement}
                    moment={moment}
                    fetchData={fetchData}
                    setCurrentCity={setCurrentCity}
                    cityName={currentLocation.cityName}
                />
            </Container>
        </ThemeProvider>
    );
};

export default WeatherApp;