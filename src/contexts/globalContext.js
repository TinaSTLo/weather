import React, { createContext, useContext, useState, useEffect } from 'react';
import useRwd from 'src/hooks/useRwd';

// uuid
import { v4 as uuidv4 } from 'uuid';

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
    const id = uuidv4(); // generate uuid

    const storageTodoList = JSON.parse(localStorage.getItem('todoList')) ?? []; // LocalStorage get todoList
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
