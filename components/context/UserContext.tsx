'use client';
import { ReactNode, createContext, useContext } from "react";

type UserContextType = {
    id: number,
    name: string,
    email: string
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider(
    { children, id, name, email }:
        { children: ReactNode, id: number, name: string, email: string, }) {
    return (
        <UserContext.Provider value={{ id, name, email }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within a PostProvider");
    return context;
}