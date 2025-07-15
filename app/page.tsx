import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/auth/AuthButtons";
import NewPostDialog from "@/components/post/NewPostDialog";
import { fetchCategories } from "./actions/category";
import { fetchGenres } from "./actions/genre";
import { fetchPosts } from "./actions/post";
import { PostProvider } from "@/components/context/PostContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LinkButton from "@/components/LinkButton";
import { format } from "date-fns";


export default async function Home() {

  const session = await getServerSession(authOptions);

  const categories = await fetchCategories();
  const genres = await fetchGenres();
  const latestPosts = await fetchPosts();

  return (
    <div>
      <span>
        <Card className="w-[70%]">
          <CardHeader>
            <CardTitle className="text-4xl">Next.js Simple Blog Spot!</CardTitle>
            <CardDescription>
              {session ?
                <div className="text-2xl">Welcome, {session.user.name}</div> :
                <div className="text-2xl">Login or Register to comment on posts</div>}
            </CardDescription>
          </CardHeader>
          <CardContent>
            Update your profile info or discover the latest posts
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <div>
              {session && session.user ?
                <div className="flex items-center h-5 space-x-2 my-2">
                  {(session && session.user.userHasRoles && session.user.userHasRoles.length > 0) ?
                    <PostProvider
                      categories={categories}
                      genres={genres}>
                      <NewPostDialog />
                    </PostProvider>
                    :
                    <></>
                  }
                  <LinkButton text='My Posts' page={`posts/author/${session?.user.id}`} />
                  <ProfileButton />
                  <LinkButton text='My Comments' page={`comments/${session?.user.id}`} />
                  <LogoutButton />
                </div>
                :
                <div className="flex items-center h-5 space-x-2 my-2"><LoginButton /> <RegisterButton /></div>
              }
            </div>
          </CardFooter>
        </Card>
      </span>
      <p className="text-3xl my-2 font-bold">Latest Posts</p>
      <div className="flex items-center space-x-2 my-2">

        {latestPosts.slice(0, 3).map(post => (
          <Card key={post.id} className="w-[30%]">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.description}
              </CardDescription>

            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{post.content}</p>
              {post.image ?
                <div className="w-[20%] h-[10%] my-2">
                  <img loading="lazy" src={post.image} alt="Post Image could not be loaded" />
                </div>
                : <></>
              }
              <pre>Posted by User <a className="text-blue-500" href={`/posts/author/${post.createdBy}`}>{post.user.name}</a></pre>

            </CardContent>
          </Card>
        ))}
      </div>


    </div>

  );
}
