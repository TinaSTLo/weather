import React, { createContext, useContext, useState, useRef } from 'react';

export const Context = createContext();

export const useGlobalStore = () => useContext(Context);

/**
 * 全域provider
 *
 * @param {*} children 跟props一樣傳入
 * @returns
 */
export const GlobalContextProvider = ({ children }) => {
    const id = useRef(1); // 設定為1開始
    const [todos, setTodos] = useState([]); // todo item陣列

    return (
        <Context.Provider
            value={{
                id,
                todos,
                setTodos
            }}
        >
            {children}
        </Context.Provider>
    );
};
