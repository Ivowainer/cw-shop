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
    user: {
        _id?: string;
        email: string;
        role: string;
        name: string;
    };
}
