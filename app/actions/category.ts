'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteCategory(id: number) {
    await prisma.category.delete({
        where: {
            id: id,
        },
    });
    revalidatePath('/categories');
}

export async function fetchCategories() {
    const categories = await prisma.category.findMany();
    return categories
}

export async function fetchCategory(id: number) {
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });

    return category;
}

export async function createCategory(formData: { name: string }) {
    const { name } = formData;

    await prisma.category.create({
        data: {
            name: name.toLocaleLowerCase(),
        },
    });

    revalidatePath('/categories');
}

export async function updateCategory(formData: { name: string }, id: number) {
    const { name } = formData;
    await prisma.category.update({
        where: {
            id: id
        },
        data: {
            name
        },
    });

    revalidatePath('/categories');
}