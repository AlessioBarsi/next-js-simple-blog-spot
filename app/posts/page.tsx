import PostsList from "@/components/post/PostsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Posts() {

  return (
    <div className="mx-5 my-5">
      <div className="text-3xl font-bold">Posts</div>
      <Suspense fallback={<Skeleton className="w-[50%] h-[20%] rounded-full" />}>
        <PostsList />
      </Suspense>
    </div>
  );
}