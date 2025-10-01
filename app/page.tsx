import { redirect } from "next/navigation";

export default async function HomePage() {
  const role = "admin"
  if (!role) redirect("/login");
  redirect("/dashboard"); // role hidden in URL
}
