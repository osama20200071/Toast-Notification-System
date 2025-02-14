import React from "react";
import { ToastPosition, ToastType } from "./ToastItem";

// Create a mapping between the name and the corresponding value type
type NameToValueMap = {
  type: ToastType;
  position: ToastPosition;
};

// Define the RadioInputProps type using conditional types
type RadioInputProps<K extends keyof NameToValueMap> = {
  name: K;
  value: NameToValueMap[K];
  defaultChecked?: boolean;
};
const RadioInput = <K extends keyof NameToValueMap>({
  name,
  value,
  defaultChecked = false,
}: RadioInputProps<K>) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        // className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />

      <label
        htmlFor={value}
        className="capitalize text-sm font-medium text-gray-700"
      >
        {value}
      </label>
    </div>
  );
};

export default RadioInput;
