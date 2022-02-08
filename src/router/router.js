import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WeatherApp from '../../src/page/weather/WeatherApp';
// import TodoListApp from '../../src/page/todoList/TodoListApp';

const Router = () => (
    <BrowserRouter >
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
