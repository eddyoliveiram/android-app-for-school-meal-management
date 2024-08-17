import React, { createContext, useState, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [apiUrl, setApiUrl] = useState('');

    return (
        <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
