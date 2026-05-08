import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import "moment/locale/vi";
import CommentReplyButton from "./comment-reply-button";

moment.locale("vi");

interface Props {
  postId: string;
}

export default async function Comments({ postId }: Props) {
  const { getComments } = await import("@/app/actions/comment.action");
  const comments = await getComments(postId);

  if (comments.length === 0) {
    return (
      <div className="py-10 text-neutral-500 text-sm text-center">
        Chưa có câu trả lời nào.
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 pb-4">
      {comments.map((comment) => (
        <div className="flex gap-3" key={comment.id}>
          <div className="flex flex-col items-center">
            <Link href={`/${comment.author.username}`}>
              <Image
                alt={comment.author.name}
                className="rounded-full size-10 object-cover"
                height={40}
                src={comment.author.image || "/avatar.png"}
                width={40}
              />
            </Link>
            <div className="bg-zinc-800 my-2 w-0.5 grow" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2">
              <Link
                className="hover:underline"
                href={`/${comment.author.username}`}
              >
                <p className="font-semibold text-white text-sm">
                  {comment.author.name}
                </p>
              </Link>
              <span className="text-neutral-500 text-sm">•</span>
              <span className="text-neutral-500 text-sm">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className="mt-1 text-white text-sm whitespace-pre-wrap">
              {comment.content}
            </p>
            <CommentReplyButton comment={comment} />
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
