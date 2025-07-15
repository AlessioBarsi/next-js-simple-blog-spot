import { PrismaClient } from "@/src/app/generated/prisma";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import readline from "readline";

async function prompt(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function main() {
    //Todo: fetch email and password by input from command line
    const email = await prompt("Enter admin email: ");
    const password = await prompt("Enter admin password: ");
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.createMany({
        data: [
            {
                email: 'email@admin.com',
                name: 'admin',
                password: hashedPassword,
            },
        ]
    })

    await prisma.category.createMany({
        data: [
            { name: 'sample category' },
        ]
    })

    await prisma.genre.createMany({
        data: [
            { name: 'sample genre' },
        ]
    })

    await prisma.post.createMany({
        data: [
            {
                title: 'Example Title',
                content: 'Example Content',
                description: 'Example Description',
                categoryId: 1,
                genreId: 1,
                createdBy: 1,
                image: '',
            }
        ]
    })

    await prisma.comment.createMany({
        data: [
            {
                text: 'Example comment',
                author: 1,
                postId: 1
            }
        ]
    })

    await prisma.role.createMany({
        data: [
            {
                name: 'admin',
            },
            {
                name: 'editor',
            },
            {
                name: 'author',
            }
        ]
    })

    await prisma.userHasRole.createMany({
        data: [
            {
                userId: 1,
                roleId: 1
            },
        ]
    })


}

main()
    .then(() => {
        console.log('Seed complete')
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error(e)
        return prisma.$disconnect().finally(() => process.exit(1))
    })