import { File, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteGenre } from "@/app/actions/genre";
import { useGenreContext } from "../context/GenreContext";
import { toast } from "sonner";
import { GenreForm } from "./GenreForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import TooltipHandler from "../TooltipHandler";
import { redirect } from "next/navigation";

export default function GenreButtons() {

    const { id, name } = useGenreContext();
    function handleDelete() {
        deleteGenre(id);
        toast.success('Genre has been deleted');
    }

    function handleRelatedPosts() {
        //Redirect to /posts containing only posts with this genre
        redirect(`/posts/genre/${name}`)
    }
    return (
        <div className="space-x-2">

            <GenreForm update={true} id={id} name={name} />

            <TooltipHandler tooltip="View associated posts">
                <Button onClick={handleRelatedPosts} className="bg-blue-500"><File /></Button>
            </TooltipHandler>

            <Dialog>
                <DialogTrigger asChild><Button className="bg-red-600"><Trash2 /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete the Genre?</DialogTitle>
                        Genre '{name}' and all related posts with this genre will be deleted.
                        <Button className="bg-red-500" onClick={handleDelete}>Confirm</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}