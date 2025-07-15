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

import { updatePassword } from "@/app/actions/user";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter } from "../ui/card";

const formSchema = z.object({
    password: z.string().min(8).max(50),
    newpassword: z.string().min(8).max(50),
})

export function PasswordForm() {

    const { data: session, status } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            newpassword: "",
        },
    })

    if (status === 'loading') {
        return <div><Skeleton className="w-[70%] h-[30%]" /></div>
    }


    async function handleSubmit() {
        const formData = form.getValues();
        if (session) {
            const result = await updatePassword(formData, session.user.id)
            if (result.error) {
                toast.error(result.message);
            } else {
                toast.success(result.message);
            }
        } else {
            toast.error('Error fetching user session. Please try again later');
        }
    }

    return (
        <Card>
            <CardContent>
                <form action={handleSubmit} className="space-y-8">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your current password" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insert your new password" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Update Password</Button>
                    </Form>
                </form>
            </CardContent>
        </Card>
    )
}

