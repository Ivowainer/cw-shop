import { createContext } from "react";

import { IUser, IUserLogged, IUserLoginRes } from "../../interfaces";

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUserLogged;

    //prettier-ignore
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>
    loginUser: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
