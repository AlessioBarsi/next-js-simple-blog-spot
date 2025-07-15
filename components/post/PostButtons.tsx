'use client';
import { useEffect, useState } from "react";
import { usePostContext } from "../context/PostContext";
import { deletePost } from "@/app/actions/post";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import PostForm from "./PostForm";
import { useSession } from "next-auth/react";
import { CommentForm } from "./CommentForm";

export default function PostButtons() {
    const { data: session, status } = useSession();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [canEditPost, setCanEditPost] = useState(false);

    const { postId, title, createdBy } = usePostContext();

    //Check if user can edit or delete the post
    useEffect(() => {
        if (session) {
            const userRoles = session.user.userHasRoles;
            //Check if the user has any roles assigned, otherwise it's a basic user
            if (Array.isArray(userRoles) && userRoles.length > 0) {
                //Check for Editor or Admin
                const hasRole = userRoles.some(roleObj => roleObj.roleId === 1 || roleObj.roleId === 2);
                if (hasRole) {
                    setCanEditPost(true);
                    //Check if it's the author of this post
                } else if (createdBy === session.user.id) {
                    setCanEditPost(true);
                }
            }
        }
    }, [session, postId, createdBy]);

    if (status == 'loading') {
        return (<div>Loading...</div>)
    }

    function handleDelete() {
        deletePost(postId ?? 0);
        toast.success('Post has been deleted');
    }

    return (
        <div className="flex items-center h-5 space-x-2 my-2">

            {session && canEditPost ? <div className="flex items-center h-5 space-x-2 my-2">
                <Dialog>
                    <DialogTrigger asChild><Button className="bg-red-600">Delete</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete the Post?</DialogTitle>
                            Post '{title}' will be deleted
                            <Button onClick={handleDelete}>Confirm</Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild><Button className="bg-green-600">Edit</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit the Post</DialogTitle>
                            <PostForm update={true} setIsOpen={setIsOpen} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div> : <></>}

            <Dialog open={isOpenComment} onOpenChange={setIsOpenComment}>
                <DialogTrigger asChild><Button disabled={session ? false : true} className="bg-amber-500">{session ? '' : 'Login to'} Comment</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a comment</DialogTitle>
                        <CommentForm postId={postId ?? undefined} userId={session?.user.id} setIsOpen={setIsOpenComment} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>

    );
}