export default function Button({ children, onClick, disable }) {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className="block rounded-full border-2 border-transparent bg-tertiary/40 px-6 py-3 capitalize shadow-shadowOne transition-all duration-500 hover:border-indigo-600 hover:from-transparent hover:to-transparent"
    >
      {children}
    </button>
  );
}
