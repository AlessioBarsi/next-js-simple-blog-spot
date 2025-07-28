'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { createComment, updateComment } from "@/app/actions/comment";
import { useCommentContext } from "../context/CommentContext";

const formSchema = z.object({
    text: z.string().min(3).max(20).trim(),
})

type Props = {
    update: boolean,
    postId: number,
    setIsOpen: (open: boolean) => void,
};

export function CommentForm({ update, postId, setIsOpen }: Props) {

    const { commentId, text, author } = useCommentContext();
    console.log("Author:", author)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: text ?? "",
        },
    })

    async function handleSubmitComment() {
        const formData = form.getValues();
        console.log(author);
        if (author && postId) {
            if (update && commentId) {
                //@ts-ignore
                await updateComment(formData, parseInt(author), postId, commentId);
                toast.success('Comment has been updated');
            } else {
                //@ts-ignore
                await createComment(formData, parseInt(author), postId);
                toast.success('Comment has been added');
            }
            setIsOpen(false);
        } else {
            toast.error('Could not fetch post information. Please try again')
        }
    }

    return (
        <form action={handleSubmitComment} className="space-y-8">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Input required placeholder="Write your comment here..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{update ? 'Edit' : 'Post'} comment</Button>
            </Form>
        </form>
    )
}

