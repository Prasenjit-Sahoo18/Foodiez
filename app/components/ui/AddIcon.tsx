import { motion } from "framer-motion";

export default function AddIcon({ onClick }: { onClick?: () => void }) {
    return (
        <motion.img
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={onClick}
            src="/plus.svg"
            alt="Add to cart"
            title="Add to cart"
            className="h-9 w-9 cursor-pointer transition-transform filter drop-shadow-md"
        />
    );
}
