import React from "react";

const CloseIcon = () => {
  return (
    <svg
      className=" text-slate-800 dark:text-white absolute top-2 right-2 size-4 cursor-pointer hover:text-slate-950 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
  );
};

export default CloseIcon;
