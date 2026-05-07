"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { styles } from "@/lib/auth-styles";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex justify-center items-center px-4 min-h-screen">
      <div className={styles.card}>
        <h1 className={styles.title}>Đăng nhập</h1>

        <form className="space-y-4">
          <input
            className={styles.input}
            placeholder="Nhập email của bạn"
            type="email"
          />

          <div className="relative">
            <input
              className={styles.input}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="top-1/2 right-4 absolute text-muted hover:text-white transition-colors -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className={styles.button} type="submit">
            Đăng nhập
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
