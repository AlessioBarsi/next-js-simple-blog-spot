import PostsList from "@/components/post/PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
    params: {
        startDate: string,
    }
}

export default function SearchResultPosts({ params }: Props) {
    const decodedParam = decodeURIComponent(params.startDate);
    return (
        <div className="mx-5 my-5"> 
            <div className="text-3xl font-bold">Posts from date {decodedParam} or newer</div>
            <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>
                <PostsList startDate={decodedParam}/>
            </Suspense>
        </div>
    );
}