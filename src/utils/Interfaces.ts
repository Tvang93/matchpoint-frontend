export type TSignInProp = {
    switchComponent: (component: 'Sign In' | 'Forgot Password' | 'Create Account' | 'Account Confirmation' | 'New Password') => void
  }

  export interface ICourtCard {
    id: number
    courtName: string
    courtRating: number
    safetyRating: number
    courtCondition: Array<{id: number, condition: string}>
    amenities: Array<{id: number, amenity: string}>
    lat: number
    lon: number
    comments: Array<{id: number, userId: number, username: string, profileImage: string, comment: string}>
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

export interface IAddLocationDTO {
  courtName: string;
  latitude: number;
  longitude: number;
  conditions: string[];
  amenities: string[];
}