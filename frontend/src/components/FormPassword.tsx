import { MouseEvent, JSX } from "react";

interface FormPasswordI<T> {
  label: string;
  hint?: string;
  inputKey: keyof T;
  errors: T;
  removeError: (e: MouseEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

function FormPassword<T>({ label, hint, inputKey, errors, removeError, showPassword, togglePasswordVisibility }: FormPasswordI<T>): JSX.Element {
  return (
    <div className="mt-2 w-[15rem]">
      <label htmlFor={inputKey as string} className="block text-base font-semibold ">
        {label}
      </label>
      {hint && <span className="font-light">{hint}</span>}
      <div className="relative">
        <input
          id={inputKey as string}
          type={showPassword ? "text" : "password"}
          name={inputKey as string}
          onClick={removeError}
          className={`block w-full px-3 py-2 pr-10 bg-slate-200 border-2 ${errors[inputKey] ? "border-red-500" : "border-slate-400"} shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 p-1 mr-1 text-slate-400 hover:text-slate-600 focus:outline-none"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default FormPassword;
