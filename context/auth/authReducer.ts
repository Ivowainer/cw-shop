import { AuthState } from "./AuthProvider";

import { IUser, IUserLoginRes } from "../../interfaces";

//prettier-ignore
type AuthActionType = 
    | { type: 'Auth - Login', payload: IUserLoginRes }
    | { type: 'Auth - Logout' }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case "Auth - Login":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            };

        case "Auth - Logout":
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            };

        default:
            return state;
    }
};
