import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Không được phép" }, { status: 401 });
    }

    const formData = await req.formData();
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    if (!content?.trim() && !imageFile) {
      return NextResponse.json(
        { error: "Nội dung hoặc hình ảnh bài viết là bắt buộc" },
        { status: 400 },
      );
    }

    let imageUrl = "";
    let imagePublicId = "";

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "threads-clone/posts",
      });

      imageUrl = uploadResponse.secure_url;
      imagePublicId = uploadResponse.public_id;
    }

    const post = await prisma.post.create({
      data: {
        authorId: session.user.id,
        content: content || null,
        image: imageUrl || null,
        imagePublicId: imagePublicId || null,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[CREATE_POST_ERROR]", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
