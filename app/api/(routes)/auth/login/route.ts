// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";
// import { generateTokens } from "@/lib/jwt";
// import cookie from "cookie";

// export async function POST(req: Request) {
//   try {
//     const { email, password, isRemember } = await req.json();

//     // 1. Find user
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // 2. Compare password
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // 3. Generate tokens
//     const payload = { id: user.id, role: user.role };
//     const { accessToken, refreshToken } = generateTokens(payload, isRemember);

//     // 4. Store refresh token (stable)
//     await prisma.refreshToken.upsert({
//       where: { id: user.id },
//       update: {
//         token: refreshToken,
//         revoked: false,
//         expiresAt: new Date(Date.now() + (isRemember ? 30*24*60*60*1000 : 24*60*60*1000)),
//       },
//       create: {
//         token: refreshToken,
//         userId: user.id,
//         expiresAt: new Date(Date.now() + (isRemember ? 30*24*60*60*1000 : 24*60*60*1000)),
//       },
//     });

//     // 5. Send cookies
//     const res = NextResponse.json(
//       { success: true, user: { email: user.email, role: user.role } },
//       { status: 200 }
//     );

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

//     res.headers.append(
//       "Set-Cookie",
//       cookie.serialize("refresh_token", refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//         maxAge: isRemember ? 30*24*60*60 : 24*60*60,
//       })
//     );

//     return res;
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Login failed" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateTokens } from "@/lib/jwt";
import cookie from "cookie";

export async function POST(req: Request) {
  try {
    const { email, password, isRemember } = await req.json();

    // 1️⃣ Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // 2️⃣ Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // 3️⃣ Generate tokens
    const payload = { id: user.id, role: user.role };
    const { accessToken, refreshToken } = generateTokens(payload, isRemember);

    // 4️⃣ Store refresh token with isRemember
    await prisma.refreshToken.upsert({
      where: { id: user.id },
      update: {
        token: refreshToken,
        revoked: false,
        expiresAt: new Date(Date.now() + (isRemember ? 30*24*60*60*1000 : 24*60*60*1000)),
        isRemember,
      },
      create: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + (isRemember ? 30*24*60*60*1000 : 24*60*60*1000)),
        isRemember,
      },
    });

    // 5️⃣ Set cookies
    const res = NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
    res.headers.append("Set-Cookie",
      cookie.serialize("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
      })
    );
    res.headers.append("Set-Cookie",
      cookie.serialize("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: isRemember ? 30*24*60*60 : 24*60*60,
      })
    );

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error}, { status: 500 });
  }
}
