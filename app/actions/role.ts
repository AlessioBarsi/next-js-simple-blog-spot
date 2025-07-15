'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteRole(id: number) {
    await prisma.role.delete({
        where: {
            id: id,
        },
    });
    revalidatePath('/roles');
}

export async function fetchRoles() {
    const roles = await prisma.role.findMany();
    return roles;
}

export async function fetchRole(id: number) {
    const role = await prisma.role.findUnique({
        where: {
            id: id,
        },
    });

    return role;
}

export async function createRole(formData: { name: string }) {
    const { name } = formData;

    await prisma.role.create({
        data: {
            name: name,
        },
    });

    revalidatePath('/roles');
    return true;
}

export async function updateRole(formData: { name: string }, id: number) {
    const { name } = formData;
    await prisma.role.update({
        where: {
            id: id
        },
        data: {
            name: name,
        },
    });

    revalidatePath('/roles');
}

export async function assignRole(roleId: number, userId: number) {

    //Check if user exists
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (user) {
        const role = await prisma.role.findUnique({
            where: { id: roleId }
        });
        //Check if role exists
        if (role) {
            //Assign the new role if it does not have it
            try {
                const userHasRole = await prisma.userHasRole.findFirstOrThrow({
                    where: { userId, roleId },
                });
                // Already exists
                revalidatePath('/roles');
                return { error: true, message: 'User already has this role' }
            } catch (err) {
                // Not found – safe to create new
                await prisma.userHasRole.create({
                    data: { userId, roleId },
                });
                return { error: false, message: 'Role has been added to the user' }
            }

        }
    }

    return { error: true, message: 'User or Role do not exist. Please try again' };
}

export async function removeRole(userId: number, roleId: number) {
    try {
        const userHasRole = await prisma.userHasRole.findFirstOrThrow({
            where: { userId, roleId },
        });
        // Delete the record from the pivot table

        if (userHasRole.userId === 1 && userHasRole.roleId === 1) {
            //Can't delete admin role from superuser
            return {error: true, message: 'The admin role can\'t be removed from this user'}
        }
        const deletedUserHasRole = await prisma.userHasRole.delete({
            where: {id: userHasRole.id}
        })
        revalidatePath('/roles');
        return { error: false, message: 'The role has been removed from this user' }
    } catch (err) {
        //Error: role is not assigned
        return { error: true, message: 'This role is not assigned. Try reloading the page' }
    }
}