'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog";
import PostForm from "./PostForm";
import { PlusCircle } from "lucide-react";

export default function NewPostDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex items-center h-5 space-x-2 my-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild><Button className="bg-blue-600"><PlusCircle />New Post</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                        <PostForm update={false} setIsOpen={setIsOpen} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    );
}