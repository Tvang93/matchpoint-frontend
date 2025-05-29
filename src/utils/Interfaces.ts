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
  comments: IComment[];
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
  coordinates: number[];
  conditions: string[];
  amenities: string[];
  surface: string;
  image: string[]
}

export interface IFeatures {
  id: number;
  collectionId: number;
  type: string;
  properties: IProperties;
  geometry: IGeometry;
}

export interface IComment {
    id: number;
    userId: number;
    username: string;
    profileImage: string;
    comment: string;
}

export interface IProperties {
    id: number;
    locationId: number;
    courtName: string;
    averageCourtRating: number | null;
    averageSafetyRating: number| null;
    conditions: string[] | null;
    amenities: string[] | null;
    surface: string | null
    comments: string[] | null
}

export interface IGeometry {
  id: number;
  locationId: number;
  coordinates: number[];
  type: string
}