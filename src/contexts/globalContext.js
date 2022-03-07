import React, { createContext, useContext, useState, useRef } from 'react';

export const Context = createContext();

export const useGlobalStore = () => useContext(Context);

export const GlobalContextProvider = ({ children }) => {
    const id = useRef(1);
    const [todos, setTodos] = useState([]);

    return (
        <Context.Provider
            value={{
                id,
                todos,
                setTodos,
            }}
        >
            {children}
        </Context.Provider>
    );
};
