import { fetchCommentsByUser } from "@/app/actions/comment";
import LinkButton from "@/components/LinkButton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
type Props = {
    params: {
        authorId: number,
    }
}

export default async function Comments({ params }: Props) {

    const comments = await fetchCommentsByUser(
        //@ts-ignore
        parseInt(params.authorId))
    return (
        <div className="mx-5 my-5">
            <div className="text-3xl font-bold my-2">Comments</div>
            <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>

                <Card className="w-[70%]">
                    <CardHeader>
                        <CardTitle>Coments by user #{params.authorId}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {comments ? comments.map(comment => (
                            <Alert className="my-2" key={comment.id}>
                                <AlertTitle>{comment.post.title}</AlertTitle>
                                <AlertDescription>
                                    {comment.text}
                                </AlertDescription>
                            </Alert>
                        )) : <div>No comments have been found</div>}
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <LinkButton text="View User Posts" page={`posts/author/${params.authorId}`}/>
                    </CardFooter>
                </Card>
            </Suspense>
        </div>
    );
}