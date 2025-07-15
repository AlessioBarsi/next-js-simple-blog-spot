'use client'
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { PlusCircle, Trash2 } from "lucide-react";
import { removeRole } from "@/app/actions/role";

type Props = {
    id: number,
    roleId: number,
};

export default function RemoveRoleDialog({ id, roleId }: Props) {

    async function handleRemoveRole () {
        //Convert vaue to int and check if conversion is successful
        const removedRole = await removeRole(id, roleId);
        if (removedRole.error) {
            toast.error(removedRole.message);
        } else {
            toast.success(removedRole.message);
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button className="bg-red-600"><Trash2 /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove the role from this user?</DialogTitle>
                   </DialogHeader>
                        <Button onClick={() => handleRemoveRole()} className="w-[25%]">Confirm</Button>
 
                </DialogContent>
            </Dialog>

        </div>
    );
}