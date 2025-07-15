import { File, MessageSquareText, Trash2, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { deleteUser } from "@/app/actions/user";
import { useUserContext } from "../context/UserContext";
import { toast } from "sonner";
import { UserForm } from "./UserForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import TooltipHandler from "../TooltipHandler";
import { redirect } from "next/navigation";
export default function UserButtons() {

    const { id, name, email } = useUserContext();
    function handleDelete() {
        deleteUser(id);
        toast.success('User has been deleted');
    }

    function viewUserPosts() {
        redirect(`/posts/author/${id}`)
    }

    function viewUserComments() {
        redirect(`/comments/user/${id}`)
    }
    return (
        <div className="space-x-2">
                
            
            <TooltipHandler tooltip="View posts by this user">
                <Button onClick={viewUserPosts} className="bg-blue-500"><File /></Button>
            </TooltipHandler>

            <TooltipHandler tooltip="View comments by this user">
                <Button onClick={viewUserComments} className="bg-blue-500"><MessageSquareText /></Button>
            </TooltipHandler>

            <UserForm id={id} name={name} email={email}/>
            <Dialog>
                <DialogTrigger asChild><Button disabled={id==1 ? true : false} className="bg-red-600"><Trash2 /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete the User?</DialogTitle>
                        User '{name}' will be deleted.
                        <Button className="bg-red-500" onClick={handleDelete}>Confirm</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}