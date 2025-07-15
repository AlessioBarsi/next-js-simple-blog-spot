import { File, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteCategory } from "@/app/actions/category";
import { useCategoryContext } from "../context/CategoryContext";
import { toast } from "sonner";
import { CategoryForm } from "./CategoryForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation";

import TooltipHandler from "../TooltipHandler";
export default function CategoryButtons() {

    const { id, name } = useCategoryContext();
    function handleDelete() {
        deleteCategory(id);
        toast.success('Category has been deleted');
    }

    function handleRelatedPosts() {
        redirect(`/posts/category/${name}`)
    }
    return (
        <div className="space-x-2">
                
            <CategoryForm update={true} id={id} name={name} />
            
            <TooltipHandler tooltip="View associated posts">
                <Button onClick={handleRelatedPosts} className="bg-blue-500"><File /></Button>
            </TooltipHandler>

            <Dialog>
                <DialogTrigger asChild><Button className="bg-red-600"><Trash2 /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete the Category?</DialogTitle>
                        Category '{name}' and all related posts with this category will be deleted.
                        <Button className="bg-red-500" onClick={handleDelete}>Confirm</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}