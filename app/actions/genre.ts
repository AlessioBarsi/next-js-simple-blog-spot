'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteGenre(id: number) {
    await prisma.genre.delete({
        where: {
            id: id,
        },
    });
    revalidatePath('/genres');
}

export async function fetchGenres() {
    const genres = await prisma.genre.findMany();
    return genres;
}

export async function fetchGenre(id: number) {
    const genre = await prisma.genre.findUnique({
        where: {
            id: id,
        },
    });

    return genre;
}

export async function createGenre(formData: { name: string }) {
    const { name } = formData;

    await prisma.genre.create({
        data: {
            name: name.toLocaleLowerCase(),
        },
    });

    revalidatePath('/genres');
}

export async function updateGenre(formData: { name: string }, id: number) {
    const { name } = formData;
    await prisma.genre.update({
        where: {
            id: id
        },
        data: {
            name
        },
    });

    revalidatePath('/genres');
}