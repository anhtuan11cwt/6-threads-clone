import type { Comment, User } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

type CommentWithAuthor = Comment & {
  author: User;
};

interface CommentCardProps {
  comment: CommentWithAuthor;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex gap-3 py-4">
      <Link href={`/${comment.author.username}`}>
        <Image
          alt="user"
          className="size-10 rounded-full object-cover"
          height={40}
          src={comment.author.image || "/avatar.png"}
          width={40}
        />
      </Link>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Link
            className="hover:underline"
            href={`/${comment.author.username}`}
          >
            <p className="text-sm font-semibold text-white">
              {comment.author.name}
            </p>
          </Link>

          <Link href={`/${comment.author.username}`}>
            <span className="text-xs text-neutral-400">
              @{comment.author.username}
            </span>
          </Link>

          <span className="text-xs text-neutral-500">•</span>

          <span className="text-xs text-neutral-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        <p className="mt-1 text-sm text-white whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
