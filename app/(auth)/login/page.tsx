"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { styles } from "@/lib/auth-styles";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Có lỗi xảy ra");
        return;
      }

      toast.success("Đăng nhập thành công");
      router.push("/feed");
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center px-4 min-h-screen">
      <div className={styles.card}>
        <h1 className={styles.title}>Đăng nhập</h1>

        <form
          className={`space-y-4 ${loading ? "opacity-70" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            type="email"
            value={email}
          />

          <div className="relative">
            <input
              className={styles.input}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              className="top-1/2 right-4 absolute disabled:opacity-50 text-muted hover:text-white transition-colors -translate-y-1/2 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            className={`${styles.button} flex justify-center items-center gap-2`}
            disabled={loading}
            type="submit"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className={styles.text}>
          Chưa có tài khoản?{" "}
          <Link className={styles.link} href="/register">
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}
