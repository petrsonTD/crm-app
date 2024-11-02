import { JSX } from "react";

interface Button {
  children: string;
  type: "submit" | "reset" | "button";
  primary: boolean;
  onClick?: () => void;
  mt?: string;
  width?: string;
}

function Button({ children, type, primary, onClick, mt = "1rem", width = "15rem" }: Button): JSX.Element {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ marginTop: mt, width: width }}
      className={`mx-auto flex justify-center py-2 px-4 border-2 border-slate-400 shadow-sm text-sm font-medium transition duration-300 ease-in-out w-full ${primary ? "bg-amber-100 hover:bg-amber-200 focus:bg-amber-300" : "bg-amber-50 hover:bg-amber-100 focus:bg-amber-200"}`}
    >
      {children}
    </button>
  );
}

export default Button;
