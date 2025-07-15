'use server';
import { DataTable } from "../data-table";
import { Suspense } from "react";
import { columns } from "./UserColumns";
import { Skeleton } from "../ui/skeleton";
import { fetchUsers } from "@/app/actions/user";

export default async function UsersTable() {
    const users = await fetchUsers();
    return (
        <div>
            <Suspense fallback={<Skeleton className="w-[70%] h-[40%]" />}>
                <DataTable columns={columns} data={users} />
            </Suspense>
        </div>
    );
}
