import { Eye, MessageCircle } from "lucide-react";
import type { CommunityPost } from "@/lib/community";

type CommunityCardProps = {
  post: CommunityPost;
};

export function CommunityCard({ post }: CommunityCardProps) {
  return (
    <article className="rounded-[1.35rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-[#eef5ff] text-[#0b66e4]">
            <MessageCircle className="size-5" aria-hidden />
          </span>
          <span>
            <span className="block text-xs font-black text-[#0b66e4]">
              {post.board}
            </span>
            <span className="text-xs font-bold text-neutral-400">
              {post.author}
            </span>
          </span>
        </div>
        <span className="rounded-full bg-[#f1f5fb] px-2.5 py-1 text-xs font-black text-neutral-500">
          답변 {post.replies}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-black leading-6 text-neutral-950">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-neutral-500">
        {post.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#f6f8fb] px-2.5 py-1 text-xs font-black text-neutral-500"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs font-bold text-neutral-400">
        <span>{post.createdAt}</span>
        <span className="inline-flex items-center gap-1">
          <Eye className="size-3.5" aria-hidden />
          {post.views}
        </span>
      </div>
    </article>
  );
}
