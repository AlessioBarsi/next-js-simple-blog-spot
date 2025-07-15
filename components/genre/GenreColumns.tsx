"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { GenreProvider } from "../context/GenreContext"
import { Button } from "../ui/button"
import GenreButtons from "./GenreButtons"

declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends unknown, TValue> {
        align?: "left" | "right" | "center"
    }
}

export type Genre = {
    id: number
    name: string
}

export const columns: ColumnDef<Genre>[] = [
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
            const genre = row.original

            return (
                <div>
                    <GenreProvider id={genre.id} name={genre.name}>
                        <GenreButtons />

                    </GenreProvider>

                </div>

            )
        },
        header: "Actions",
        meta: {
            align: "right"
        }
    },
]
