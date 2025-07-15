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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "sonner";

import { updateUser } from "@/app/actions/user";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
    name: z.string().min(6).max(20).trim(),
    email: z.string().min(6).max(20).trim(),
})

export function ProfileForm() {

    const { data: session, status, update } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: session?.user.name ?? "",
            email: session?.user.email ?? "",
        },
    })

    if (status === 'loading') {
        return <div><Skeleton className="w-[70%] h-[30%]" /></div>
    }

    useEffect(() => {
        if (session?.user) {
            form.reset({
                name: session.user.name ?? "",
                email: session.user.email ?? "",
            });
        }
    }, [session?.user, form]);


    async function handleSubmit() {
        const formData = form.getValues();
        if (session?.user.id) {
            // @ts-ignore
            const updateResult = await updateUser(formData, parseInt(session.user.id, 10));
            if (updateResult.error) {
                toast.success(updateResult.message);
            } else {
                toast.error(updateResult.message);
            }
        } else {
            toast.error('User id not could not be fetched. Please try again')
        }
    }

    return (
        <Card>
            <CardContent>
                <form action={handleSubmit} className="space-y-8">
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
                                        <Input required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Update Information</Button>
                    </Form>
                </form>
            </CardContent>
        </Card>



    )
}

