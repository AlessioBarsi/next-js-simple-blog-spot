"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { CategoryForm } from "./CategoryForm"
import { deleteCategory } from "@/app/actions/category"
import { CategoryProvider } from "../context/CategoryContext"
import CategoryButtons from "./CategoryButtons"

declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends unknown, TValue> {
        align?: "left" | "right" | "center"
    }
}

export type Category = {
    id: number
    name: string
}

export const columns: ColumnDef<Category>[] = [
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
        id: "actions",
        cell: ({ row }) => {
            const category = row.original

            return (
                <div>
                    <CategoryProvider id={category.id} name={category.name}>
                        <CategoryButtons />

                    </CategoryProvider>

                </div>

            )
        },
        header: "Actions",
        meta: {
            align: "right"
        }
    },
]
