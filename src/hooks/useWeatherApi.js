import { useState, useEffect, useCallback } from 'react';

// Axios
import axios from 'axios';

const routePath = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const weatherAuthorization = 'CWB-5DE01DD1-3DCA-4AFF-85A7-6D78002F1B20';

/**
 * /v1/rest/datastore/O-A0003-001 局屬氣象站-現在天氣觀測報告
 * 文件說明1 - https://opendata.cwb.gov.tw/dataset/observation/O-A0003-001
 * 文件說明2 - https://opendata.cwb.gov.tw/opendatadoc/DIV2/A0003-001.pdf
 * API來源 - https://opendata.cwb.gov.tw/dist/opendata-swagger.html?urls.primaryName=openAPI#/%E8%A7%80%E6%B8%AC/get_v1_rest_datastore_O_A0003_001
 *
 * @param {string} locationName 測站名稱
 *
 * @returns {object}
 */
const fetchCurrentWeather = (locationName) => {
    return axios.get(
        `${routePath}/O-A0003-001?Authorization=${weatherAuthorization}&locationName=${locationName}`
    )
        .then((res) => {
            const locationData = res.data.records.location[0];
            if (locationData) {
                const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
                    console.log('neededElements :>> ', neededElements);
                    console.log('item :>> ', item);
                    if (['TEMP', 'WDSD', 'HUMD'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.elementValue;
                    }
                    console.log('neededElements :>> ', neededElements);
                    return neededElements;
                }, {});

                return {
                    observationTime: locationData.time.obsTime, // 觀測資料時間
                    locationName: locationData.locationName, // 測站名稱
                    temperature: weatherElements.TEMP, // 溫度，單位 攝氏
                    windSpeed: weatherElements.WDSD, // 風速，單位 公尺/秒
                    humid: weatherElements.HUMD // 相對濕度，單位 百分比率，此處以實數 0-1.0 記錄
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
 * 文件說明 - https://opendata.cwb.gov.tw/dataset/forecast/F-C0032-001
 * API來源 - https://opendata.cwb.gov.tw/dist/opendata-swagger.html?urls.primaryName=openAPI#/%E9%A0%90%E5%A0%B1/get_v1_rest_datastore_F_C0032_001
 *
 * @param {*} cityName Available values : 宜蘭縣, 花蓮縣, 臺東縣, 澎湖縣, 金門縣, 連江縣, 臺北市, 新北市, 桃園市, 臺中市, 臺南市, 高雄市, 基隆市, 新竹縣, 新竹市, 苗栗縣, 彰化縣, 南投縣, 雲林縣, 嘉義縣, 嘉義市, 屏東縣
 *
 * @returns {object}
 */
const fetchWeatherForecast = (cityName) => {
    return axios.get(
        `${routePath}/F-C0032-001?Authorization=${weatherAuthorization}&locationName=${cityName}`
    )
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
                    description: weatherElements.Wx.parameterName, //Wx(天氣現象Name)
                    weatherCode: weatherElements.Wx.parameterValue, //Wx(天氣現象Value)
                    rainPossibility: weatherElements.PoP.parameterName, //PoP(降雨機率)
                    comfortability: weatherElements.CI.parameterName // CI(舒適度)
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
 * 統整 fetchCurrentWeather fetchWeatherForecast兩隻API
 *
 * @param {*} currentLocation 目前選取的地區
 *
 * @returns {array}
 */
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
        isLoading: true //初次進來網站時，一開始的 isLoading 會是 true
    });

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const [currentWeather, weatherForecast] = await Promise.all([
                //「觀測」天氣資料拉取 API 用的地區名稱
                fetchCurrentWeather(locationName),
                //「預測」天氣資料拉取 API 用的地區名稱
                fetchWeatherForecast(cityName)
            ]);

            //待 fetchData 的資料都回來之後，isLoading 會變成 false
            setWeatherElement({
                ...currentWeather,
                ...weatherForecast,
                isLoading: false
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
};

export default useWeatherApi;