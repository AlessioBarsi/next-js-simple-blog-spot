import PostsList from "@/components/post/PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
    params: {
        genreName: string,
    }
}

export default function GenrePosts({ params }: Props) {
    const decodedParam = decodeURIComponent(params.genreName);
    return (
        <div className="mx-5 my-5"> 
            <div className="text-3xl font-bold">Posts of genre {decodedParam}</div>
            <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>
                <PostsList genreName={decodedParam}/>
            </Suspense>
        </div>
    );
}