'use client';
import { ReactNode, createContext, useContext } from "react";

type RoleContextType = {
    id: number,
    name: string,
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider(
    { children, id, name }:
        { children: ReactNode, id: number, name: string }) {
    return (
        <RoleContext.Provider value={{ id, name }}>
            {children}
        </RoleContext.Provider>
    )
}

export function useRoleContext() {
    const context = useContext(RoleContext);
    if (!context) throw new Error("useRoleContext must be used within a PostProvider");
    return context;
}