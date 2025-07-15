'use server';
import { fetchCategories } from "@/app/actions/category";
import { DataTable } from "../data-table";
import { columns } from "./CategoryColumns";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
export default async function CategoriesTable() {
    const categories = await fetchCategories();
    return (
        <div>
            <Suspense fallback={<Skeleton className="w-[70%] h-[40%]" />}>
                <DataTable columns={columns} data={categories} />
            </Suspense>
        </div>
    );
}
