import React, {createContext, useState} from "react";
import {IUserContextType} from "modules/user/types/user.type";
import {IUser} from "modules/user/types/user.type";

export const UserContext = createContext<IUserContextType | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const UserProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, userSet] = useState<IUser | null>(null);

    return (
        <UserContext.Provider value={{user, userSet}}>
            {children}
        </UserContext.Provider>
    );
};





