import React, { useCallback, useEffect, useRef } from "react";
import { motion, useAnimation } from "motion/react";
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

// animated and stop if not in view
const ProgressBar = ({
  duration = 4000,
  closeToast,
  toastType,
  pause = false,
  show,
}: ProgressBarProps) => {
  const controls = useAnimation();
  const remainingTimeRef = useRef(duration);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const startAnimation = useCallback(() => {
    controls.start({
      width: "100%",
      transition: {
        duration: remainingTimeRef.current / 1000,
        ease: "linear",
      },
    });
  }, [controls]);

  // to handle if the user not viewing the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        controls.stop();
      } else {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [controls, startAnimation]);

  useEffect(() => {
    if (!pause) {
      // interval to calculate the remaining time if there is pause
      intervalRef.current = setInterval(() => {
        remainingTimeRef.current -= 10;
      }, 10);
      startAnimation();
    } else {
      controls.stop();
    }

    return () => clearInterval(intervalRef.current!);
  }, [pause, controls, startAnimation]);

  return (
    <div
      className={`${
        !show && "hidden"
      } w-full bg-slate-50 rounded-full h-1 dark:bg-gray-700 absolute bottom-0 left-0`}
    >
      <motion.div
        className={`${typeMap[toastType]} h-1 rounded-full dark:bg-blue-500`}
        initial={{ width: "0%" }}
        animate={controls}
        onUpdate={(latest) => {
          if (latest.width === "100%") {
            closeToast();
          }
        }}
      />
    </div>
  );
};

export default ProgressBar;
