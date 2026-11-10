"use client";

import Hero from "@/app/components/ui/Hero";
import TypeCard from "@/app/components/ui/TypeCard";
import { useEffect, useState, useRef } from "react";
import { addItemToCart, MenuItem, Type } from "@/app/config";
import MenuCard from "@/app/components/ui/MenuCard";
import { Session } from "next-auth";
import { motion, useAnimation, useInView } from "framer-motion";
import { useMenuItemsStore } from "@/store";
import Testimonials from "@/app/components/ui/testimonials";
import TypecardMarquee from "@/app/components/ui/TypecardMarquee";
import { SearchIcon } from "@/app/components/ui/Icons";
import toast from "react-hot-toast";

type Dashboard2Props = {
  session?: Session;
  typesData: Type[];
  menuItemsData: MenuItem[];
};

export default function Dashboard2({
  session,
  typesData,
  menuItemsData,
}: Dashboard2Props) {
  const user = session?.user;

  const [currentType, setCurrentType] = useState<null | string>(null);

  const { menuItems, setItems } = useMenuItemsStore((state) => state);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]); // Added mainControls to the dependency array

  useEffect(() => {
    if (currentType == null) {
      setItems(menuItemsData);
    } else {
      let items: MenuItem[] = [];
      menuItemsData.map((item) => {
        if (item.typeName == currentType) {
          items = [...items, item];
        }
      });
      setItems(items);
    }
  }, [currentType, menuItemsData, setItems]); // Added menuItemsData and setItems to the dependency array

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  //   }
  // };


  function browseMenu(searchItem: string) {
    searchItem = searchItem.trim();
    let foundItems;
    if (searchItem == "") {
      if (currentType == null) {
        foundItems = menuItemsData
      } else {
        foundItems = menuItemsData.filter(item => {
          return item.typeName === currentType;
        })
      }
    }
    else {
      foundItems = menuItemsData.filter(item => {
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      })
    }
    setItems(foundItems);
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };


  const handleSelectCategory = (name: string | null) => {
    setCurrentType(name);
    const el = document.getElementById("menu-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full box-border flex flex-col lg:gap-40 md:gap-32 sm:gap-28 gap-20 m-0 p-0 overflow-hidden"
    >

      {/* Hero Section */}
      <Hero />

      {/* TypesCard Section */}
      {/* <TypecardMarquee scrollContainerRef={scrollContainerRef} setCurrentType={setCurrentType} typesData={typesData} /> */}

      <TypecardMarquee
        scrollContainerRef={marqueeRef}
        typesData={typesData}
        setCurrentType={setCurrentType}
      />

      <div className="md:hidden flex flex-col gap-10 ">
        <h1 className="lg:text-5xl sm:text-4xl text-3xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          Explore the varieties
        </h1>

        <div className="md:hidden relative flex justify-center items-center">
          <button
            className="hidden md:absolute left-4 top-1/3.5 z-10 transform -translate-y-1/2 bg-gray-300 font-bold text-xl text-black p-2 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            &lt;
          </button>
          <motion.div
            ref={scrollContainerRef}
            className=" flex md:gap-8 gap-4 justify-start overflow-x-auto no-scrollbar overflow-hidden py-8 md:px-16 px-4 md:mr-16 mr-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {typesData &&
              typesData.map((type) => (
                <motion.div key={type.id} whileHover={{ scale: 1.02 }}>
                  <TypeCard
                    onClick={() => handleSelectCategory(type.name)}
                    img={type.image}
                    title={type.name}
                    description={type.description}
                  />
                </motion.div>
              ))}
            <motion.div whileHover={{ scale: 1.02 }}>
              <TypeCard
                onClick={() => handleSelectCategory(null)}
                key={0}
                img={"/all-items-image.jpg"}
                title={"All Items"}
                description={"Burgers, Pizzas, Paneer, Drinks, and more"}
              />
            </motion.div>
          </motion.div>
          <button
            className="hidden md:absolute right-4 text-xl top-1/3.5 font-bold transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full cursor-pointer"
            onClick={scrollRight}
          >
            &gt;
          </button>
        </div>

      </div>
      <motion.div
        id="menu-section"
        className="Menu w-full flex flex-col px-4 md:px-8 lg:gap-10 md:gap-8 gap-6 justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-2">
          <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-white font-fredoka">
            {currentType == null ? "Our Full Menu" : `${currentType}`}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {currentType == null
              ? `Explore all ${menuItems.length} freshly prepared gourmet dishes`
              : `Showing delicious options in ${currentType}`}
          </p>
          {currentType !== null && (
            <button
              onClick={() => handleSelectCategory(null)}
              className="mt-2 text-xs md:text-sm px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 transition-colors cursor-pointer"
            >
              &larr; View All Categories
            </button>
          )}
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:max-w-xl md:max-w-2xl mx-auto">
          <SearchIcon classname="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 md:h-5 h-4" />
          <input
            type="text"
            placeholder="Search our 55+ dishes by name (e.g. Pizza, Biryani, Pasta, Burger...)"
            className="border border-slate-700 bg-slate-900/90 text-white md:p-3.5 p-2.5 md:pl-13 pl-12 w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-xl text-sm md:text-base"
            onChange={(e) => browseMenu(e.target.value)}
          />
        </div>

        {menuItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 space-y-3">
            <span className="text-4xl">&#128532;</span>
            <div className="text-lg">No dishes found matching your search</div>
            <button
              onClick={() => handleSelectCategory(null)}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-black transition-all cursor-pointer"
            >
              Clear filter and show all items
            </button>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl py-6">
            {menuItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                className="w-full flex"
              >
                <MenuCard
                  menuItem={item}
                  onClick={() => {
                    if (!user || !session) {
                      toast.error("Please login to add items to cart.", {
                        duration: 1200,
                      });
                    } else {
                      toast.promise(addItemToCart(item.id, user), {
                        loading: "Adding to cart...",
                        success: <b>Added to cart!</b>,
                        error: <b>Could not add item.</b>,
                      }, {
                        success: {
                          duration: 700
                        }
                      });
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Testimonials Section */}
      <Testimonials />
    </motion.div>
  );
}