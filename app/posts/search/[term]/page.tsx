import PostsList from "@/components/post/PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
    params: {
        term: string,
    }
}

export default function SearchResultPosts({ params }: Props) {
    const decodedParam = decodeURIComponent(params.term);
    return (
        <div className="mx-5 my-5"> 
            <div className="text-3xl font-bold">Posts of term {decodedParam}</div>
            <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>
                <PostsList searchTerm={decodedParam}/>
            </Suspense>
        </div>
    );
}