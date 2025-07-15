'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { createPost, updatePost } from "@/app/actions/post";
import { usePostContext } from "../context/PostContext";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";

const formSchema = z.object({
    title: z.string().min(2, "Title is required").max(50),
    content: z.string().min(2, "Content is required"),
    description: z.string().min(4, "description is required"),
    categoryId: z.number().min(1, "Category is required"),
    genreId: z.number().min(1, "Genre is required"),
    image: z.string().nullable(),
})

type Props = {
    update: boolean,
    setIsOpen?: (open: boolean) => void,
}
export default function PostForm({ update, setIsOpen }: Props) {
    const { data: session } = useSession();

    const { postId, title, content, description, categoryId, genreId, image, categories, genres } = usePostContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title ?? "",
            content: content ?? "",
            description: description ?? "",
            categoryId: categoryId ?? undefined,
            genreId: genreId ?? undefined,
            image: image ?? "",
        },
    })

    async function handleSubmitPost() {

        const formData = form.getValues();
        if (update && postId) {
            await updatePost(formData, postId);
            toast.success('Post has been updated');
        } else {
            if (session && session.user.id)
            {
                //@ts-ignore
                await createPost(formData, parseInt(session.user.id));
                toast.success('Post has been created');
            } else {
                toast.error('Could not fetch user session. Please try again.')
            }
        }
        if (setIsOpen) {
            setIsOpen(false);
        }
    }

    return (
        <form action={handleSubmitPost} className="space-y-8">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input required placeholder="Post Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    required
                                    placeholder="Post Content"
                                    className="min-h-[10rem] resize-y"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    required
                                    placeholder="Post Description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-stretch space-x-3">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select required
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        defaultValue={field.value?.toString()}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="genreId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Genre</FormLabel>
                                <FormControl>
                                    <Select required
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        defaultValue={field.value?.toString()}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Genre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {genres.map((genre) => (
                                                <SelectItem key={genre.id} value={genre.id.toString()}>
                                                    {genre.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Image URL" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{update ? 'Update' : 'Add'} Post</Button>
            </Form>
        </form>
    )
}

