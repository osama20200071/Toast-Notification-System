import React, { useEffect, useState } from "react";
import CloseIcon from "../../Icons/CloseIcon";
import { useAppDispatch } from "../../store/hooks";
import { removeToast } from "../../store/toast/toastsSlice";
import ProgressBar from "./ProgressBar";
import { motion } from "motion/react";

export type ToastType = "success" | "error" | "info" | "warning";
export type ToastPosition =
  | "top-center"
  | "top-right"
  | "top-left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

export type ToastItemProps = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  position: ToastPosition;
  duration?: number;
  delay?: number;
  showProgressBar?: boolean;
  showCloseButton?: boolean;
};

const typeMap: Record<ToastType, string> = {
  success: "bg-green-400 border border-green-700",
  error: "bg-red-400 border border-red-700",
  info: "bg-blue-400 border border-blue-700",
  warning: "bg-yellow-400 border border-yellow-700",
};

type Animate = "initial" | "animate" | "exit";
type PositionAnimateMapType = Record<
  ToastPosition,
  Record<Animate, { y?: number; x?: number }>
>;

const positionAnimateMap: PositionAnimateMapType = {
  "top-center": { initial: { y: -50 }, animate: { y: 0 }, exit: { y: -50 } },
  "top-right": { initial: { x: 50 }, animate: { x: 0 }, exit: { x: 50 } },
  "top-left": { initial: { x: -50 }, animate: { x: 0 }, exit: { x: -50 } },
  "bottom-center": { initial: { y: 50 }, animate: { y: 0 }, exit: { y: 50 } },
  "bottom-right": { initial: { x: 50 }, animate: { x: 0 }, exit: { x: 50 } },
  "bottom-left": { initial: { x: -50 }, animate: { x: 0 }, exit: { x: -50 } },
};

const ToastItem = ({
  message,
  type,
  title,
  id,
  duration,
  delay = 0,
  position,
  showProgressBar = true,
  showCloseButton = true,
}: ToastItemProps) => {
  const dispatch = useAppDispatch();
  const [startRender, setStartRender] = useState(false);
  const [hovering, setHovering] = useState(false);

  const closeToastHandler = () => {
    dispatch(removeToast({ id }));
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setStartRender(true);
    }, delay);

    return () => clearTimeout(timerId);
  }, [delay]);

  if (startRender) {
    return (
      <motion.div
        initial={{ opacity: 0, ...positionAnimateMap[position].initial }}
        animate={{ opacity: 1, ...positionAnimateMap[position].animate }}
        exit={{ opacity: 0, ...positionAnimateMap[position].exit }}
        transition={{
          duration: 0.4,
          stiffness: 100,
          type: "spring",
        }}
        layout
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`w-96 p-3 rounded-md overflow-hidden relative ${typeMap[type]} `}
      >
        <h3 className="text-xl capitalize mb-3 font-semibold select-none">
          {title ?? type}
        </h3>
        <p>{message}</p>
        {showCloseButton && (
          <button onClick={closeToastHandler}>
            <CloseIcon />
          </button>
        )}
        <ProgressBar
          duration={duration}
          closeToast={closeToastHandler}
          toastType={type}
          pause={hovering}
          show={showProgressBar}
        />
      </motion.div>
    );
  }
};

export default ToastItem;
