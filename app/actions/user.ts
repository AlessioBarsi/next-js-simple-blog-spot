'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from "bcrypt";

export async function deleteUser(id: number) {
    await prisma.user.delete({
        where: {
            id: id,
        },
    });
    revalidatePath('/users');
}

export async function fetchUsers() {
    const users = await prisma.user.findMany({
        include: {
            userHasRoles: {
                include: {
                    role: true,
                }
            }
        }
    });
    return users;
}

export async function fetchUser(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    return user;
}

export async function fetchUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            userHasRoles: {
                include: {
                    role: true,
                },
            },
        },
    });

    return user;
}

export async function createUser(formData: { email: string, name: string, password: string }) {
    const { email, name, password } = formData;
    //Check for existing user
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingUser) return false;

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hashedPassword,
        },
    });
    return true;
}

export async function updateUser(formData: { email: string, name: string }, id: number) {
    const { email, name } = formData;

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if (!user) {
        return { error: true, message: 'Error: user could not be found' }
    }
    //Check if email is not already assigned to another user
    const userWithEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (userWithEmail && userWithEmail.id !== user.id) {
        return { error: true, message: 'This email is already in use' }
    }

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            email: email,
            name: name,
        },
    });

    return { error: false, message: 'User information has been updated. Sign in again to view your changes' }
}

export async function updatePassword(formData: { password: string, newpassword: string }, id: number) {
    const { password, newpassword } = formData;
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if (!user) {
        return { error: true, message: 'User could not be found' }
    }
    const compare = await bcrypt.compare(password, user?.password);

    if (!compare) {
        return { error: true, message: 'Password does not match' }
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: hashedPassword,
        }
    })
    return { error: false, message: 'Your password has been updated' }
}