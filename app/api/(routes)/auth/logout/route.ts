import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cookie from "cookie";

export async function POST(req: Request) {
  try {
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const refreshToken = cookies["refresh_token"];

    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { token: refreshToken },
        data: { revoked: true },
      });
    }

    const res = NextResponse.json({ success: true }, { status: 200 });

    // Clear cookies
    res.headers.append(
      "Set-Cookie",
      cookie.serialize("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      })
    );

    res.headers.append(
      "Set-Cookie",
      cookie.serialize("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      })
    );

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
