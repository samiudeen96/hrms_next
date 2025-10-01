import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) {
      return NextResponse.json(
        { error: "User already Exist" },
        { status: 401 }
      );
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPwd,
        role,
      },
    });

    return NextResponse.json({ message: "Successfully Registered" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
