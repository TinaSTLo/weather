import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

// Data
import sunriseAndSunsetData from 'src/page/weather/data/sunrise-sunset.json';

// Shared component
import WeatherCard from 'src/component/weather/WeatherCard';

// API
import useWeatherApi from 'src/hooks/useWeatherApi';

// Tool
import { findLocation } from 'src/page/weather/data/utils';

// Ant design
import { Button } from 'antd';

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
    width: 90%;
    max-width: 937px;
`;

/**
 * Deal with current time status
 * @param {string} locationName Location name
 *
 * @returns {string}            day/night
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
 * Weather layout
 *
 * @returns {JSX.Element} JSX
 */
const WeatherApp = () => {
    const storageCity = localStorage.getItem('cityName'); // LocalStorage get cityName

    const [currentTheme, setCurrentTheme] = useState('light'); // Current theme
    const [currentCity, setCurrentCity] = useState(storageCity || '臺北市'); // Current city name

    const currentLocation = findLocation(currentCity) || {}; // Current location
    const [weatherElement, fetchData] = useWeatherApi(currentLocation);

    const moment = useMemo(() => getMoment(currentLocation.sunriseCityName), [currentLocation.sunriseCityName]);

    const [count, setCount] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState('');
    /**
     * Set current theme
     */
    useEffect(() => {
        setCurrentTheme(moment === 'day' ? 'light' : 'dark');
    }, [moment]);

    /**
     * localStorage set cityName
     */
    useEffect(() => {
        localStorage.setItem('cityName', currentCity);
    }, [currentCity]);

    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container data-test='component-app'>
                <WeatherCard
                    weatherElement={weatherElement}
                    moment={moment}
                    fetchData={fetchData}
                    setCurrentCity={setCurrentCity}
                    cityName={currentLocation.cityName}
                />
                <h1 data-test='counter-display'>
                    <span data-test='count'>{count}</span>
                </h1>
                <Button
                    variant='primary'
                    data-test='increment-button'
                    size='lg'
                    onClick={() => {
                        setCount(count + 1);
                        setErrorMessage('');
                    }}
                >
                    Give me a heart !
                </Button>
                <Button
                    variant="primary"
                    data-test="decrement-button"
                    size="lg"
                    onClick={function () {
                        if (count == 0) {
                            setErrorMessage('不能再減了');
                        } else {
                            setCount(count - 1);
                        }
                    }}
                >
                    Take away a heart !
                </Button>
                <h1>
                    <span style={{ color: 'red' }}>{errorMessage}</span>
                </h1>
            </Container>
        </ThemeProvider>
    );
};

export default WeatherApp;