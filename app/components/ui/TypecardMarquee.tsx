import React, { Ref } from 'react'
import { motion } from "framer-motion"
import TypeCard from './TypeCard'
import { Type } from '@/app/config'

type TypecardMarqueeProps = {
    scrollContainerRef: Ref<HTMLDivElement>,
    typesData: Type[],
    setCurrentType: (name: string | null) => void
}

export default function TypecardMarquee({ scrollContainerRef, typesData, setCurrentType }: TypecardMarqueeProps) {
    const handleSelectCategory = (name: string | null) => {
        setCurrentType(name);
        const el = document.getElementById("menu-section");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="md:flex flex-col md:gap-16 gap-8 hidden">
            <h1 className="lg:text-5xl sm:text-4xl text-3xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-white via-cyan-100">
                Explore the varieties
            </h1>
            <div className="relative flex overflow-x-hidden md:gap-8 gap-6 py-10 MyGradient">
                <motion.div
                    ref={scrollContainerRef}
                    className="flex flex-shrink-0 md:gap-8 gap-6"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
                <motion.div
                    ref={scrollContainerRef}
                    className="flex flex-shrink-0 md:gap-8 gap-6"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
            </div>
        </div>
    )
}
