import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session fetch error:", error);
  }

  if (session?.user?.email === "admin@gmail.com") {
    redirect("/admin/home");
  }

  redirect("/dashboard");
}
