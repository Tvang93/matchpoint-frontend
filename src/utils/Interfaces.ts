export type TSignInProp = {
    switchComponent: (component: 'Sign In' | 'Forgot Password' | 'Create Account' | 'Account Confirmation' | 'New Password') => void
  }

export interface IUserInfo{
  username: string
  password: string
  email: string
}

export interface ILoginInfo{
  username: string
  password: string
}

export interface IUserData {
  id: number
  username: string
  email: string
}


export interface IToken {
  token: string
}