import { ObjectId } from "mongodb";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface IUserLoginRes {
    token: string;
    user: IUserLogged;
}

export interface IUserLogged {
    email: string;
    role: string;
    name: string;
}
