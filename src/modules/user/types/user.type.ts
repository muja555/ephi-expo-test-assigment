export type IUser = {
    user_id: number;
    username: string;
    password: string;
    ephi_id: number | null;
}

export type IUserContextType = {
    user: IUser | null;
    userSet: (user: IUser) => void;
};