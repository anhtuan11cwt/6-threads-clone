"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { styles } from "@/lib/auth-styles";

export default function SetupUsernamePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("/api/setup-username", { username });

      toast.success("Username đã được cập nhật");
      router.replace("/feed");
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Có lỗi xảy ra";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center px-4 min-h-screen">
      <div className={styles.card}>
        <h1 className={styles.title}>Chọn tên người dùng của bạn</h1>

        <p className={styles.text}>
          Tên người dùng sẽ là định danh duy nhất của bạn trong ứng dụng.
        </p>

        <form
          className={`space-y-4 ${loading ? "opacity-70" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            type="text"
            value={username}
          />

          <button
            className={`${styles.button} flex justify-center items-center gap-2`}
            disabled={loading}
            type="submit"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Đang xử lý..." : "Tiếp tục"}
          </button>
        </form>
      </div>
    </main>
  );
}
