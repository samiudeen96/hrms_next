// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { generateTokens, verifyRefreshToken } from "@/lib/jwt";
// import cookie from "cookie";

// export async function POST(req: Request) {
//   try {
//     // 1. Parse cookies
//     const cookies = cookie.parse(req.headers.get("cookie") || "");
//     const refreshToken = cookies["refresh_token"];

//     if (!refreshToken) {
//       return NextResponse.json({ error: "No refresh token" }, { status: 401 });
//     }

//     // 2. Verify refresh token
//     let payload: any;
//     try {
//       payload = verifyRefreshToken(refreshToken);
//     } catch {
//       return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
//     }

//     // 3. Check DB
//     const dbToken = await prisma.refreshToken.findUnique({
//       where: { token: refreshToken },
//       include: { user: true },
//     });

//     if (!dbToken || !dbToken.user || dbToken.revoked) {
//       return NextResponse.json({ error: "Token not valid" }, { status: 401 });
//     }

//     // 4. Generate new access token
//     const { accessToken } = generateTokens(
//       { id: dbToken.user.id, role: dbToken.user.role },
//       dbToken.user.isRemember
//     );

//     // 5. Set new access token cookie
//     const res = NextResponse.json({ success: true }, { status: 200 });

//     res.headers.append(
//       "Set-Cookie",
//       cookie.serialize("access_token", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//         maxAge: 15 * 60,
//       })
//     );

//     return res;
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTokens, verifyRefreshToken } from "@/lib/jwt";
import cookie from "cookie";

export async function POST(req: Request) {
  try {
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const refreshToken = cookies["refresh_token"];
    if (!refreshToken) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

    // Verify refresh token
    let payload;
    try { payload = verifyRefreshToken(refreshToken); } 
    catch { return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 }); }

    const dbToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    if (!dbToken || !dbToken.user || dbToken.revoked) {
      return NextResponse.json({ error: "Token not valid" }, { status: 401 });
    }

    const { accessToken } = generateTokens(
      { id: dbToken.user.id, role: dbToken.user.role },
      dbToken.isRemember
    );

    const res = NextResponse.json({ success: true });
    res.headers.append("Set-Cookie",
      cookie.serialize("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
      })
    );

    return res;
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
