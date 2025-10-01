// app/dashboard/[page]/page.tsx
import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Props {
  params: { page: string };
}

// 1️⃣ Async Page — directly handle params
export default async function Page(props: Props) {
  const { page: pageName } = await props.params; // ✅ await here

  // 2️⃣ Auth: read JWT from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) redirect("/login");

  const SECRET = process.env.ACCESS_SECRET as string;
  let role: string;
  try {
    const decoded = jwt.verify(accessToken, SECRET) as JwtPayload & {
      role: string;
    };
    role = decoded.role.toLowerCase();
  } catch {
    redirect("/login");
  }

  // 3️⃣ Dynamically import role-specific page
  try {
    const PageComponent = (await import(`../${role}/${pageName}/page`)).default;
    return <PageComponent />;
  } catch {
    notFound(); // ✅ built-in 404
  }
}
