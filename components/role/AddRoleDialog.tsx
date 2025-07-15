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

import { PlusCircle } from "lucide-react";
import { assignRole, fetchRoles } from "@/app/actions/role";
import { useEffect, useState } from "react";
import { Role } from "@/src/app/generated/prisma";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";

type Props = {
    id: number,
};

export default function AddRoleDialog({ id }: Props) {

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(String);

    const router = useRouter();

    useEffect(() => {
        async function loadRoles() {
            try {
                const data = await fetchRoles(); // Fetch from API or client-safe function
                setRoles(data);
            } catch (err) {
                toast.error("Failed to fetch roles");
            } finally {
                setLoading(false);
            }
        }

        loadRoles();
    }, []);

    async function handleAddRole () {
        //Convert vaue to int and check if conversion is successful
        if (selectedRole) {
            const roleId = parseInt(selectedRole)
            if (!isNaN(roleId) && roleId > 0) {
                
                const newRole = await assignRole(roleId, id);
                if (newRole.error) {
                    toast.error(newRole.message);
                } else {
                    toast.success(newRole.message);
                    router.refresh();
                }
            } else {
                toast.error('Role selected is not valid')
            }
        } else {
            toast.error('A role must be selected')
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild><Button className="bg-green-600"><PlusCircle /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Role</DialogTitle>

                    </DialogHeader>
                        <Select onValueChange={(value) => setSelectedRole(value)}>
                            <SelectTrigger className="w-[70%]">
                                <SelectValue placeholder="Select the role to add to this user" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>

                                    {loading || !roles ? 'Loading roles...' :
                                        roles.map(role => (
                                           <SelectItem key={role.id} value={(role.id.toString())}>{role.name}</SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => handleAddRole()} className="w-[25%]">Add Role</Button>
                </DialogContent>
            </Dialog>

        </div>
    );
}