import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import WeatherIcon from '../../../src/component/weather/WeatherIcon';
import { ReactComponent as RefreshIcon } from '../../../src/assets/images/icon_refresh.svg';
import { ReactComponent as RainIcon } from '../../../src/assets/images/icon_rain.svg';
import { ReactComponent as LoadingIcon } from '../../../src/assets/images/loading.svg';
import { ReactComponent as Wind } from '../../../src/assets/images/icon_wind.svg';
import { ReactComponent as CogIcon } from '../../../src/assets/images/cog.svg';
import { Select } from 'antd';
import { availableLocations } from '../../../src/utils';
const { Option } = Select;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-sizing: border-box;
  padding: 30px 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
`;

const Location = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.titleColor};

  .ant-select {
    font-size: 22px;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
    padding: 0 0;
  }
`;

const Description = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.textColor};
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  font-size: 96px;
  font-weight: 300;
  display: flex;
  color: ${({ theme }) => theme.temperatureColor};
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
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
    const { weatherElement, moment, fetchData, setCurrentPage, cityName, setCurrentCity } = props;
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
            <Cog onClick={() => setCurrentPage('WeatherSetting')} />
            <Location>
                <Select
                    ref={inputLocationRef}
                    defaultValue={locationName}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    bordered={false}
                >
                    {
                        locations && locations.map(location => (
                            <Option value={location} key={location} > {location} </Option>
                        ))
                    }
                </Select>
            </Location>
            <Description>
                {description}
                {comfortability}
            </Description>
            <CurrentWeather>
                <Temperature>
                    {Math.round(temperature)} <Celsius>°C</Celsius>
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
        </WeatherCardWrapper>
    )
}

export default WeatherCard;