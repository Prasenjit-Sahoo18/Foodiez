import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MenuItem, Type } from "@/app/config";
import { prisma } from "@/lib/prisma";
import AdminHome from "./home";
import { redirect } from "next/navigation";
import { getCache, setCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

const CACHE_TTL = 30; // Fresh menu cache (30s)

const fetchTypes = async (): Promise<Type[]> => {
  const cacheKey = "typesData";
  const cachedData = getCache<Type[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const types = await prisma.type.findMany();
    setCache(cacheKey, types, CACHE_TTL);
    return types;
  } catch (error) {
    console.error("Error fetching types in admin:", error);
    return [];
  }
};

const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    return await prisma.menuItem.findMany();
  } catch (error) {
    console.error("Error while fetching menu items in admin:", error);
    return [];
  }
};

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "admin@gmail.com") {
    redirect("/dashboard");
  }

  const typesData = (await fetchTypes()) || [];
  const menuItemsData = (await fetchMenuItems()) || [];

  return <AdminHome typesData={typesData} menuItemsData={menuItemsData} />;
}
