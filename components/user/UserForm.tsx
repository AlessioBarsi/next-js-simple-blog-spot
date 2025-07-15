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

import { createUser } from "@/app/actions/user";
import { updateUser } from "@/app/actions/user";
import { userAgent } from "next/server";

const formSchema = z.object({
    name: z.string().min(3).max(20).trim(),
    email: z.string().min(3).max(20).trim(),
})

type Props = {
    id: number,
    name: string,
    email: string,
};

export function UserForm({ id, name, email }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name ?? "",
            email: email ?? "",
        },
    })

    async function handleSubmitUser() {
        const formData = form.getValues();
        if (id) {
            updateUser(formData, id);
            toast.success('User data has been updated')
        }
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><Button className="bg-green-600"><Pencil /></Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User Information</DialogTitle>
                    <form action={handleSubmitUser} className="space-y-8">
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input required {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input required type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update</Button>
                        </Form>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

