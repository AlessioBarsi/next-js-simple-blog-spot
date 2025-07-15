'use server';
import { DataTable } from "../data-table";
import { Suspense } from "react";
import { columns } from "./RoleColumns";
import { Skeleton } from "../ui/skeleton";
import { fetchUsers } from "@/app/actions/user";

export default async function RolesTable() {
    const roles = await fetchUsers();
    return (
        <div>
            <Suspense fallback={<Skeleton className="w-[70%] h-[40%]" />}>
                <DataTable columns={columns} data={roles} />
            </Suspense>
        </div>
    );
}
