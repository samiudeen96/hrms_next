// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import React from "react";

// interface Props {
//   params: { page: string };
// }

// // 1️⃣ Sync wrapper — safely reads params
// export default function Page({ params }: Props) {
//   return <DynamicPageAsync pageName={params.page} />;
// }

// // 2️⃣ Async component — handles cookies, JWT, and dynamic import
// async function DynamicPageAsync({ pageName }: { pageName: string }) {
//   // Get JWT from cookies
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("access_token")?.value;

//   if (!accessToken) redirect("/login");

//   const SECRET = process.env.ACCESS_SECRET as string;

//   let role: string;
//   try {
//     const decoded = jwt.verify(accessToken, SECRET) as JwtPayload & {
//       role: string;
//     };
//     role = decoded.role;
//   } catch {
//     redirect("/login");
//   }

//   // // Explicit mapping of role → page component
//   // const rolePages: Record<string, Record<string, React.ComponentType<any>>> = {
//   //   admin: {
//   //     dashboard: (await import("../admin/dashboard/page")).default,
//   //     settings: (await import("../admin/settings/page")).default,
//   //     // profile: (await import("../admin/profile/page")).default,
//   //   },
//   //   hr: {
//   //     dashboard: (await import("../hr/dashboard/page")).default,
//   //     // settings: (await import("../hr/settings/page")).default,
//   //     // profile: (await import("../hr/profile/page")).default,
//   //   },
//   //   employee: {
//   //     dashboard: (await import("../employee/dashboard/page")).default,
//   //     // settings: (await import("../employee/settings/page")).default,
//   //     // profile: (await import("../employee/profile/page")).default,
//   //   },
//   // };

//   // const PageComponent = rolePages[role.toLowerCase()]?.[pageName];

//   // if (!PageComponent) redirect("/404");

//   // // ✅ Render the page — layout wraps automatically
//   // return <PageComponent />;

//   // Auto-load page using folder convention
//   try {
//     // `role` folder + `pageName` folder + page.tsx
//     const PageComponent = (
//       await import(`../${role.toLowerCase()}/${pageName}/page`)
//     ).default;
//     return <PageComponent />;
//   } catch (err) {
//     console.error(err);
//     redirect("/404"); // fallback if page does not exist
//   }
// }

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
