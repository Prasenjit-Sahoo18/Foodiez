import { getServerSession } from "next-auth";
import Dashboard2 from "./Dashboard";
import { authOptions } from "@/lib/auth";
import { MenuItem, Type } from "@/app/config";
import { prisma } from "@/lib/prisma";
import { getCache, setCache } from "@/lib/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CACHE_TTL = 60 * 60; // Cache for 1 hour

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
    console.error("Error fetching types from database:", error);
    return [];
  }
};

const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const cacheKey = "menuItemsData";
  const cachedData = getCache<MenuItem[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const items = await prisma.menuItem.findMany();
    setCache(cacheKey, items, CACHE_TTL);
    return items;
  } catch (error) {
    console.error("Error fetching menu items from database:", error);
    return [];
  }
};

export default async function DashboardPage() {
  const typesData = (await fetchTypes()) || [];
  const menuItemsData = (await fetchMenuItems()) || [];

  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("Session error in dashboard:", e);
  }

  if (!session) {
    return <Dashboard2 typesData={typesData} menuItemsData={menuItemsData} />;
  }

  if (session.user.email === "admin@gmail.com") {
    redirect("/admin/home");
  }

  return (
    <Dashboard2
      session={session}
      typesData={typesData}
      menuItemsData={menuItemsData}
    />
  );
}
