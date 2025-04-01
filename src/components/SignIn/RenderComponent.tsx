'use client'

import CreateAccountComponent from '@/components/SignIn/CreateAccountComponent';
import ForgotPasswordComponent from '@/components/SignIn/ForgotPasswordComponent';
import SignInComponent from '@/components/SignIn/SignInComponent'
import { useSignInContext } from '@/context/SignInContext';
import React, { JSX } from 'react'



const RenderComponent = () => {
    const {state, dispatch} = useSignInContext();

    const renderComponents = (): JSX.Element | null => {
        switch(state.activeComponent){
            case 'Sign In':
                return <SignInComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Forgot Password':
                return <ForgotPasswordComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Create Account':
                return <CreateAccountComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Account Confirmation':
                return <CreateAccountComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'New Password':
                return <CreateAccountComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            default:
                return null
        }
    }

  return (
        <div className='bg-white w-50 h-50'>
            {renderComponents()}
        </div>
  )
}

export default RenderComponent