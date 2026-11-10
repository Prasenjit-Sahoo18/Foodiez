import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding for Foodiez...");

  // 1. Seed Users (Admin & Demo Customer)
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const hashedUserPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {
      password: hashedAdminPassword,
      username: "Admin",
      name: "Foodiez Admin",
    },
    create: {
      email: "admin@gmail.com",
      username: "Admin",
      name: "Foodiez Admin",
      password: hashedAdminPassword,
    },
  });
  console.log("Admin user ready: admin@gmail.com / admin123");

  const demoUser = await prisma.user.upsert({
    where: { email: "user@foodiez.com" },
    update: {
      password: hashedUserPassword,
      username: "JohnFoodie",
      name: "John Foodie",
    },
    create: {
      email: "user@foodiez.com",
      username: "JohnFoodie",
      name: "John Foodie",
      password: hashedUserPassword,
    },
  });
  console.log("Demo customer ready: user@foodiez.com / user123");

  // 2. Clear old menu data safely
  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.type.deleteMany();
  } catch (e) {
    console.log("Notice during cleanup:", e);
  }

  // 3. Seed Food Categories
  const categories = [
    {
      name: "Fast Food",
      description: "Burgers, Pizzas, Fries, Sandwiches",
      image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
    },
    {
      name: "Beverages",
      description: "Soft Drinks, Juices, Shakes, Coffee, Tea",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    },
    {
      name: "Desserts",
      description: "Ice Cream, Cakes, Pastries, Puddings",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    },
    {
      name: "Breakfast",
      description: "Pancakes, Omelettes, Waffles, Cereal",
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    },
    {
      name: "Main Course",
      description: "Pasta, Rice Bowls, Curries, Steaks",
      image: "https://images.pexels.com/photos/8500/food-dinner-pasta-spaghetti-8500.jpg",
    },
    {
      name: "Appetizers",
      description: "Nachos, Spring Rolls, Mozzarella Sticks",
      image: "https://images.pexels.com/photos/1647164/pexels-photo-1647164.jpeg",
    },
    {
      name: "Healthy Options",
      description: "Salads, Smoothies, Wraps, Low-Calorie Meals",
      image: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg",
    },
    {
      name: "Seafood",
      description: "Grilled Fish, Sushi, Shrimp, Lobster",
      image: "https://images.pexels.com/photos/3298689/pexels-photo-3298689.jpeg",
    },
  ];

  for (const cat of categories) {
    await prisma.type.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat,
    });
  }
  console.log(`Seeded ${categories.length} categories.`);

  // 4. Seed Delicious Menu Items
  const menuItems = [
    {
      name: "Margherita Pizza",
      description: "Classic Italian pizza with rich tomato sauce, fresh mozzarella, and aromatic basil leaves.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Cheeseburger",
      description: "Flame-grilled juicy beef patty with cheddar cheese, crisp lettuce, tomato, and secret sauce.",
      price: 120,
      imageUrl: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      typeName: "Fast Food",
    },
    {
      name: "French Fries",
      description: "Golden crispy fries seasoned with sea salt and served with tangy ketchup.",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2070&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Pepperoni Pizza",
      description: "Thin crust pizza topped with spicy Italian pepperoni, mozzarella cheese, and oregano.",
      price: 180,
      imageUrl: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
      typeName: "Fast Food",
    },
    {
      name: "Pav Bhaji",
      description: "Spicy buttery mashed mixed vegetables served piping hot with toasted buttered pav buns.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1974&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Cappuccino",
      description: "Rich Italian espresso topped with silky textured steamed milk foam.",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1533776992670-a72f4c28235e?q=80&w=1965&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Mango Smoothie",
      description: "Thick tropical smoothie prepared from ripe mangoes, Greek yogurt, and wildflower honey.",
      price: 110,
      imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      typeName: "Beverages",
    },
    {
      name: "Lemon Iced Tea",
      description: "Brewed black tea infused with fresh citrus lemon and chilled with ice cubes.",
      price: 70,
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Punjabi Sweet Lassi",
      description: "Traditional refreshing yogurt drink blended smooth with cardamom and saffron.",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1692620609860-be6717812f71?q=80&w=1974&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Chocolate Lava Cake",
      description: "Decadent warm dark chocolate cake with a molten chocolate center and powdered sugar.",
      price: 200,
      imageUrl: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
      typeName: "Desserts",
    },
    {
      name: "Strawberry Cheesecake",
      description: "Velvety New York style cheesecake with graham crust and sweet strawberry coulis.",
      price: 220,
      imageUrl: "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg",
      typeName: "Desserts",
    },
    {
      name: "Gulab Jamun",
      description: "Classic golden fried milk dumplings steeped in fragrant rose and cardamom syrup.",
      price: 130,
      imageUrl: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1958&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "Fluffy Buttermilk Pancakes",
      description: "Stack of golden fluffy pancakes drizzled with pure maple syrup and whipped butter.",
      price: 140,
      imageUrl: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      typeName: "Breakfast",
    },
    {
      name: "Cheese & Herb Omelette",
      description: "Three-egg French omelette folded with melting cheddar, cherry tomatoes, and fine herbs.",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1996&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Crispy Masala Dosa",
      description: "Crispy golden fermented rice crepe rolled around spiced turmeric potato mash.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Butter Chicken",
      description: "Tender tandoori chicken simmered in a luscious velvet tomato cream sauce.",
      price: 280,
      imageUrl: "https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=2080&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Al dente spaghetti tossed with crispy pancetta, egg yolks, and aged Pecorino Romano.",
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Chicken Dum Biryani",
      description: "Fragrant saffron basmati rice layered with slow-cooked marinated chicken and fried onions.",
      price: 250,
      imageUrl: "https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?q=80&w=2069&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Herb Garlic Bread",
      description: "Artisan baguette toasted with compound garlic parsley butter and melted mozzarella.",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=1935&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Crispy Spring Rolls",
      description: "Golden wrapped vegetable rolls served hot with a sweet and spicy dipping sauce.",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1606525437679-037aca74a3e9?q=80&w=2070&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Tandoori Paneer Tikka",
      description: "Skewered cottage cheese cubes char-grilled in a clay oven with bell peppers.",
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Classic Caesar Salad",
      description: "Crisp romaine hearts tossed in homemade creamy Caesar dressing with garlic croutons.",
      price: 130,
      imageUrl: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1958&auto=format&fit=crop",
      typeName: "Healthy Options",
    },
    {
      name: "Grilled Norwegian Salmon",
      description: "Atlantic salmon steak pan-seared with herbs and served with lemon dill butter sauce.",
      price: 350,
      imageUrl: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg",
      typeName: "Seafood",
    },
    {
      name: "Handcrafted Sushi Platter",
      description: "Premium selection of fresh salmon nigiri, tuna rolls, and avocado California maki.",
      price: 300,
      imageUrl: "https://images.unsplash.com/photo-1726824863833-e88146cf0a72?q=80&w=2069&auto=format&fit=crop",
      typeName: "Seafood",
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }
  console.log(`Seeded ${menuItems.length} menu items.`);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
