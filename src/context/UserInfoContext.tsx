'use client'

import React, { createContext, useContext, useState } from "react";

interface UsernameContext {
    loggedUsername: string;
    setLoggedUsername: (name: string) => void;
}

interface Coordinates {
    latitude?: number,
    longitude?: number
}

interface LocationCoordinatesContext {
    locationCoordinates: Coordinates | undefined,
    setLocationCoordinates: (coordinates: Coordinates) => void
}

const LoggedUsernameContext = createContext<UsernameContext | undefined>(undefined);
const LocationCoordinatesContext = createContext<LocationCoordinatesContext | undefined>(undefined);

export function UserInfoWrapper({children}: {children: React.ReactNode}){
    const [loggedUsername, setLoggedUsername] = useState('')
    const [locationCoordinates, setLocationCoordinates] = useState<Coordinates | undefined>(undefined)

    return (
        <LocationCoordinatesContext.Provider value={{locationCoordinates, setLocationCoordinates}}>
        <LoggedUsernameContext.Provider value={{loggedUsername, setLoggedUsername}}>
            {children}
        </LoggedUsernameContext.Provider>
        </LocationCoordinatesContext.Provider>
    )
}

export function useLoggedUsernameContext() {
    const context = useContext(LoggedUsernameContext);
    if(!context){
        throw new Error("useUserInfoContext must be used within a AppWrapper");
    }
    return context;
}

export function useLocationCoordinatesContext() {
    const context = useContext(LocationCoordinatesContext);
    if(!context){
        throw new Error("useUserInfoContext must be used within a AppWrapper");
    }
    return context;
}