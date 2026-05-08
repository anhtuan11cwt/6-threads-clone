"use client";

export function useProfileUpdate() {
  const updateProfileData = async () => {
    try {
      // Kích hoạt cập nhật lại dữ liệu profile
      // Điều này sẽ cập nhật giao diện mà không đóng modal
      await fetch("/api/revalidate-profile", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.error("Không thể cập nhật lại profile:", error);
    }
  };

  return { updateProfileData };
}
