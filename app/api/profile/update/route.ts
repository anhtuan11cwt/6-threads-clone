import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/services/cloudinary";

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Chưa được xác thực" },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as File | null;

    const normalizedUsername = username?.trim().toLowerCase();

    if (!normalizedUsername) {
      return NextResponse.json(
        { error: "Tên người dùng là bắt buộc" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        NOT: {
          id: session.user.id,
        },
        username: normalizedUsername,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Tên người dùng đã tồn tại" },
        { status: 400 },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }

    let imageUrl = currentUser.image;
    let imagePublicId = currentUser.imagePublicId;

    if (image && image.size > 0) {
      // Delete old image if exists
      if (currentUser.imagePublicId) {
        await deleteFromCloudinary(currentUser.imagePublicId);
      }

      // Upload new image
      const uploadedImage = await uploadToCloudinary(image);
      imageUrl = uploadedImage.secure_url;
      imagePublicId = uploadedImage.public_id;
    }

    const updatedUser = await prisma.user.update({
      data: {
        bio,
        image: imageUrl,
        imagePublicId,
        name,
        username: normalizedUsername,
      },
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[LỖI_CẬP_NHẬT_HỒ_SƠ]", error);

    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
