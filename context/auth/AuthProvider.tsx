import { useReducer } from "react";

import Cookies from "js-cookie";

import { AuthContext, authReducer } from "./";

import { clientMainApi } from "../../api";

import { IUser, IUserLoginRes } from "../../interfaces";

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUserLoginRes;
}

const AUTH_INITAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITAL_STATE);

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await clientMainApi.post("/user/login", { email, password });

            const { token, user } = data;

            Cookies.set("token", token);

            dispatch({ type: "Auth - Login", payload: user });

            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,

                // Methods
                loginUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
