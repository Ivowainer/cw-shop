import { createContext } from "react";

import { IUser, IUserLoginRes } from "../../interfaces";

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUserLoginRes;

    loginUser: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
