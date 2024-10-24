import { MouseEvent, JSX } from "react";
import { ErrorsI } from "../intefaces/interfaces.ts";

interface FormInputI {
  label: string;
  inputKey: keyof ErrorsI;
  errors: ErrorsI;
  removeError: (e: MouseEvent<HTMLInputElement>) => void;
}

function FormInput({ label, inputKey, errors, removeError }: FormInputI): JSX.Element {
  return (
    <div className="mt-4">
      <label htmlFor={inputKey} className="block text-base font-semibold ">
        {label}
      </label>
      <input
        id={inputKey}
        type="text"
        name={inputKey}
        onClick={removeError}
        className={`mt-1 block w-full px-3 py-2 bg-slate-200 border-2 ${errors[inputKey] ? "border-red-500" : "border-slate-400"} shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
      />
    </div>
  );
}

export default FormInput;
