'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CirclePlus, Pencil } from "lucide-react";

import { createCategory } from "@/app/actions/category";
import { updateCategory } from "@/app/actions/category";

const formSchema = z.object({
    name: z.string().min(3).max(20).trim(),
})

type Props = {
    update: boolean,
    id?: number,
    name?: string,
  };

export function CategoryForm({ update, id, name }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:  name ?? "",
        },
    })

    async function handleSubmitCategory () {
        const formData = form.getValues();
        if (update && id) {
            await updateCategory(formData, id);
            toast.success('Category has been updated');
        } else {
            await createCategory(formData);
            toast.success('Category has been created');
        }
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><Button className="bg-green-600">{update ? <Pencil/> : <CirclePlus />}</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{update ? 'Update' : 'Add New'} Category</DialogTitle>
                    <form action={handleSubmitCategory} className="space-y-8">
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input required placeholder="Category Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{update ? 'Update' : 'Create'} Category</Button>
                        </Form>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

