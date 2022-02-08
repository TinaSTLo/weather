import { useState, useEffect, useCallback } from 'react';

const fetchCurrentWeather = (locationName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-5DE01DD1-3DCA-4AFF-85A7-6D78002F1B20&locationName=${locationName}`
    )
        .then((response) => response.json())
        .then((data) => {
            const locationData = data.records.location[0];
            if (locationData) {
                const weatherElements = locationData.weatherElement.reduce(
                    (neededElements, item) => {
                        if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                            neededElements[item.elementName] = item.elementValue;
                        }
                        return neededElements;
                    },
                    {}
                );
                return {
                    observationTime: locationData.time.obsTime,
                    locationName: locationData.locationName,
                    temperature: weatherElements.TEMP,
                    windSpeed: weatherElements.WDSD,
                    humid: weatherElements.HUMD,
                };
            } else {
                return {
                    observationTime: '',
                    locationName: 'No data',
                    temperature: 'No data',
                    windSpeed: 'No data',
                    humid: 'No data',
                };
            }
        });
};

const fetchWeatherForecast = (cityName) => {
    return fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-5DE01DD1-3DCA-4AFF-85A7-6D78002F1B20&locationName=${cityName}`
    )
        .then((response) => response.json())
        .then((data) => {
            const locationData = data.records.location[0];
            if (locationData) {
                const weatherElements = locationData.weatherElement.reduce(
                    (neededElements, item) => {
                        if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                            neededElements[item.elementName] = item.time[0].parameter;
                        }
                        return neededElements;
                    },
                    {}
                );
                return {
                    description: weatherElements.Wx.parameterName,
                    weatherCode: weatherElements.Wx.parameterValue,
                    rainPossibility: weatherElements.PoP.parameterName,
                    comfortability: weatherElements.CI.parameterName,
                };
            } else {
                return {
                    description: 'No data',
                    weatherCode: 'No data',
                    rainPossibility: 'No data',
                    comfortability: 'No data',
                };
            }
        });
};

const useWeatherApi = (currentLocation) => {
    const { locationName, cityName } = currentLocation;

    const [weatherElement, setWeatherElement] = useState({
        observationTime: new Date(),
        locationName: '',
        humid: 0,
        temperature: 0,
        windSpeed: 0,
        description: '',
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: '',
        isLoading: true,//初次進來網站時，一開始的 isLoading 會是 true
    });

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, weatherForecast] = await Promise.all([
                //「觀測」天氣資料拉取 API 用的地區名稱
                fetchCurrentWeather(locationName),
                //「預測」天氣資料拉取 API 用的地區名稱
                fetchWeatherForecast(cityName),
            ]);

            //待 fetchData 的資料都回來之後，isLoading 會變成 false
            setWeatherElement({
                ...currentWeather,
                ...weatherForecast,
                isLoading: false,
            });

        };
        // for 重新loading 狀態 - fetchData 實際開始向 API 拉取資料（fetchingData）前，先把 isLoading 的狀態設成 true
        setWeatherElement(prevState => {
            return { ...prevState, isLoading: true };
        });

        fetchingData();
    }, [locationName, cityName]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [weatherElement, fetchData];
}

export default useWeatherApi;