import { useState, useEffect, useCallback } from 'react';

// Axios
import axios from 'axios';

const routePath = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const weatherAuthorization = 'CWB-5DE01DD1-3DCA-4AFF-85A7-6D78002F1B20';

/**
 * /v1/rest/datastore/O-A0003-001 局屬氣象站-現在天氣觀測報告
 * document1 - https://opendata.cwb.gov.tw/dataset/observation/O-A0003-001
 * document2 - https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0003-001.pdf
 * API resource - https://opendata.cwb.gov.tw/dist/opendata-swagger.html?urls.primaryName=openAPI#/%E8%A7%80%E6%B8%AC/get_v1_rest_datastore_O_A0003_001
 *
 * @param {string} locationName Location name
 *
 * @returns {object}            (observationTime,locationName,temperature,windSpeed,humid)
 */
const fetchCurrentWeather = (locationName) => {
    return axios.get(`${routePath}/O-A0003-001?Authorization=${weatherAuthorization}&locationName=${locationName}`)
        .then((res) => {
            const locationData = res.data.records.location[0];
            if (locationData) {
                const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
                    if (['TEMP', 'WDSD', 'HUMD'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.elementValue;
                    }
                    return neededElements;
                }, {});

                return {
                    observationTime: locationData.time?.obsTime ? locationData.time.obsTime : NaN, // 觀測資料時間
                    locationName: locationData?.locationName ? locationData.locationName : NaN, // 測站名稱
                    temperature: weatherElements?.TEMP > 0 ? weatherElements.TEMP : NaN, // 溫度，單位 攝氏
                    windSpeed: weatherElements?.WDSD > 0 ? weatherElements.WDSD : NaN, // 風速，單位 公尺/秒
                    humid: weatherElements?.HUMD > 0 ? weatherElements.HUMD : NaN// 相對濕度，單位 百分比率，此處以實數 0-1.0 記錄
                };
            } else {
                return {
                    observationTime: '',
                    locationName: 'No data',
                    temperature: 'No data',
                    windSpeed: 'No data',
                    humid: 'No data'
                };
            }
        });
};

/**
 * /v1/rest/datastore/F-C0032-001 一般天氣預報-今明 36 小時天氣預報
 * document - https://opendata.cwb.gov.tw/dataset/forecast/F-C0032-001
 * API resource - https://opendata.cwb.gov.tw/dist/opendata-swagger.html?urls.primaryName=openAPI#/%E9%A0%90%E5%A0%B1/get_v1_rest_datastore_F_C0032_001
 *
 * @param {*} cityName  Available values : 宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 雲林縣, 嘉義縣, 嘉義市, 屏東縣
 *
 * @returns {object}    (description,weatherCode,rainPossibility,comfortability)
 */
const fetchWeatherForecast = (cityName) => {
    return axios.get(`${routePath}/F-C0032-001?Authorization=${weatherAuthorization}&locationName=${cityName}`)
        .then((res) => {
            const locationData = res.data.records.location[0];
            if (locationData) {
                const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
                    if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.time[0].parameter;
                    }
                    return neededElements;
                }, {});

                return {
                    description: weatherElements?.Wx?.parameterName, //Wx(天氣現象Name)
                    weatherCode: weatherElements?.Wx?.parameterValue, //Wx(天氣現象Value)
                    rainPossibility: weatherElements?.PoP?.parameterName, //PoP(降雨機率)
                    comfortability: weatherElements?.CI?.parameterName // CI(舒適度)
                };
            } else {
                return {
                    description: 'No data',
                    weatherCode: 'No data',
                    rainPossibility: 'No data',
                    comfortability: 'No data'
                };
            }
        });
};

/**
 * combine fetchCurrentWeather fetchWeatherForecast two API
 *
 * @param {*} currentLocation   Current location
 *
 * @returns {array}             [weatherElement, fetchData]
 */
const useWeatherApi = (currentLocation) => {
    const { locationName, cityName } = currentLocation;

    const [weatherElement, setWeatherElement] = useState({
        observationTime: new Date(),
        locationName: '',
        humid: NaN,
        temperature: NaN,
        windSpeed: NaN,
        description: '',
        weatherCode: NaN,
        rainPossibility: NaN,
        comfortability: '',
        isLoading: true //First come in, isLoading is true
    });

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, weatherForecast] = await Promise.all([
                fetchCurrentWeather(locationName),
                fetchWeatherForecast(cityName)
            ]);

            // When fetchData is back set isLoading is false
            setWeatherElement({
                ...currentWeather,
                ...weatherForecast,
                isLoading: false
            });

        };

        // for reloading - When before fetchData set isLoading is true
        setWeatherElement(prevState => {
            return { ...prevState, isLoading: true };
        });

        fetchingData();
    }, [locationName, cityName]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [weatherElement, fetchData];
};

export default useWeatherApi;