'use client';
import { Category, Genre } from "@/src/app/generated/prisma";
import { ReactNode, createContext, useContext } from "react";

type PostContextType = {
    postId?: number | null,
    title?: string | null,
    content?: string | null,
    description?: string | null,
    categoryId?: number | null,
    genreId?: number | null,
    createdBy?: number | null,
    image?: string | null,
    categories: Category[],
    genres: Genre[],
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider(
    { children, 
        postId, 
        title,
        content,
        description,
        categoryId,
        genreId,
        createdBy,
        image,
        categories,
        genres }:
        {
            children: ReactNode,
            postId?: number,
            title?: string,
            content?: string,
            description?: string,
            categoryId?: number,
            genreId?: number,
            createdBy?: number,
            image?: string | null,
            categories: Category[],
            genres: Genre[],
        }) {
    return (
        <PostContext.Provider value={{
            postId,
            title,
            content,
            description,
            categoryId,
            genreId,
            createdBy,
            image,
            categories,
            genres,
        }}>
            {children}
        </PostContext.Provider>
    )
}

export function usePostContext() {
    const context = useContext(PostContext);
    if (!context) throw new Error("usePostContext must be used within a PostProvider");
    return context;
}