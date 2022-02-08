import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WeatherApp from '../../src/page/weather/WeatherApp';
// import TodoListApp from '../../src/page/todoList/TodoListApp';
import { Radio } from 'antd';
import { Link } from 'react-router-dom';

const Router = () => (
    <BrowserRouter >
        <Radio.Group>
            <Radio.Button value="weather">
                <Link to="/weather">
                    Weather
                </Link>
            </Radio.Button>
            <Radio.Button value="todolist">
                <Link to="/todolist">
                    Todolist
                </Link>
            </Radio.Button>
        </Radio.Group>
        <Switch>
            <Route path={'/weather'} component={WeatherApp} />
            {/* <Route path={'/todolist'} component={TodoListApp} /> */}
            <Route path="*">
                <WeatherApp />
            </Route>
        </Switch>
    </BrowserRouter>
)
export default Router;
