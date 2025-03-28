'use client'

import CreateAccountComponent from '@/app/components/SignIn/CreateAccountComponent';
import ForgotPasswordComponent from '@/app/components/SignIn/ForgotPasswordComponent';
import SignInComponent from '@/app/components/SignIn/SignInComponent'
import React, { JSX, useReducer } from 'react'

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

const SignInPage = () => {
    const [state, dispatch] = useReducer(SignInReducer, initialState);

    const renderComponent = (): JSX.Element | null => {
        switch(state.activeComponent){
            case 'Sign In':
                return <SignInComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Forgot Password':
                return <ForgotPasswordComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Create Account':
                return <CreateAccountComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            default:
                return null
      
        }
    }
    console.log("re-render parent")
  return (
    <div className='bg-[url(/assets/citywithrackets.png)] min-h-screen bg-cover bg-no-repeat bg-center bg-fixed flex justify-center items-center'>
        <div className='bg-white w-50 h-50'>
            {renderComponent()}
        </div>
    </div>
  )
}

export default SignInPage