import { fetchCommentsByPost } from "@/app/actions/comment";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageSquareText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CommentProvider } from "../context/CommentContext";
import CommentButtons from "./CommentButtons";

type Props = {
    postId: number,
}
export default async function CommentsList({ postId }: Props) {
    const comments = await fetchCommentsByPost(postId);

    return (
        <div className="w-full md:w-[50%]">
            {
                comments ?
                    <div>
                        <Accordion type="single" collapsible>

                            <AccordionItem value="comments-list">
                                <AccordionTrigger><MessageSquareText />View {comments.length} Comments</AccordionTrigger>

                                <AccordionContent>
                                    {comments.map(comment => (

                                        <div className="flex space-x-2 my-2" key={comment.id}>
                                            <Alert>
                                                <AlertTitle>{comment.user.name}</AlertTitle>
                                                <AlertDescription>
                                                    {comment.text}
                                                </AlertDescription>
                                            </Alert>

                                            <div>
                                                <CommentProvider
                                                    commentId={comment.id}
                                                    postId={comment.postId}
                                                    text={comment.text}
                                                    author={comment.author}
                                                >

                                                    <CommentButtons />
                                                </CommentProvider>
                                            </div>
                                        </div>


                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>

                    </div>
                    :
                    <div>No comments <MessageSquareText /></div>
            }
        </div >
    )
}