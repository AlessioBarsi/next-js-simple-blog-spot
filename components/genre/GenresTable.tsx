'use server';
import { DataTable } from "../data-table";
import { Suspense } from "react";
import { columns } from "./GenreColumns";
import { Skeleton } from "../ui/skeleton";
import { fetchGenres } from "@/app/actions/genre";

export default async function GenresTable() {
    const genres = await fetchGenres();
    return (
        <div>
            <Suspense fallback={<Skeleton className="w-[70%] h-[40%]" />}>
                <DataTable columns={columns} data={genres} />
            </Suspense>
        </div>
    );
}
