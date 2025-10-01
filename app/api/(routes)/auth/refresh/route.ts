import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTokens, verifyRefreshToken } from "@/lib/jwt";
import cookie from "cookie";

export async function POST(req: Request) {
  try {
    // 1. Parse cookies
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const refreshToken = cookies["refresh_token"];
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // 2. Verify refresh token
    try {
      verifyRefreshToken(refreshToken);
    } catch {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    // 3. Check DB
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!dbToken || !dbToken.user || dbToken.revoked) {
      return NextResponse.json({ error: "Token not valid" }, { status: 401 });
    }

    // 4. Generate new access token
    const { accessToken } = generateTokens(
      { id: dbToken.user.id, role: dbToken.user.role },
      dbToken.isRemember
    );

    // 5. Return response with new access token cookie
    const res = NextResponse.json({ success: true });
    res.headers.append(
      "Set-Cookie",
      cookie.serialize("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      })
    );

    return res;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
