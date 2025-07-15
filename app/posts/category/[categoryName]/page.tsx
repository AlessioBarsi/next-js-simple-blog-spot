import PostsList from "@/components/post/PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
    params: {
        categoryName: string,
    }
}

export default function CategoryPosts({ params }: Props) {
    const decodedParam = decodeURIComponent(params.categoryName);
    return (
        <div className="mx-5 my-5"> 
            <div className="text-3xl font-bold">Posts of category {decodedParam}</div>
            <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>
                <PostsList categoryName={decodedParam}/>
            </Suspense>
        </div>
    );
}