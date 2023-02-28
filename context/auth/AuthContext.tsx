import { createContext } from "react";

import { IUser, IUserLoginRes } from "../../interfaces";

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUserLoginRes;

    //prettier-ignore
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>
    loginUser: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
