'use client'

import React, { createContext, useContext, useReducer } from "react";

type ComponentName = 'Sign In' | 'Forgot Password' | 'Create Account' | 'Account Confirmation' | 'New Password'

interface State {
    activeComponent: ComponentName
}

interface Action {
    type: "SET_COMPONENT";
    payload: ComponentName
}

const initialState: State = {
    activeComponent: 'Sign In'
}

const SignInReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_COMPONENT":
            return {activeComponent: action.payload}
        default:
            return state;
    }
}

interface SignInContextType {
    state: State,
    dispatch: React.Dispatch<Action>
}

const SignInContext = createContext<SignInContextType | undefined>(undefined)

export function SignInWrapper({children}: {children: React.ReactNode}){
    const [state, dispatch] = useReducer(SignInReducer, initialState)

    return (
        <SignInContext.Provider value={{state, dispatch}}>
            {children}
        </SignInContext.Provider>
    )
}

export function useSignInContext() {
    return useContext(SignInContext);
}


