'use client';
import { ReactNode, createContext, useContext } from "react";

type CommentContextType = {
    commentId?: number | null,
    postId?: number | null,
    text?: string | null,
    author?: number | null,
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider(
    { children, 
        commentId, 
        postId,
        text,
        author }:
        {
            children: ReactNode,
            commentId?: number,
            postId?: number,
            text?: string,
            author?: number,
        }) {
    return (
        <CommentContext.Provider value={{
            commentId,
            postId,
            text,
            author,
        }}>
            {children}
        </CommentContext.Provider>
    )
}

export function useCommentContext() {
    const context = useContext(CommentContext);
    if (!context) throw new Error("useCommentContext must be used within a CommentProvider");
    return context;
}