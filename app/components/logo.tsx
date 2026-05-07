import Link from "next/link";

type LogoProps = {
  size?: number;
};

export const Logo = ({ size = 32 }: LogoProps) => {
  return (
    <Link
      className="flex items-center gap-2 hover:opacity-80 transition"
      href="/feed"
    >
      <div
        className="bg-white rounded-full flex items-center justify-center"
        style={{
          height: size,
          width: size,
        }}
      >
        <span className="text-black font-bold text-lg">T</span>
      </div>
      <span className="text-white font-semibold text-xl tracking-tight">
        Threads
      </span>
    </Link>
  );
};
