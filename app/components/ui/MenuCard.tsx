import { MenuItem } from "@/app/config";
import AddIcon from "./AddIcon";
import { CartIcon } from "./Icons";
import { motion } from "framer-motion";

export default function MenuCard({ menuItem, onClick }: { menuItem: MenuItem; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col justify-between bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10 transition-all sm:h-[360px] w-full"
    >
      {/* Food Image & Badge */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-800">
        <img
          src={menuItem.imageUrl || "/all-items-image.jpg"}
          alt={menuItem.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-108"
        />
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
          <span className="text-[11px] font-semibold text-amber-300">
            {menuItem.typeName}
          </span>
        </div>
      </div>

      {/* Info & Pricing */}
      <div className="flex flex-col justify-between flex-1 p-4 gap-3">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h2 className="text-base md:text-lg font-bold text-white line-clamp-1">
              {menuItem.name}
            </h2>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {menuItem.description}
          </p>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-semibold text-amber-400">&#8377;</span>
            <span className="text-xl font-bold font-mono text-amber-400">
              {menuItem.price}
            </span>
          </div>

          <div className="hidden md:block">
            <AddIcon onClick={onClick} />
          </div>

          <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg text-xs transition-all shadow-md cursor-pointer"
          >
            <CartIcon />
            <span>Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
