import { styles } from "@/lib/auth-styles";

export default function SetupUsernamePage() {
  return (
    <main className="flex justify-center items-center px-4 min-h-screen">
      <div className={styles.card}>
        <h1 className={styles.title}>Chọn tên người dùng của bạn</h1>

        <p className={styles.text}>
          Tên người dùng sẽ là định danh duy nhất của bạn trong ứng dụng.
        </p>

        <form className="space-y-4">
          <input className={styles.input} placeholder="@username" type="text" />

          <button className={styles.button} type="submit">
            Tiếp tục
          </button>
        </form>
      </div>
    </main>
  );
}
