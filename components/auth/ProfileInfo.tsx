'use client';

import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { format } from 'date-fns'
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";

export default function ProfileInfo() {
    const { data: session, status } = useSession();
    if (status === 'loading') {
        return <div><Skeleton className="w-[70%] h-[30%]" /></div>
    }

    if (session?.user) {
        const userData = session.user;

        return (
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>{userData.name}</CardTitle>
                        <CardDescription>
                            <pre>Account created at {userData.createdAt ? format(userData.createdAt, 'PPP') : ''}</pre>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Avatar>
                            <AvatarImage src={userData.picture ?? ''} />
                            <AvatarFallback>No avatar</AvatarFallback>
                        </Avatar>
                        <pre>Email: <b>{userData.email}</b></pre>

                        <div className="flex space-x-2 items-start my-1">
                            <pre>Roles: </pre>
                            {userData.userHasRoles ?
                                userData.userHasRoles.map(hasRole => (
                                    <Badge key={hasRole.roleId} variant="secondary">{hasRole.role.name}</Badge>
                                )) :
                                <Badge variant="secondary">Standard User</Badge>
                            }</div>

                    </CardContent>
                </Card>
            </div>
        )
    }

    return <div><Skeleton className="w-[70%] h-[30%]" /></div>


}