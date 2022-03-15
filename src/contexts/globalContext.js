import React, { createContext, useContext, useState, useRef } from 'react';
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
    const [todos, setTodos] = useState([]); // Todo item Array
    const id = useRef(1); // set 1 with start

    const rwdMode = useRwd(); // RWD

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
