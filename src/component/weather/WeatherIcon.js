import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as DayThunderstorm } from '../../../src/assets/images/day-thunderstorm.svg';
import { ReactComponent as DayClear } from '../../../src/assets/images/day-clear.svg';
import { ReactComponent as DayCloudyFog } from '../../../src/assets/images/day-cloudy-fog.svg';
import { ReactComponent as DayCloudy } from '../../../src/assets/images/day-cloudy.svg';
import { ReactComponent as DayFog } from '../../../src/assets/images/day-fog.svg';
import { ReactComponent as DayPartiallyClearWithRain } from '../../../src/assets/images/day-partially-clear-with-rain.svg';
import { ReactComponent as DaySnowing } from '../../../src/assets/images/day-snowing.svg';
import { ReactComponent as NightThunderstorm } from '../../../src/assets/images/night-thunderstorm.svg';
import { ReactComponent as NightClear } from '../../../src/assets/images/night-clear.svg';
import { ReactComponent as NightCloudyFog } from '../../../src/assets/images/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from '../../../src/assets/images/night-cloudy.svg';
import { ReactComponent as NightFog } from '../../../src/assets/images/night-fog.svg';
import { ReactComponent as NightPartiallyClearWithRain } from '../../../src/assets/images/night-partially-clear-with-rain.svg';
import { ReactComponent as NightSnowing } from '../../../src/assets/images/night-snowing.svg';

const IconContainer = styled.div`
  flex-basis: 30%;

  svg {
    max-height: 110px;
    max-width: 110px;
  }
`;

const weatherTypes = {
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isClear: [1],
    isCloudyFog: [25, 26, 27, 28],
    isCloudy: [2, 3, 4, 5, 6, 7],
    isFog: [24],
    isPartiallyClearWithRain: [
        8, 9, 10, 11, 12,
        13, 14, 19, 20, 29, 30,
        31, 32, 38, 39,
    ],
    isSnowing: [23, 37, 42],
};

const weatherIcons = {
    day: {
        isThunderstorm: <DayThunderstorm />,
        isClear: <DayClear />,
        isCloudyFog: <DayCloudyFog />,
        isCloudy: <DayCloudy />,
        isFog: <DayFog />,
        isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
        isSnowing: <DaySnowing />,
    },
    night: {
        isThunderstorm: <NightThunderstorm />,
        isClear: <NightClear />,
        isCloudyFog: <NightCloudyFog />,
        isCloudy: <NightCloudy />,
        isFog: <NightFog />,
        isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
        isSnowing: <NightSnowing />,
    },
};

//把 weatherCode2Type 函式搬到組件外
const weatherCode2Type = (weatherCode) => {
    const [weatherType] =
        Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
            weatherCodes.includes(Number(weatherCode))
        ) || [];

    return weatherType;
};

const WeatherIcon = ({ currentWeatherCode, moment }) => {
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState('isClear');

    //透過 useMemo 保存計算結果，記得要在 dependencies 中放入 currentWeatherCode
    const theWeatherIcon = useMemo(() => weatherCode2Type(currentWeatherCode), [currentWeatherCode]);

    // useCallback(fn, deps) 等同於 useMemo(() => fn, deps)。
    //在 useEffect 中去改變 currentWeatherIcon，記得定義 dependencies
    useEffect(() => {
        setCurrentWeatherIcon(theWeatherIcon);
    }, [theWeatherIcon]);

    return (
        <IconContainer>
            {
                weatherIcons[moment][currentWeatherIcon]
            }
        </IconContainer>
    );
};

export default WeatherIcon;