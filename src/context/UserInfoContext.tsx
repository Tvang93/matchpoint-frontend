'use client'

import React, { createContext, useContext, useState } from "react";

interface UsernameContext {
    loggedUsername: string;
    setLoggedUsername: (name: string) => void;
}

const LoggedUsernameContext = createContext<UsernameContext | undefined>(undefined)

export function UserInfoWrapper({children}: {children: React.ReactNode}){
    const [loggedUsername, setLoggedUsername] = useState('')

    return (
        <LoggedUsernameContext.Provider value={{loggedUsername, setLoggedUsername}}>
            {children}
        </LoggedUsernameContext.Provider>
    )
}

export function useLoggedUsernameContext() {
    const context = useContext(LoggedUsernameContext);
    if(!context){
        throw new Error("useUserInfoContext must be used within a AppWrapper");
    }
    return context;
}