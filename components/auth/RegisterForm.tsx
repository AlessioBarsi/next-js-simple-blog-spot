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

import { Input } from "@/components/ui/input"
import { createUser } from "@/app/actions/user";

const formSchema = z.object({
    name: z.string().min(8, "Name is required").trim(),
    email: z.string().min(8, "Email is required").trim(),
    password: z.string().min(8, "Password is required"),
})

export default function RegisterForm() {

    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
    })

    async function handleRegister() {

        const formData = form.getValues();
        const createdUser = await createUser(formData);
        if (createdUser) {
            toast.success('User created successfully. Redirecting to login...');
        } else {
            toast.error('This email is already in use');
        }
    }

    return (
        <form action={handleRegister} className="w-[50%] space-y-8 my-2">
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" required placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input required placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" required placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Sign Up</Button>
            </Form>
        </form>
    )
}

