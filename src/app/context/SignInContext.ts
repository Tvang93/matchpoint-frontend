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

