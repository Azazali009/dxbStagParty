import React from "react";

export default function FormNavigationButton({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex min-w-[100px] items-center justify-center rounded-md border border-matalicGold bg-transparent px-6 py-2 text-center font-semibold capitalize text-matalicGold duration-300 hover:bg-matalicGold hover:text-navyBlue hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-matalicGold"
    >
      {children}
    </button>
  );
}
