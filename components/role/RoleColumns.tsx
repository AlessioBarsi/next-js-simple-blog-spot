"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { Prisma } from "@/src/app/generated/prisma"
import { Badge } from "../ui/badge"
import AddRoleDialog from "./AddRoleDialog"
import RemoveRoleDialog from "./RemoveRoleDialog"


declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends unknown, TValue> {
        align?: "left" | "right" | "center"
    }
}

type FullUser = Prisma.UserGetPayload<{
    include: {
        userHasRoles: true,
    }
}>;
export type TableUser = Pick<FullUser, "id" | "name" | "email" | "createdAt" | "picture" | "userHasRoles">

export const columns: ColumnDef<TableUser>[] = [
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
        accessorKey: "userHasRoles",
        header: "Roles",
        cell: ({ row }) => {
            const roles = row.original.userHasRoles;

            return (
                <div className="flex flex-wrap gap-1">
                    {roles.map((r) => (
                        <Badge
                            variant='default'
                            key={r.id}
                            className="bg-blue-500"
                        >
                            {//@ts-ignore
                            r.role.name}
                            <RemoveRoleDialog id={r.userId} roleId={r.roleId} />
                        </Badge>
                    ))}
                </div>
            );
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div>
                    <AddRoleDialog id={user.id} />
                </div>

            )
        },
        header: "Actions",
        meta: {
            align: "right"
        }
    },
]
