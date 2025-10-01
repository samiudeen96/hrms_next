import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

export async function getAuthUser() {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) throw new Error("Unauthorized");

  try {
    return verifyAccessToken(accessToken) as { id: number; role: string };
  } catch {
    throw new Error("Unauthorized");
  }
}
 