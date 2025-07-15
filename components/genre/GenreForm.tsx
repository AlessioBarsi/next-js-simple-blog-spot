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

import { createGenre } from "@/app/actions/genre";
import { updateGenre } from "@/app/actions/genre";

const formSchema = z.object({
    name: z.string().min(3).max(20).trim(),
})

type Props = {
    update: boolean,
    id?: number,
    name?: string,
  };

export function GenreForm({ update, id, name }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:  name ?? "",
        },
    })

    async function handleSubmitGenre () {
        const formData = form.getValues();
        if (update && id) {
            await updateGenre(formData, id);
            toast.success('Genre has been updated');
        } else {
            await createGenre(formData);
            toast.success('Genre has been created');
        }
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><Button className="bg-green-600">{update ? <Pencil/> : <CirclePlus />}</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{update ? 'Update' : 'Add New'} Genre</DialogTitle>
                    <form action={handleSubmitGenre} className="space-y-8">
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input required placeholder="Genre Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{update ? 'Update' : 'Create'} Genre</Button>
                        </Form>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

