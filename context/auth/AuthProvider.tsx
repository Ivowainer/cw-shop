import { useEffect, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import { AuthContext, authReducer } from "./";

import { clientMainApi } from "../../api";

import { IUser, IUserLogged, IUserLoginRes } from "../../interfaces";

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUserLogged;
}

const AUTH_INITAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITAL_STATE);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        if (!Cookies.get("token")) {
            return;
        }

        try {
            const { data } = await clientMainApi.post("/user/validate-token");

            dispatch({ type: "Auth - Login", payload: data });
        } catch (error) {
            Cookies.remove("token");
        }
    };

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

    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await clientMainApi.post("/user/register", { name, email, password });

            const { token, user } = data;

            Cookies.set("token", token);

            dispatch({ type: "Auth - Login", payload: user });

            return {
                hasError: false,
            };
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message,
                };
            }

            return {
                hasError: true,
                message: "Mail already registered",
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,

                // Methods
                loginUser,
                registerUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
