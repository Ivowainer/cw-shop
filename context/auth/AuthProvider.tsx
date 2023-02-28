import { useReducer } from "react";

import { AuthContext, authReducer } from "./";
import { IUser } from "../../interfaces";

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                ...state,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
