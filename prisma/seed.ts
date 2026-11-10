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
      description: "Burgers, Pizzas, Gourmet Fries, Pav Bhaji & Loaded Snacks",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Beverages",
      description: "Thickshakes, Iced Coffees, Smoothies & Refreshing Mocktails",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Desserts",
      description: "Molten Lava Cakes, Cheesecakes, Tiramisu & Traditional Sweets",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop",
    },
    {
      name: "Breakfast",
      description: "Fluffy Pancakes, Belgian Waffles, Omelettes, Masala Dosa & Sourdough",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Main Course",
      description: "Butter Chicken, Biryanis, Italian Pastas, Dal Makhani & Curries",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    },
    {
      name: "Appetizers",
      description: "Garlic Bread, Loaded Nachos, Paneer Tikka & Wings",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Healthy Options",
      description: "Fresh Caesar Salads, Quinoa Bowls, Smoothies & Low-Calorie Bowls",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Seafood",
      description: "Grilled Salmon, Handcrafted Sushi, Calamari & Butter Garlic Prawns",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2069&auto=format&fit=crop",
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

  // 4. Seed Delicious Menu Items (56+ mouthwatering dishes)
  const menuItems = [
    // ---------------- FAST FOOD ----------------
    {
      name: "Margherita Supreme Pizza",
      description: "Classic Italian hand-tossed pizza with San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic basil leaves.",
      price: 249,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Spicy Pepperoni Feast Pizza",
      description: "Thin crust pizza loaded with spicy cured pepperoni slices, stretchy mozzarella, and red pepper flakes.",
      price: 329,
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1780&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Farmhouse Garden Pizza",
      description: "Loaded with fresh bell peppers, red onions, juicy sweet corn, grilled mushrooms, and diced black olives.",
      price: 289,
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Gourmet Double Cheeseburger",
      description: "Twin flame-grilled juicy patties layered with melted sharp cheddar cheese, crisp lettuce, dill pickles, and secret chef sauce.",
      price: 219,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Crispy Zinger Chicken Burger",
      description: "Extra-crunchy buttermilk chicken thigh fillet seasoned with spicy herbs, garlic mayonnaise, and crunchy lettuce.",
      price: 199,
      imageUrl: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=1780&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Golden Truffle French Fries",
      description: "Hand-cut crispy Idaho potatoes tossed in aromatic white truffle oil, rosemary sea salt, and aged parmesan cheese.",
      price: 149,
      imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1935&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Cheesy Peri-Peri Loaded Fries",
      description: "Crispy fries drenched in warm cheddar cheese sauce, fiery African peri-peri spices, and pickled jalapeño rings.",
      price: 169,
      imageUrl: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=2070&auto=format&fit=crop",
      typeName: "Fast Food",
    },
    {
      name: "Mumbai Butter Pav Bhaji",
      description: "Mashed mixed vegetables simmered with rich spiced butter sauce, served piping hot with 2 golden buttered pav buns.",
      price: 179,
      imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1974&auto=format&fit=crop",
      typeName: "Fast Food",
    },

    // ---------------- BEVERAGES ----------------
    {
      name: "Belgian Chocolate Thickshake",
      description: "Rich dark cocoa ganache blended with creamy milk ice cream, topped with whipped cream and chocolate shavings.",
      price: 189,
      imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1974&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Nutella Hazelnut Overload Shake",
      description: "Decadent Nutella shake swirled with roasted crushed hazelnuts, chocolate fudge drizzle, and a wafer stick.",
      price: 209,
      imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2070&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Fresh Mint Mojito Mocktail",
      description: "Hand-muddled fresh garden mint, tangy Persian lime wedges, organic raw cane sugar, and chilled sparkling soda.",
      price: 139,
      imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1957&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Iced Caramel Macchiato",
      description: "Double shot espresso poured gently over cold whole milk, vanilla bean syrup, and buttery salted caramel drizzle.",
      price: 169,
      imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1974&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Mango Alphonso Smoothie",
      description: "Real Ratnagiri Alphonso mango pulp blended with Greek yogurt, honey, and crushed ice.",
      price: 159,
      imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1974&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "Royal Spiced Masala Chai",
      description: "Traditional Indian tea slow-brewed with crushed green cardamom, dried ginger, cloves, and whole creamy milk.",
      price: 79,
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1974&auto=format&fit=crop",
      typeName: "Beverages",
    },
    {
      name: "18-Hour Nitro Cold Brew",
      description: "Single-origin Arabica coffee beans steeped cold for 18 hours, delivering an ultra-smooth, low-acidity refreshing brew.",
      price: 159,
      imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1974&auto=format&fit=crop",
      typeName: "Beverages",
    },

    // ---------------- DESSERTS ----------------
    {
      name: "Molten Chocolate Lava Cake",
      description: "Warm Belgian dark chocolate cake that oozes a rich, velvety molten chocolate center upon the first spoon.",
      price: 199,
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "New York Strawberry Cheesecake",
      description: "Dense and creamy classic cheesecake on a golden graham cracker crust, topped with fresh strawberry compote.",
      price: 239,
      imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "Warm Saffron Gulab Jamun",
      description: "Traditional soft fried khoya dumplings soaked in fragrant cardamom and saffron rose-sugar syrup.",
      price: 129,
      imageUrl: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1958&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "Authentic Italian Tiramisu",
      description: "Espresso-dipped Savoiardi ladyfingers layered with sweet whipped mascarpone cream and dusted with raw cocoa powder.",
      price: 249,
      imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1974&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "Sizzling Fudgy Brownie with Ice Cream",
      description: "Warm walnut fudge brownie served on a cast iron sizzler platter with a scoop of vanilla ice cream and hot chocolate sauce.",
      price: 219,
      imageUrl: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?q=80&w=1974&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "Royal Kesar Pista Rasmalai",
      description: "Pillowy cottage cheese dumplings steeped in saffron-infused clotted milk garnished with pistachios and silver leaf.",
      price: 149,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop",
      typeName: "Desserts",
    },
    {
      name: "Velveteen Red Velvet Slice",
      description: "Layers of vibrant red cocoa sponge paired with tangy cream cheese frosting and white chocolate curls.",
      price: 179,
      imageUrl: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=1974&auto=format&fit=crop",
      typeName: "Desserts",
    },

    // ---------------- BREAKFAST ----------------
    {
      name: "Fluffy Buttermilk Pancake Stack",
      description: "Triple stack of golden, cloud-like pancakes served with whipped butter, pure Quebec maple syrup, and fresh berries.",
      price: 189,
      imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Crispy Belgian Waffles with Berries",
      description: "Deep honeycomb Belgian waffles topped with fresh strawberries, blueberries, vanilla cream, and powdered sugar.",
      price: 209,
      imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=1925&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Classic French Cheese Omelette",
      description: "Three farm-fresh eggs folded with melted sharp cheddar, sautéed mushrooms, chives, and toasted brioche slices.",
      price: 159,
      imageUrl: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1996&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Crispy Mysore Masala Dosa",
      description: "Golden crisp fermented rice crepe smeared with spicy red chutney, filled with potato bhaji, served with coconut chutneys and sambar.",
      price: 169,
      imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Hass Avocado Sourdough Toast",
      description: "Artisan sourdough slice toasted and spread with seasoned mashed Hass avocado, cherry tomatoes, Danish feta, and toasted pumpkin seeds.",
      price: 229,
      imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Amritsari Chole Bhature",
      description: "Two jumbo fluffy deep-fried bhature served with slow-braised pindi chole chickpeas, pickled onions, and mint chutney.",
      price: 189,
      imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1974&auto=format&fit=crop",
      typeName: "Breakfast",
    },
    {
      name: "Steamed Idli & Crispy Vada Platter",
      description: "Trio of pillowy steamed rice cakes and two crispy fried lentil donuts, served with hot aromatic vegetable sambar.",
      price: 139,
      imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop",
      typeName: "Breakfast",
    },

    // ---------------- MAIN COURSE ----------------
    {
      name: "Royal Butter Chicken (Murgh Makhani)",
      description: "Tender boneless chicken roasted in a clay tandoor, simmered in a luscious velvet tomato, butter, and cashew nut gravy.",
      price: 349,
      imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Paneer Butter Masala",
      description: "Cubes of fresh cottage cheese cooked in an aromatic, rich tomato cream sauce infused with dried fenugreek leaves.",
      price: 299,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Hyderabadi Chicken Dum Biryani",
      description: "Long-grain aged basmati rice slow-cooked on 'dum' with bone-in marinated chicken, saffron milk, fried onions, and whole spices.",
      price: 329,
      imageUrl: "https://plus.unsplash.com/premium_photo-1694141252026-3df1de888a21?q=80&w=2069&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Dal Makhani (Overnight Simmered)",
      description: "Black lentils and kidney beans slow-cooked overnight with white butter, fresh cream, and mild Punjabi spices.",
      price: 259,
      imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Spaghetti Alla Carbonara",
      description: "Imported Italian durum wheat spaghetti tossed with crispy pancetta, whisked egg yolks, freshly cracked black pepper, and Pecorino Romano.",
      price: 299,
      imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Creamy Fettuccine Alfredo",
      description: "Al dente fettuccine pasta smothered in a rich emulsion of butter, heavy cream, garlic, and freshly grated aged Parmigiano-Reggiano.",
      price: 279,
      imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=2070&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Kadhai Paneer Special",
      description: "Cottage cheese and crisp bell peppers stir-fried in a traditional iron wok with fresh roasted ground coriander and dry red chilies.",
      price: 289,
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop",
      typeName: "Main Course",
    },
    {
      name: "Kashmiri Mutton Rogan Josh",
      description: "Slow-braised tender lamb pieces stewed in an authentic gravy spiced with Kashmiri dry chilies, fennel powder, and dried ginger.",
      price: 399,
      imageUrl: "https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=2080&auto=format&fit=crop",
      typeName: "Main Course",
    },

    // ---------------- APPETIZERS ----------------
    {
      name: "Artisan Cheesy Garlic Bread",
      description: "French crusty baguette brushed with rich garlic parsley butter and melted golden mozzarella.",
      price: 159,
      imageUrl: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?q=80&w=1935&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Fiesta Loaded Mexican Nachos",
      description: "Crispy stone-ground corn tortilla chips piled high with warm queso cheese sauce, fresh pico de gallo, guacamole, and sour cream.",
      price: 219,
      imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=1935&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Tandoori Paneer Tikka Skewers",
      description: "Cubes of creamy cottage cheese marinated in hung curd and tandoori spices, char-grilled with capsicum and onion petals.",
      price: 249,
      imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2034&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Crispy Veg Spring Rolls",
      description: "Delicate pastry sheets hand-rolled with shredded vegetables and glass noodles, fried crisp and served with sweet plum dip.",
      price: 149,
      imageUrl: "https://images.unsplash.com/photo-1606525437679-037aca74a3e9?q=80&w=2070&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Golden Stretchy Mozzarella Sticks",
      description: "Thick mozzarella batons coated in herb-seasoned Italian breadcrumbs, fried molten and served with warm marinara dip.",
      price: 199,
      imageUrl: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?q=80&w=1974&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Fiery Peri-Peri Chicken Wings",
      description: "Crispy double-fried chicken wings glazed in our signature hot African peri-peri chili glaze with cooling ranch dip.",
      price: 249,
      imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1980&auto=format&fit=crop",
      typeName: "Appetizers",
    },
    {
      name: "Crispy Sweet Corn Salt & Pepper",
      description: "Batter-fried sweet golden corn kernels wok-tossed with scallions, fresh garlic, crushed black peppercorns, and chilies.",
      price: 169,
      imageUrl: "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1980&auto=format&fit=crop",
      typeName: "Appetizers",
    },

    // ---------------- HEALTHY OPTIONS ----------------
    {
      name: "Classic Chicken Caesar Salad",
      description: "Crisp romaine hearts, shaved aged Parmigiano, grilled chicken breast strips, and sourdough croutons tossed in house Caesar dressing.",
      price: 229,
      imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop",
      typeName: "Healthy Options",
    },
    {
      name: "Greek Mediterranean Salad Bowl",
      description: "Ripe vine tomatoes, Persian cucumbers, Kalamata black olives, sliced red onions, and creamy Greek feta with extra virgin olive oil.",
      price: 199,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084&auto=format&fit=crop",
      typeName: "Healthy Options",
    },
    {
      name: "Quinoa & Avocado Superfood Bowl",
      description: "Fluffy tri-color organic quinoa, baby spinach, ripe avocado slices, edamame beans, and roasted almonds with lemon herb dressing.",
      price: 249,
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
      typeName: "Healthy Options",
    },
    {
      name: "Detox Green Immunity Smoothie Bowl",
      description: "Blended organic baby spinach, green apples, kiwi, and coconut water topped with chia seeds, flax seeds, and sliced banana.",
      price: 189,
      imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2070&auto=format&fit=crop",
      typeName: "Healthy Options",
    },
    {
      name: "Grilled Chicken & Citrus Salad",
      description: "Char-grilled lean chicken breast over mixed mesclun greens, orange segments, walnuts, and honey-mustard vinaigrette.",
      price: 239,
      imageUrl: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?q=80&w=1974&auto=format&fit=crop",
      typeName: "Healthy Options",
    },
    {
      name: "Roasted Beetroot & Goat Cheese Bowl",
      description: "Sweet roasted beet wedges, soft French goat cheese, arugula greens, and candied walnuts dressed with aged balsamic reduction.",
      price: 219,
      imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop",
      typeName: "Healthy Options",
    },

    // ---------------- SEAFOOD ----------------
    {
      name: "Pan-Seared Norwegian Salmon",
      description: "Fresh Atlantic salmon steak seared golden in extra virgin olive oil, served over buttered asparagus with lemon-dill cream sauce.",
      price: 499,
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop",
      typeName: "Seafood",
    },
    {
      name: "Handcrafted Tokyo Sushi Platter",
      description: "Freshly rolled selection of fresh salmon nigiri, spicy tuna maki, and avocado California rolls with wasabi and pickled ginger.",
      price: 449,
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
      typeName: "Seafood",
    },
    {
      name: "Crispy Golden Calamari Rings",
      description: "Tender squid rings dusted in seasoned cornmeal flour, flash-fried crisp, and served with house garlic lemon aioli dip.",
      price: 279,
      imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1974&auto=format&fit=crop",
      typeName: "Seafood",
    },
    {
      name: "Garlic Butter Jumbo Tiger Prawns",
      description: "Succulent sea tiger prawns sautéed in churned butter, roasted garlic flakes, fresh parsley, and a splash of white wine.",
      price: 429,
      imageUrl: "https://images.unsplash.com/photo-1559742811-82286364ceaf?q=80&w=1974&auto=format&fit=crop",
      typeName: "Seafood",
    },
    {
      name: "British Battered Fish & Chips",
      description: "Flaky North Sea cod fillet dipped in crispy golden beer batter, served with seasoned potato chips and homemade tartar sauce.",
      price: 329,
      imageUrl: "https://images.unsplash.com/photo-1579208575657-c595a053b9b7?q=80&w=2070&auto=format&fit=crop",
      typeName: "Seafood",
    },
    {
      name: "Coastal Spiced Prawn Dum Biryani",
      description: "Juicy marinated tiger prawns layered with aromatic basmati rice, caramelized onions, fresh mint, and coastal spices.",
      price: 379,
      imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop",
      typeName: "Seafood",
    },
    {
      name: "Baja Style Crispy Fish Tacos",
      description: "Trio of warm corn tortillas stuffed with crispy battered fish fillets, shredded purple cabbage slaw, pico de gallo, and chipotle crema.",
      price: 269,
      imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=2070&auto=format&fit=crop",
      typeName: "Seafood",
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }
  console.log(`Seeded ${menuItems.length} menu items successfully.`);

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
