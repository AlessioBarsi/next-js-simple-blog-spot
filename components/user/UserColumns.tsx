"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { UserProvider } from "../context/UserContext"
import { Button } from "../ui/button"
import UserButtons from "./UserButtons"
import { User as PrismaUser } from "@/src/app/generated/prisma"

declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends unknown, TValue> {
        align?: "left" | "right" | "center"
    }
}

export type User = Pick<PrismaUser, 'id' | 'name' | 'email' | 'picture' | 'createdAt'>

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",

                header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At"
    },
    {
        accessorKey: "picture",
        header: "Image"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div>
                    <UserProvider id={user.id} name={user.name} email={user.email}>
                        <UserButtons />
                    </UserProvider>
                </div>

            )
        },
        header: "Actions",
        meta: {
            align: "right"
        }
    },
]
