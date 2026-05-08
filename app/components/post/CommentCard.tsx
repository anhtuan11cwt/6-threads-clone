import type { Comment, User } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import CommentReplyButton from "./comment-reply-button";

type CommentWithAuthor = Comment & {
  author: User;
  replies?: CommentWithAuthor[];
};

interface CommentCardProps {
  comment: CommentWithAuthor;
  depth?: number;
  isReply?: boolean;
  parentAuthorName?: string;
}

export default function CommentCard({
  comment,
  isReply = false,
  parentAuthorName,
  depth = 0,
}: CommentCardProps) {
  // depth = 0: Bình luận gốc
  // depth = 1: Trả lời cấp 1 (Thụt lề qua flex-1 của gốc)
  // depth > 1: Trả lời lồng nhau (Căn chỉnh với depth 1)

  return (
    <div className="w-full">
      <div className={`flex gap-3 ${isReply ? "mt-4" : "py-4"}`}>
        <div className="flex flex-col items-center">
          <Link href={`/${comment.author.username}`}>
            <Image
              alt="user"
              className={`${depth > 0 ? "size-8" : "size-10"} rounded-full object-cover shrink-0`}
              height={40}
              src={comment.author.image || "/avatar.png"}
              width={40}
            />
          </Link>
          {comment.replies && comment.replies.length > 0 && depth === 0 && (
            <div className="bg-white/10 mt-2 mb-1 rounded-full w-[2px] grow" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              className="hover:underline"
              href={`/${comment.author.username}`}
            >
              <p className="font-semibold text-white text-sm">
                {comment.author.name}
              </p>
            </Link>

            <Link href={`/${comment.author.username}`}>
              <span className="text-neutral-400 text-xs">
                @{comment.author.username}
              </span>
            </Link>

            <span className="text-neutral-500 text-xs">•</span>

            <span className="text-neutral-500 text-xs">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {parentAuthorName && (
            <p className="mt-0.5 text-neutral-500 text-xs">
              Trả lời <span className="text-sky-500">@{parentAuthorName}</span>
            </p>
          )}

          <p className="mt-1 text-white text-sm whitespace-pre-wrap">
            {comment.content}
          </p>
          <CommentReplyButton comment={comment} />

          {/* CHỈ render replies ở đây nếu là gốc (depth 0) để tạo ra sự thụt lề đầu tiên */}
          {depth === 0 && comment.replies && comment.replies.length > 0 && (
            <div className="space-y-4 mt-2">
              {comment.replies.map((reply) => (
                <CommentCard
                  comment={reply}
                  depth={depth + 1}
                  isReply
                  key={reply.id}
                  parentAuthorName={
                    comment.author.username || comment.author.name
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nếu depth > 0, render replies ở NGOÀI flex-1 để chúng thẳng hàng với avatar hiện tại (không thụt thêm) */}
      {depth > 0 && comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 mt-2">
          {comment.replies.map((reply) => (
            <CommentCard
              comment={reply}
              depth={depth + 1}
              isReply
              key={reply.id}
              parentAuthorName={comment.author.username || comment.author.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
