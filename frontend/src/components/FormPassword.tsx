import { MouseEvent, JSX } from "react";
import { ErrorsI } from "../intefaces/interfaces.ts";

interface FormPasswordI {
  label: string;
  inputKey: keyof ErrorsI;
  errors: ErrorsI;
  removeError: (e: MouseEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

function FormPassword({ label, inputKey, errors, removeError, showPassword, togglePasswordVisibility }: FormPasswordI): JSX.Element {
  return (
    <div className="relative mt-2">
      <label htmlFor={inputKey} className="block text-base font-semibold ">
        {label}
      </label>
      <input
        id={inputKey}
        type={showPassword ? "text" : "password"}
        name={inputKey}
        onClick={removeError}
        className={`mt-1 block w-full px-3 py-2 pr-10 bg-slate-200 border-2 ${errors[inputKey] ? "border-red-500" : "border-slate-400"} shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 p-1 mt-[1.7rem] mr-1 text-slate-400 hover:text-slate-600 focus:outline-none"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default FormPassword;
