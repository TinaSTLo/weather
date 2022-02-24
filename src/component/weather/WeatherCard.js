import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import WeatherIcon from '../../../src/component/weather/WeatherIcon';
import { ReactComponent as RefreshIcon } from '../../../src/assets/images/icon_refresh.svg';
import { ReactComponent as RainIcon } from '../../../src/assets/images/icon_rain.svg';
import { ReactComponent as LoadingIcon } from '../../../src/assets/images/loading.svg';
import { ReactComponent as Wind } from '../../../src/assets/images/icon_wind.svg';
// import { ReactComponent as CogIcon } from '../../../src/assets/images/cog.svg';
import { Select } from 'antd';
import { availableLocations } from '../../../src/utils';
const { Option } = Select;

// const Cog = styled(CogIcon)`
//   position: absolute;
//   top: 30px;
//   right: 15px;
//   width: 15px;
//   height: 15px;
//   cursor: pointer;
// `;

const WeatherCardWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-sizing: border-box;
    padding: 30px 15px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    border-radius: 16px;
    width: 937px;
    height: 555px;
    background: #FFFFFF;
`;

const Location = styled.div`
    font-size: 28px;

    .ant-select {
        font-size: 48px;
        .ant-select-selector {
            height: 55px;
            margin: 20px;
            color: ${({ theme }) => theme.titleColor} !important;
        }
        .ant-select-selection-item {
            padding: 10px;
        }
        .ant-select-arrow {
            color: ${({ theme }) => theme.titleColor} !important;
        }
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        padding: 0 0;
    }
`;

const Description = styled.div`
    margin: -10px 0px 0px 40px;
    font-size: 32px;
    color: ${({ theme }) => theme.textColor};
`;

const CurrentWeather = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Temperature = styled.div`
    font-size: 128px;
    margin-left: 40px;
    font-weight: 350;
    display: flex;
    color: ${({ theme }) => theme.temperatureColor};
`;

const Celsius = styled.div`
    font-weight: normal;
    font-size: 48px;
    margin-top: 25px;
`;

const AirFlow = styled.div`
    font-size: 32px;
    display: flex;
    align-items: center;
    font-weight: 350;
    margin: 0px 0px 0px 40px;
    color: ${({ theme }) => theme.textColor};

    svg {
        width: 32px;
        height: auto;
        margin-right: 30px;
    }
`;

const Rain = styled.div`
    font-size: 32px;
    display: flex;
    align-items: center;
    margin: 0px 0px 20px 40px;
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
    right: 115px;
    bottom: 60px;
    font-size: 18px;
    display: inline-flex;
    align-items: flex-end;
    color: #AAAAAA;

    svg {
        margin-left: 10px;
        width: 15px;
        height: 25px;
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


const WeatherCard = (props) => {
    const { weatherElement, moment, fetchData, cityName, setCurrentCity } = props;
    const locations = availableLocations.map((location) => location.cityName);
    const [locationName, setLocationName] = useState(cityName);
    const inputLocationRef = useRef(null);

    const {
        observationTime,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        isLoading,
    } = weatherElement;

    const handleChange = (value) => {
        if (locations.includes(value)) {
            setCurrentCity(value);
            setLocationName(value);
        } else {
            alert(`儲存失敗：您輸入的 ${value} 並非有效的地區`);
            return;
        }
    }

    return (
        <WeatherCardWrapper>
            {/* <Cog onClick={() => setCurrentPage('WeatherSetting')} /> */}
            <Location>
                <Select
                    ref={inputLocationRef}
                    defaultValue={locationName}
                    style={{ width: 215, margin: 10 }}
                    onChange={handleChange}
                    bordered={false}
                    dropdownStyle={{ background: '#FEC753', borderRadius: 8, textAlign: 'center' }}
                >
                    {
                        locations && locations.map(location => (
                            <Option style={{ fontSize: 26, lineHeight: 2 }} value={location} key={location} > {location} </Option>
                        ))
                    }
                </Select>
            </Location >
            <Description>
                {description}
                {comfortability}
            </Description>
            <CurrentWeather>
                <Temperature>
                    {Math.round(temperature)}
                    <Celsius>°C</Celsius>
                </Temperature>
                <WeatherIcon
                    currentWeatherCode={weatherCode}
                    moment={moment || 'day'}
                />
            </CurrentWeather>
            <AirFlow>
                <Wind />
                {windSpeed} m/h
            </AirFlow>
            <Rain>
                <RainIcon />
                {Math.round(rainPossibility)} %
            </Rain>
            <Refresh onClick={fetchData} isLoading={isLoading}>
                最後觀測時間：
                {
                    observationTime && new Intl.DateTimeFormat('zh-TW', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(observationTime))
                }{' '}
                {
                    isLoading
                        ? <LoadingIcon />
                        : <RefreshIcon />
                }
            </Refresh>
        </WeatherCardWrapper >
    )
}

export default WeatherCard;