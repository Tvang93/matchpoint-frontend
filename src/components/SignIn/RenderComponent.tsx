'use client'

import CreateAccountComponent from '@/components/SignIn/CreateAccountComponent';
import ForgotPasswordComponent from '@/components/SignIn/ForgotPasswordComponent';
import SignInComponent from '@/components/SignIn/SignInComponent'
import { useSignInContext } from '@/context/SignInContext';
import React, { JSX } from 'react'
import AccountConfirmationComponent from './AccountConfirmationComponent';
import NewPasswordComponent from './NewPasswordComponent';



const RenderComponent = () => {

    const { state, dispatch } = useSignInContext();

    const renderComponents = (): JSX.Element | null => {
        switch(state.activeComponent){
            case 'Sign In':
                return <SignInComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Forgot Password':
                return <ForgotPasswordComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Create Account':
                return <CreateAccountComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'Account Confirmation':
                return <AccountConfirmationComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            case 'New Password':
                return <NewPasswordComponent switchComponent={(component) => dispatch({ type: "SET_COMPONENT", payload: component })} />;
            default:
                return null
        }
    }

  return (
        <div className='bg-[#3C434E] sm:w-147 sm:h-115 rounded-[20px] border-1 border-[#BABABA] w-96'>
            {renderComponents()}
        </div>
  )
}

export default RenderComponent