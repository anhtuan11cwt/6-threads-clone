// Copyright (c) 2026 Company Name. All rights reserved.

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
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

    const body = await req.json();
    let username = body.username;

    if (!username) {
      return NextResponse.json(
        { error: "Username là bắt buộc" },
        { status: 400 },
      );
    }

    username = username.trim().toLowerCase();

    const usernameRegex = /^[a-z0-9_]+$/;

    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: "Username chỉ được chứa chữ thường, số và dấu _" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username đã tồn tại" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      data: { username },
      where: { id: session.user.id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
