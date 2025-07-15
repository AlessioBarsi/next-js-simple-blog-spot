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

import { createComment } from "@/app/actions/comment";

const formSchema = z.object({
    text: z.string().min(3).max(20).trim(),
})

type Props = {
    postId?: number,
    userId?: number,
    setIsOpen: (open: boolean) => void,
};

export function CommentForm({ postId, userId, setIsOpen }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })

    async function handleSubmitGenre() {
        const formData = form.getValues();
        if (userId && postId) {
            //@ts-ignore
            await createComment(formData, parseInt(userId), postId);
            toast.success('Comment has been added');
            setIsOpen(false);
        } else {
            toast.error('Could not fetch post information. Please try again')
        }
    }

    return (
        <form action={handleSubmitGenre} className="space-y-8">
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
                <Button type="submit">Post comment</Button>
            </Form>
        </form>
    )
}

