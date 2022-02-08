import React, { createContext, useContext, useState } from 'react';

export const Context = createContext();

export const useGlobalStore = () => useContext(Context);

export const GlobalContextProvider = ({ children }) => {
    const [linkTo, setLinkTo] = useState('');

    return (
        <Context.Provider
            value={{
                linkTo,
                setLinkTo
            }}
        >
            {children}
        </Context.Provider>
    );
};
