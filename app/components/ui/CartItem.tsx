import { DeleteIcon } from "./Icons";
import { FC } from "react";
import { deleteCompleteItem } from "@/app/config";

interface CartItemProps {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  price: number;
  quantity: number;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  addItem: () => void;
  deleteItem: () => void;
  onDeleteItem: (itemId: string) => void;
}

export const CartItem: FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  type,
  price,
  quantity,
  onQuantityChange,
  addItem,
  deleteItem,
  onDeleteItem
}) => {
  return (
    <div className="flex lg:max-w-[700px] md:max-w-[700px] max-w-[500px] justify-between items-center gap-4 w-full bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/50 shadow-xl md:px-5 px-3 lg:py-3.5 md:py-3 py-2.5 rounded-2xl transition-all duration-300">
      {/* Item Image */}
      <div className="relative shrink-0">
        <img
          src={imageUrl || "/all-items-image.jpg"}
          alt={title}
          className="lg:w-28 lg:h-20 md:w-24 md:h-18 w-20 h-16 rounded-xl object-cover border border-slate-800 shadow-md"
        />
      </div>

      {/* Info & Quantity & Price */}
      <div className="flex justify-between items-center w-full">
        {/* Title, Category & Unit Price */}
        <div className="flex flex-col gap-1.5 justify-center">
          <h2 className="lg:text-lg md:text-base text-sm text-white font-semibold line-clamp-1">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[11px] md:text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {type}
            </span>
            <span className="text-emerald-400 font-mono font-semibold text-xs md:text-sm">
              &#8377;{price}
            </span>
          </div>
        </div>

        {/* Quantity Controls & Delete */}
        <div className="flex flex-col items-end gap-2 justify-center">
          {/* Delete Icon */}
          <button
            onClick={() => {
              onDeleteItem(id);
              deleteCompleteItem(id);
            }}
            title="Remove from cart"
            className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-5 md:h-5 fill-current text-red-400 hover:text-red-300 hover:scale-110 transition-transform"
            >
              <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z" />
            </svg>
          </button>

          {/* Plus / Minus Counter */}
          <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => {
                onQuantityChange(id, quantity >= 1 ? quantity - 1 : 0);
                deleteItem();
              }}
              className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-slate-700 hover:bg-amber-600 text-white font-bold text-sm transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            >
              -
            </button>
            <span className="text-white font-semibold text-xs md:text-sm px-1.5 min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => {
                onQuantityChange(id, quantity + 1);
                addItem();
              }}
              className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-slate-700 hover:bg-amber-600 text-white font-bold text-sm transition-colors flex items-center justify-center cursor-pointer shadow-sm"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <span className="text-gray-400 text-[11px] md:text-xs">Subtotal: </span>
            <span className="text-amber-400 font-bold font-mono text-sm md:text-base">
              &#8377;{price * quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
