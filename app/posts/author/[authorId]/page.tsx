import PostsList from "@/components/post/PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
    params: {
        authorId: number,
    }
}

export default function AuthorPosts({ params }: Props) {

    return (
        <div className="mx-5 my-5"> 
            <div className="text-3xl font-bold">Posts by author #{params.authorId}</div>
            <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>
                <PostsList authorId={
                    //@ts-ignore
                    parseInt(params.authorId)}/>
            </Suspense>
        </div>
    );
}