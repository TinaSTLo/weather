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
import { availableLocations } from 'src/utils';

// GlobalContext
import { useGlobalStore } from 'src/contexts/globalContext';

const { Option } = Select;

const WeatherCardWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: ${(props) => props.rwdMode === 'desktop' ? 'wrap' : 'nowrap'};
    align-items: ${(props) => props.rwdMode === 'desktop' ? 'stretch' : 'center'};

    width: ${(props) => props.rwdMode === 'desktop' ? '937px' : '315px'};
    height: ${(props) => props.rwdMode === 'desktop' ? '555px' : '660px'};
    padding: ${(props) => props.rwdMode === 'desktop' && '30px 15px'};
    border-radius: 16px;
    box-sizing: border-box;

    background: #FFFFFF;
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Location = styled.div`
    font-size: 28px;

    .ant-select {
        font-size: ${(props) => props.rwdMode === 'desktop' ? '48px' : '36px'};

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
    margin: ${(props) => props.rwdMode === 'desktop' ? '-10px 0px 0px 40px' : '42px 0px 0px 0px'};

    font-size: ${(props) => props.rwdMode === 'desktop' ? '32px' : '24px'};
    color: ${({ theme }) => theme.textColor};
`;

const CurrentWeather = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: ${(props) => props.rwdMode !== 'desktop' && 'column-reverse'};
`;

const Temperature = styled.div`
    display: flex;

    margin: ${(props) => props.rwdMode === 'desktop' ? '0px 0px 0px 40px' : '-20px 0px 0px 0px'};

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
    right: ${(props) => props.rwdMode === 'desktop' && '115px'};
    bottom: ${(props) => props.rwdMode === 'desktop' ? '70px' : '30px'};
    display: inline-flex;
    align-items: flex-end;

    font-size: ${(props) => props.rwdMode === 'desktop' ? '18px' : '16px'};
    color: #AAAAAA;

    svg {
        width: 15px;
        height: 25px;
        margin-left: 10px;

        cursor: pointer;
        animation: rotate infinite 1.5s linear;
        animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
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
    width: ${(props) => props.rwdMode === 'desktop' ? '215px' : '175px'};
    margin: 10px;
`;

const AirRainContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    margin: ${(props) => props.rwdMode === 'desktop' ? '0px 0px 0px 40px' : '-20px 0px 0px 0px'};
`;

/**
 * 即時天氣預報 頁面
 *
 * @param {object} weatherElement 各種天氣參數
 * @param {string} moment 取得現在時間狀態(day/night)
 * @param {function(e)} fetchData 取天氣API
 * @param {string} cityName 城市名稱
 * @param {function(e)} setCurrentCity 現在選取的城市
 *
 * @returns {JSX.Element}
 */
const WeatherCard = ({ weatherElement, moment, fetchData, cityName, setCurrentCity }) => {
    const locations = availableLocations.map((location) => location.cityName);// 取地區的城市名稱
    const [locationName, setLocationName] = useState(cityName);// 城市名稱
    const inputLocationRef = useRef(null);// 存loaction input ref

    const { rwdMode } = useGlobalStore(); // RWD

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
     * 選取select component
     *
     * @param {string} value select值
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