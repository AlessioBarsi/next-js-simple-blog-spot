'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteComment(id: number) {
    await prisma.comment.delete({
        where: {
            id: id,
        },
    });
    revalidatePath('/posts');
}

export async function fetchComments() {
    const comments = await prisma.comment.findMany({
        include: {
            user: {
                select: {
                    name: true,
                }
            },
        }
    });
    return comments;
}

export async function fetchCommentsByPost(postId: number) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            },
        }
    });
    return comments;
}

export async function fetchCommentsByUser(userId: number) {
    const comments = await prisma.comment.findMany({
        where: {
            author: userId
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            },
            post: {
                select: {
                    title: true,
                }
            }
        }
    });
    if (comments.length == 0) return false;
    return comments;
}

export async function fetchComment(id: number) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: id,
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            },
        }
    });

    return comment;
}

export async function createComment(formData: { text: string }, author: number, postId: number) {
    const { text } = formData;

    await prisma.comment.create({
        data: {
            text: text,
            author: author,
            postId: postId,
        },
    });

    revalidatePath('/posts');
}

export async function updateComment(formData: { text: string }, author: number, postId: number, id: number) {
    const { text } = formData;
    await prisma.comment.update({
        where: {
            id: id
        },
        data: {
            text: text,
            author: author,
            postId: postId,
        },
    });

    revalidatePath('/posts');
}