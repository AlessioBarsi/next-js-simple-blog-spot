'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CommentProvider, useCommentContext } from "../context/CommentContext";
import { deleteComment } from "@/app/actions/comment";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { CommentForm } from "./CommentForm";
import { Pen, Trash2 } from "lucide-react";

export default function CommentButtons() {

    const { data: session, status } = useSession();
    const [canEditComment, setCanEditComment] = useState(false);
    const [canDeleteComment, setCanDeleteComment] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { commentId, postId, author } = useCommentContext();

    if (status == 'loading') {
        return (<div>Loading...</div>)
    }

    function handleDelete() {
        deleteComment(commentId ?? 0);
        toast.success('Comment has been deleted');
    }

    useEffect(() => {
        if (session) {
            const userRoles = session.user.userHasRoles;
            //Check if the user has any roles assigned, otherwise it's a basic user
            if (Array.isArray(userRoles) && userRoles.length > 0) {
                //Check for Editor or Admin
                const hasRole = userRoles.some(roleObj => roleObj.roleId === 1 || roleObj.roleId === 2);
                if (hasRole) {
                    setCanDeleteComment(true);
                    //Check if it's the author of this comment
                } else if (author == session.user.id) {
                    setCanDeleteComment(true);
                }
            }
            //Check if it's the author of this comment to enable edit/delete
            if (session.user.id && author == session.user.id) {
                setCanEditComment(true);
                setCanDeleteComment(true);
            }
        }
    }, [session, commentId, author]);

    return (
        <div className="flex items-center h-5 space-x-2 my-2">
            <div className="flex items-center h-5 space-x-2 my-2">
                {session && canDeleteComment ?
                    <Dialog>
                        <DialogTrigger asChild><Button className="bg-red-600"><Trash2 /></Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete the Comment?</DialogTitle>
                                <Button onClick={handleDelete}>Confirm</Button>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    : <></>}

                {session && canEditComment ?
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild><Button className="bg-green-600"><Pen /></Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit the Comment</DialogTitle>
                                <CommentProvider
                                //@ts-ignore
                                    commentId={commentId} author={author}>
                                    <CommentForm postId={postId ?? 0} update={true} setIsOpen={setIsOpen} />
                                </CommentProvider>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    : <></>}

            </div>
        </div>

    );
}