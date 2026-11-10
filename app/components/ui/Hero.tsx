"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CalendarIcon, ChefHatIcon, HygieneIcon, RightArrowIcon, UtensilsIcon } from "./Icons";
import Link from "next/link";
import RevealText from "./RevealText";

export default function Hero() {
    const router = useRouter();
    const session = useSession();
    const user = session.data?.user;
    const [showHygieneModal, setShowHygieneModal] = useState<boolean>(false);

    const handleBrowseMenu = () => {
        const el = document.getElementById("menu-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push("/dashboard#menu-section");
        }
    };

    const handleBookTable = () => {
        router.push("/book");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex w-full md:h-[750px] h-[680px] bg-[url('/new-hero-7.jpg')] bg-cover bg-center font-dmsans before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-2xs before:z-0 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            <div className="relative w-full z-10 flex flex-col md:gap-20 gap-12 justify-center items-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center w-full items-center md:gap-6 gap-3 ">
                    <div className="bg-amber-950/70 md:px-5 px-3 md:py-2 py-1 rounded-full border-1 border-amber-700/80 text-[10px] md:text-lg text-amber-white md:font-medium flex md:gap-2 gap-1 justify-center items-center">
                        <ChefHatIcon classname="md:h-7 h-3" />
                        <h3>Experience Fine Dining</h3>
                    </div>
                    <div className="flex w-full lg:gap-5 md:gap-4 gap-2 md:mt-2 lg:mt-0 font-semibold lg:text-7xl md:text-6xl text-3xl justify-center font-fredoka px-4">
                        <h1 className="flex lg:gap-5 md:gap-4 gap-2"><RevealText>Welcome</RevealText><RevealText>to</RevealText></h1>
                        <h1 className="text-amber-500"><RevealText>Foodiez</RevealText></h1>
                    </div>

                    <h2 className="lg:text-[20px] px-3 md:text-lg text-xs text-gray-300 md:max-w-160 max-w-120 text-center">
                        Experience exceptional dining with our curated menu and seamless table booking system. Every dish tells a story.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex md:gap-16 gap-8">
                    <button
                        onClick={handleBookTable}
                        className="relative z-10 md:py-1 md:h-12 flex px-4 rounded-full hover:translate-x-3 bg-gradient-to-r from-amber-500 to-amber-900/50 hover:from-amber-400 hover:to-amber-600/60 md:text-lg text-xs font-semibold cursor-pointer ml-2 transition-all transform inset 2s hover:border-0 justify-center items-center md:w-52 gap-2 hover:gap-3 duration:800">
                        Book A Table <RightArrowIcon classname="hover:translate-x-5 md:h-5 h-4" />
                        <span className="absolute z-0 inset-0 border-2 border-amber-500/40 hover:border-transparent rounded-full opacity-80 transition-all duration-500 hover:opacity-100 translate-x-2 hover:scale-y-100 hover:-translate-x-0 scale-y-120"></span>
                    </button>

                    <button
                        onClick={handleBrowseMenu}
                        className="md:px-8 px-5 md:h-12 py-2 md:text-lg text-xs bg-slate-800/80 hover:bg-slate-700/70 cursor-pointer hover:scale-103 transform transition border-1 border-slate-500 text-white rounded-full">
                        View Menu
                    </button>
                </motion.div>

                {/* 3 Interactive Cards */}
                <div className="flex flex-col md:flex-row w-full items-center lg:justify-around gap-6 justify-center md:mt-6 mt-2 px-4">
                    {/* 1. Browse Menu Card */}
                    <motion.div
                        onClick={handleBrowseMenu}
                        initial={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        role="button"
                        tabIndex={0}
                        className="flex flex-col justify-between lg:w-108 gap-4 md:w-96 w-80 lg:h-44 md:h-36 border border-gray-700 bg-slate-900/90 backdrop-blur-md lg:px-8 lg:py-6 px-4 py-4 rounded-xl hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer transition-all group">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 font-semibold items-center text-white group-hover:text-amber-400 transition-colors">
                                <UtensilsIcon classname="h-6 lg:h-8" />
                                <h3 className="lg:text-2xl md:text-xl">Browse Menu</h3>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full group-hover:bg-amber-500 group-hover:text-black transition-all">
                                Explore &rarr;
                            </span>
                        </div>
                        <h4 className="lg:text-base md:text-sm text-xs text-gray-400 group-hover:text-gray-300">
                            Discover freshly prepared dishes, combos, pizzas, burgers and gourmet beverages.
                        </h4>
                    </motion.div>

                    {/* 2. Book a Table Card */}
                    <motion.div
                        onClick={handleBookTable}
                        initial={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        role="button"
                        tabIndex={0}
                        className="flex flex-col justify-between lg:w-108 gap-4 md:w-96 w-80 lg:h-44 md:h-36 border border-gray-700 bg-slate-900/90 backdrop-blur-md lg:px-8 lg:py-6 px-4 py-4 rounded-xl hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer transition-all group">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 font-semibold items-center text-white group-hover:text-amber-400 transition-colors">
                                <CalendarIcon classname="h-6 lg:h-8" />
                                <h3 className="lg:text-2xl md:text-xl">Book a Table</h3>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full group-hover:bg-amber-500 group-hover:text-black transition-all">
                                Reserve &rarr;
                            </span>
                        </div>
                        <h4 className="lg:text-base md:text-sm text-xs text-gray-400 group-hover:text-gray-300">
                            Reserve your favorite spot with instant confirmation for romantic dining or family gatherings.
                        </h4>
                    </motion.div>

                    {/* 3. Hygiene & Safety Card */}
                    <motion.div
                        onClick={() => setShowHygieneModal(true)}
                        initial={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        role="button"
                        tabIndex={0}
                        className="flex flex-col justify-between lg:w-108 gap-4 md:w-96 w-80 lg:h-44 md:h-36 border border-gray-700 bg-slate-900/90 backdrop-blur-md lg:px-8 lg:py-6 px-4 py-4 rounded-xl hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer transition-all group">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 font-semibold items-center text-white group-hover:text-amber-400 transition-colors">
                                <HygieneIcon classname="h-7 lg:h-9" />
                                <h3 className="lg:text-2xl md:text-xl">Hygiene & Safety</h3>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                Verified &#10003;
                            </span>
                        </div>
                        <h4 className="lg:text-base md:text-sm text-xs text-gray-400 group-hover:text-gray-300">
                            100% sanitized kitchens, temperature checks, contactless prep, and tamper-proof sealed packaging.
                        </h4>
                    </motion.div>
                </div>
            </div>

            {/* Hygiene & Safety Interactive Modal */}
            <AnimatePresence>
                {showHygieneModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowHygieneModal(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl text-white relative overflow-hidden"
                        >
                            {/* Decorative Top Accent */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500" />

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                                        <HygieneIcon classname="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold font-fredoka text-amber-400">
                                            Hygiene &amp; Safety Protocols
                                        </h3>
                                        <p className="text-xs text-gray-400">5-Star certified kitchen and food handling standards</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowHygieneModal(false)}
                                    className="text-gray-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-4 text-sm text-gray-300">
                                <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                    <span className="text-2xl">&#129532;</span>
                                    <div>
                                        <h4 className="font-semibold text-white">100% Sanitized Kitchens</h4>
                                        <p className="text-xs text-gray-400">Hospital-grade sterilization of all preparation counters, cookware, and equipment every 3 hours.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                    <span className="text-2xl">&#127777;&#65039;</span>
                                    <div>
                                        <h4 className="font-semibold text-white">Daily Staff Health Screenings</h4>
                                        <p className="text-xs text-gray-400">Mandatory daily temperature checks, health screenings, and mandatory protective hairnets and gloves for all chefs.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                    <span className="text-2xl">&#129367;</span>
                                    <div>
                                        <h4 className="font-semibold text-white">Triple-Washed Farm-Fresh Produce</h4>
                                        <p className="text-xs text-gray-400">Fresh organic vegetables and meats triple-washed and sanitized with food-safe ozone purification.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                                    <span className="text-2xl">&#128230;</span>
                                    <div>
                                        <h4 className="font-semibold text-white">Tamper-Proof Contactless Packaging</h4>
                                        <p className="text-xs text-gray-400">Every order is sealed with tamper-evident security labels to guarantee zero contact between our oven and your hands.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowHygieneModal(false);
                                        handleBrowseMenu();
                                    }}
                                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer text-center"
                                >
                                    Order Clean Food &rarr;
                                </button>
                                <button
                                    onClick={() => setShowHygieneModal(false)}
                                    className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-medium rounded-xl text-sm transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
