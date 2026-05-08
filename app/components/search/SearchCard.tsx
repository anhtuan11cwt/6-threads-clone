import Image from "next/image";
import Link from "next/link";

interface SearchCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    image?: string | null;
    bio?: string | null;
    _count: {
      followers: number;
      following: number;
    };
  };
}

const SearchCard = ({ user }: SearchCardProps) => {
  return (
    <div className="flex justify-between items-start gap-4 bg-[#111111] p-4 border border-neutral-800 rounded-2xl">
      <div className="flex gap-3">
        <Image
          alt={user.name}
          className="rounded-full w-12 h-12 object-cover"
          height={48}
          src={user.image || "/avatar.png"}
          width={48}
        />
        <div className="space-y-1">
          <Link
            className="font-semibold text-white hover:underline"
            href={`/${user.username}`}
          >
            {user.name}
          </Link>
          <p className="text-neutral-400 text-sm">@{user.username}</p>
          {user.bio && <p className="text-neutral-300 text-sm">{user.bio}</p>}
          <div className="flex gap-4 text-neutral-500 text-xs">
            <span>{user._count.followers} người theo dõi</span>
            <span>{user._count.following} đang theo dõi</span>
          </div>
        </div>
      </div>
      <button
        className="bg-white hover:opacity-90 px-4 py-2 rounded-full font-medium text-black text-sm transition"
        type="button"
      >
        Theo dõi
      </button>
    </div>
  );
};

export default SearchCard;
