import React from "react";

export default function FormNavigationButton({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex min-w-[70px] items-center justify-center rounded-md border border-matalicGold bg-transparent px-3 py-1.5 text-center text-[10px] font-semibold capitalize text-matalicGold duration-300 hover:bg-matalicGold hover:text-navyBlue hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-matalicGold sm:min-w-[100px] sm:px-6 sm:py-2 sm:text-base"
    >
      {children}
    </button>
  );
}
