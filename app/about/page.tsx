import { fetchCommentsByUser } from "@/app/actions/comment";
import LinkButton from "@/components/LinkButton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Github } from "lucide-react";
import { Suspense } from "react";

export default async function Comments() {


    return (
        <div className="mx-5 my-5">

            <Card className="mx-auto w-1/2">
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-line">
                        {`Next.js Simple Blog Spot is an open-source blogging platform built with Next.js, Prisma, PostgreSQL, shadcn/ui, and Auth.js.
It allows users to create, edit, and comment on posts with simple role-based access control.

This project is licensed under the MIT License.
Feel free to contribute or use it in your own projects.

Source code available on GitHub.`}
                    </p>
                    <p>Developed by <a className="text-blue-700" href="https://github.com/AlessioBarsi">Alessio Barsi</a></p>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <LinkButton text="View Source Code" page='github.com/next-js-simple-blog-spot' />
                    <Github />
                </CardFooter>
            </Card>
        </div>
    );
}