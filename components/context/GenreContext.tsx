'use client';
import { ReactNode, createContext, useContext } from "react";

type GenreContextType = {
    id: number,
    name: string,
}

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export function GenreProvider(
    { children, id, name }:
        { children: ReactNode, id: number, name: string }) {
    return (
        <GenreContext.Provider value={{ id, name }}>
            {children}
        </GenreContext.Provider>
    )
}

export function useGenreContext() {
    const context = useContext(GenreContext);
    if (!context) throw new Error("useGenreContext must be used within a PostProvider");
    return context;
}