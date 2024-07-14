import React, { createContext} from 'react';

export const PublicContext = createContext();
export const PublicProvider = ({ children }) => {

    //  const baseURL='http://localhost:8000/api';
     const baseURL='https://bank-task.byethost18.com/api';





    return (
        <PublicContext.Provider value={{baseURL}}>
            {children}
        </PublicContext.Provider>
    );
};
