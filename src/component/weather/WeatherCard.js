import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

// Icon
import WeatherIcon from 'src/component/weather/WeatherIcon';
import { ReactComponent as RefreshIcon } from 'src/assets/images/icon_refresh.svg';
import { ReactComponent as RainIcon } from 'src/assets/images/icon_rain.svg';
import { ReactComponent as LoadingIcon } from 'src/assets/images/loading.svg';
import { ReactComponent as Wind } from 'src/assets/images/icon_wind.svg';

// Ant design
import { Select } from 'antd';

// Tool
import { availableLocations } from 'src/page/weather/data/utils';

// GlobalContext
import { useGlobalStore } from 'src/contexts/globalContext';

const { Option } = Select;

const WeatherCardWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: ${({ rwdMode }) => rwdMode === 'desktop' ? 'wrap' : 'nowrap'};
    align-items: ${({ rwdMode }) => rwdMode === 'desktop' ? 'stretch' : 'center'};

    width: 100%;
    height: ${({ rwdMode }) => rwdMode === 'desktop' ? 555 : 660}px;
    padding: ${({ rwdMode }) => rwdMode === 'desktop' && '30px 15px'};
    border-radius: 16px;
    box-sizing: border-box;

    background: #FFFFFF;
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Location = styled.div`
    font-size: 28px;

    .ant-select {
        font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 48 : 36}px;

        .ant-select-selector {
            height: 55px;
            margin: 20px;
            color: ${({ theme }) => theme.titleColor} !important;
        }
        .ant-select-selection-item {
            padding: 10px;
        }
        .ant-select-arrow {
            font-size: 18px;
            color: #AAAAAA !important;
        }
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        padding: 0 0;
    }
`;

const Description = styled.div`
    margin: ${({ rwdMode }) => rwdMode === 'desktop' ? '-10px 0px 0px 40px' : '42px 0px 0px 0px'};

    font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 32 : 24}px;
    color: ${({ theme }) => theme.textColor};
`;

const CurrentWeather = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: ${({ rwdMode }) => rwdMode !== 'desktop' && 'column-reverse'};
`;

const Temperature = styled.div`
    display: flex;

    margin: ${({ rwdMode }) => rwdMode === 'desktop' ? '0px 0px 0px 40px' : '-20px 0px 0px 0px'};

    font-size: 128px;
    font-weight: 350;
    color: ${({ theme }) => theme.temperatureColor};
`;

const Celsius = styled.div`
    margin-top: 25px;

    font-weight: normal;
    font-size: 48px;
`;

const AirFlow = styled.div`
    display: flex;
    align-items: center;

    font-size: 32px;
    font-weight: 350;
    color: ${({ theme }) => theme.textColor};

    svg {
        width: 32px;
        height: auto;

        margin-right: 30px;
    }
`;

const Rain = styled.div`
    display: flex;
    align-items: center;

    font-size: 32px;
    font-weight: 350;
    color: ${({ theme }) => theme.textColor};

    svg {
        width: 32px;
        height: auto;

        margin-right: 30px;
    }
`;

const Refresh = styled.div`
    position: absolute;
    right: ${({ rwdMode }) => rwdMode === 'desktop' && 115}px;
    bottom: ${({ rwdMode }) => rwdMode === 'desktop' ? 70 : 30}px;
    display: inline-flex;
    align-items: flex-end;

    font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 18 : 16}px;
    color: #AAAAAA;

    svg {
        width: 15px;
        height: 25px;
        margin-left: 10px;

        cursor: pointer;
        animation: rotate infinite 1.5s linear;
        animation-duration: ${({ isLoading }) => (isLoading ? 1.5 : 0)}s;
    }

    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
`;

const SelectStyle = styled(Select)`
    width: ${({ rwdMode }) => rwdMode === 'desktop' ? 215 : 175}px;
    margin: 10px;
`;

const AirRainContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    margin: ${({ rwdMode }) => rwdMode === 'desktop' ? '0px 0px 0px 40px' : '-20px 0px 0px 0px'};
`;

/**
 * Weather forecast layout
 *
 * @param {object} weatherElement       Elements with Weather
 * @param {string} moment               Get current time status (day/night)
 * @param {function(e)} fetchData       Get weather API
 * @param {string} cityName             City's name
 * @param {function(e)} setCurrentCity  Get current city
 *
 * @returns {JSX.Element}
 */
const WeatherCard = ({ weatherElement, moment, fetchData, cityName, setCurrentCity }) => {
    const locations = availableLocations.map((location) => location.cityName); // Get city name

    const { rwdMode } = useGlobalStore(); // RWD

    const [locationName, setLocationName] = useState(cityName); // City Name
    const inputLocationRef = useRef(null); // 存loaction input ref

    const {
        observationTime,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        isLoading
    } = weatherElement;

    /**
     * When select a select component
     *
     * @param {string} value selected value
     */
    const handleChange = (value) => {
        if (locations.includes(value)) {
            setCurrentCity(value);
            setLocationName(value);
        } else {
            alert(`儲存失敗：您輸入的 ${value} 並非有效的地區`);
            return;
        }
    };

    return (
        <WeatherCardWrapper rwdMode={rwdMode}>
            <Location rwdMode={rwdMode}>
                <SelectStyle
                    ref={inputLocationRef}
                    defaultValue={locationName}
                    onChange={handleChange}
                    bordered={false}
                    dropdownStyle={{ background: '#FEC753', borderRadius: 8, textAlign: 'center' }}
                    rwdMode={rwdMode}
                >
                    {
                        locations &&
                        locations.map(location => (
                            <Option
                                style={{ fontSize: 26, lineHeight: 2 }}
                                value={location}
                                key={location}
                            >
                                {location}
                            </Option>
                        ))
                    }
                </SelectStyle>
            </Location >
            <Description rwdMode={rwdMode}>
                {
                    rwdMode === 'desktop' &&
                    description + comfortability
                }
            </Description>
            <CurrentWeather rwdMode={rwdMode}>
                <Temperature rwdMode={rwdMode}>
                    {Math.round(temperature)}
                    <Celsius>°C</Celsius>
                </Temperature>
                <Description>
                    {
                        rwdMode !== 'desktop' &&
                        description + comfortability
                    }
                </Description>
                <WeatherIcon
                    currentWeatherCode={weatherCode}
                    moment={moment || 'day'}
                />
            </CurrentWeather>
            <AirRainContainer rwdMode={rwdMode}>
                <AirFlow>
                    <Wind />
                    {windSpeed} m/h
                </AirFlow>
                <Rain>
                    <RainIcon />
                    {Math.round(rainPossibility)} %
                </Rain>
            </AirRainContainer>
            <Refresh
                onClick={fetchData}
                isLoading={isLoading}
                rwdMode={rwdMode}
            >
                最後觀測時間：
                {
                    observationTime &&
                    new Intl.DateTimeFormat('zh-TW', {
                        hour: 'numeric',
                        minute: 'numeric'
                    }).format(new Date(observationTime))
                }
                {' '}
                {
                    isLoading
                        ? <LoadingIcon />
                        : <RefreshIcon />
                }
            </Refresh>
        </WeatherCardWrapper >
    );
};

export default WeatherCard;