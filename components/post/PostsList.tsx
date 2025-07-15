import { fetchPosts, fetchPostsByAuthor, fetchPostsByCategory, fetchPostsByGenre } from "@/app/actions/post";
import { fetchCategories } from "@/app/actions/category";
import { fetchGenres } from "@/app/actions/genre";
import PostButtons from "@/components/post/PostButtons";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PostProvider } from "../context/PostContext";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import { CircleX } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { badgeVariants } from "../ui/badge";
import Link from "next/link";
import CommentsList from "./CommentsList";

type Props = {
    categoryName?: string,
    genreName?: string,
    authorId?: number,
    startDate?: string,
}
export default async function PostsList({ categoryName, genreName, authorId, startDate }: Props) {
    let posts = await fetchPosts();
    const categories = await fetchCategories();
    const genres = await fetchGenres();

    let notFoundMessage = '';
    let result = undefined;
    switch (true) {
        case (categoryName !== undefined):
            result = await fetchPostsByCategory(categoryName)
            if (!result) notFoundMessage = 'Posts with this category don\'t exist or have not been made yet';
            break;
        case (genreName !== undefined):
            result = await fetchPostsByGenre(genreName)
            if (!result) notFoundMessage = 'Posts with this genre don\'t exist or have not been made yet';
            break;
        case (authorId !== undefined):
            result = await fetchPostsByAuthor(authorId);
            if (!result) notFoundMessage = 'This user has not published any posts';
            break;
        case (startDate !== undefined):
            result = false;
            if (!result) notFoundMessage = 'There are no posts in this date';
            break;
    }
    //@ts-ignore
    if (result !== undefined && result !== false) posts = result;

    if (notFoundMessage != '') {
        return (
            <Alert className="w-[30%]">
                <CircleX className="h-4 w-4" />
                <AlertTitle>Posts have not been found</AlertTitle>
                <AlertDescription>
                    {notFoundMessage}
                </AlertDescription>
            </Alert>
        )
    }
    return (
        <div>
            {(posts && categories && genres) ? posts.map(post => (
                <Card key={post.id} className="my-3">
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>
                            {post.description}
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2 my-2">
                            <Link href={`/posts/category/${post.category.name}`} className={badgeVariants({ variant: "outline" })}>
                                {post.category.name}
                            </Link>
                            <Link href={`/posts/genre/${post.genre.name}`} className={badgeVariants({ variant: "secondary" })}>
                                {post.genre.name}
                            </Link>
                        </div>

                        <p className="whitespace-pre-line">{post.content}</p>
                        {post.image ?
                            <div className="w-[20%] h-[10%] my-2">
                                <img loading="lazy" src={post.image} alt="Post Image could not be loaded" />
                            </div>
                            : <></>
                        }
                        <pre>Posted by User<a className="text-blue-500" href={`/posts/author/${post.createdBy}`}> {post.user.name}</a> at {format(post.createdAt, 'Pp')}</pre>

                        <CommentsList postId={post.id} />

                    </CardContent>
                    <CardFooter>

                        <div>
                            <PostProvider
                                postId={post.id}
                                title={post.title}
                                content={post.content}
                                description={post.description}
                                categoryId={post.categoryId}
                                genreId={post.genreId}
                                createdBy={post.createdBy}
                                image={post.image}
                                categories={categories}
                                genres={genres}
                            >
                                <PostButtons />
                            </PostProvider>
                        </div>
                    </CardFooter>
                </Card>
            )) :
                <Skeleton className="w-[50%] h-[30%]" />}
        </div>
    );
}