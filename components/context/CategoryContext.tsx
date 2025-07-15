'use client';
import { ReactNode, createContext, useContext } from "react";

type CategoryContextType = {
    id: number,
    name: string,
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider(
    { children, id, name }:
        { children: ReactNode, id: number, name: string }) {
    return (
        <CategoryContext.Provider value={{ id, name }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategoryContext() {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategoryContext must be used within a PostProvider");
    return context;
}