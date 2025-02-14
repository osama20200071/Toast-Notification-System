import { useState } from "react";
import React, { useEffect, useRef } from "react";
import { ToastType } from "./ToastItem";

type ProgressBarProps = {
  duration?: number;
  closeToast: () => void;
  toastType: ToastType;
  pause?: boolean;
  show: boolean;
};

const typeMap: Record<ToastType, string> = {
  success: "bg-green-700",
  error: "bg-red-700",
  info: "bg-blue-700",
  warning: "bg-yellow-700",
};

// not perfectly animated but works fine
const ProgressBar = ({
  duration = 4000,
  closeToast,
  toastType,
  pause = false,
  show,
}: ProgressBarProps) => {
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const intervalTime = duration / 100;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!pause) {
      intervalRef.current = setInterval(() => {
        setWidth((prev) => prev + 1);
      }, intervalTime);
    }
    return () => clearTimeout(intervalRef.current!);
  }, [pause, duration, intervalTime]);

  useEffect(() => {
    if (width > 100) {
      closeToast();
    }
  }, [width, closeToast]);

  return (
    <div
      className={`${
        !show && "hidden"
      } w-full bg-slate-50 rounded-full h-1 dark:bg-gray-700 absolute bottom-0 left-0`}
    >
      <div
        className={`${typeMap[toastType]} h-1 rounded-full dark:bg-blue-500`}
        style={{
          width: `${width}%`,
          transition: `width ${intervalTime}ms linear`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
