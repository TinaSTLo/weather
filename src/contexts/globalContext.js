import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import useRwd from 'src/hooks/useRwd';

// Context API
export const Context = createContext();
export const useGlobalStore = () => useContext(Context);

/**
 * Global provider
 *
 * @param {*} children      children
 *
 * @returns {JSX.Element}   JSX
 */
export const GlobalContextProvider = ({ children }) => {
    const id = useRef(1); // set 1 with start

    const storageTodoList = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []; // LocalStorage get todoList
    const [todos, setTodos] = useState(storageTodoList || []); // Current city name

    const rwdMode = useRwd(); // RWD

    /**
     * localStorage set todoList
     */
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    return (
        <Context.Provider
            value={{
                id,
                todos,
                setTodos,
                rwdMode
            }}
        >
            {children}
        </Context.Provider>
    );
};
