import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Cập nhật lại trang profile để hiển thị giao diện mới
    revalidatePath("/profile");
    revalidatePath("/"); // Cập nhật lại trang chủ nếu thông tin profile hiển thị ở đó

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi cập nhật lại trang:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật lại trang profile" },
      { status: 500 },
    );
  }
}
