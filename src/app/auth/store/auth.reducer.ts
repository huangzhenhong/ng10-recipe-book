import { User } from '../../shared/models/user.model';
import * as authActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state = initialState, action: authActions.AuthActions) {
    switch(action.type) {
        case authActions.AUTHENTICATE_SUCCESS: 
            var user = new User(
                action.payload.email, 
                action.payload.userId, 
                action.payload.token, 
                action.payload.expiresIn
            );
            return {
                ...state, 
                authError: null,
                loading: false,
                user: user
            };
        case authActions.LOGIN_START: 
        case authActions.SIGNUP_START: 
            return {
                ...state,
                authError: null,
                loading: true
            };
        case authActions.AUTHENTICATE_FAIL:
            return {
                ...state, 
                user: null,
                authError: action.payload,
                loading: false
            };
        case authActions.LOGOUT:
            return {
                ...state,
                authError: null,
                user: null
            };
        case authActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default: 
            return state;
    }
    
}