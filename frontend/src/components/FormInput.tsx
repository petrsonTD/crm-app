import { MouseEvent, JSX } from "react";
import { RegistrationErrorsI } from "../intefaces/interfaces.ts";

interface FormInputI {
  label: string;
  inputKey: keyof RegistrationErrorsI;
  defaultValue?: string;
  disabled?: boolean;
  errors: RegistrationErrorsI;
  removeError: (e: MouseEvent<HTMLInputElement>) => void;
}

function FormInput({ label, inputKey, defaultValue, disabled, errors, removeError }: FormInputI): JSX.Element {
  return (
    <div className="mt-4 w-[15rem]">
      <label htmlFor={inputKey} className="block text-base font-semibold">
        {label}
        {disabled && <span className="font-light">{" cannot be changed"}</span>}
      </label>
      <input
        id={inputKey}
        type="text"
        name={inputKey}
        defaultValue={defaultValue}
        disabled={disabled}
        onClick={removeError}
        className={`block w-full px-3 py-2 bg-slate-200 border-2 ${errors[inputKey] ? "border-red-500" : "border-slate-400"} shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
      />
    </div>
  );
}

export default FormInput;
