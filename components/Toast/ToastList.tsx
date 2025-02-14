import React from "react";
import ToastItem, { ToastItemProps, ToastPosition } from "./ToastItem";
import { useAppSelector } from "../../store/hooks";
import { AnimatePresence } from "motion/react";

const positionMap: Record<ToastPosition, string> = {
  "top-center": "top-6 left-1/2 transform -translate-x-1/2",
  "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
};

const ToastList = () => {
  const toasts = useAppSelector((state) => state.toasts.toasts);

  // top toasts
  const topR = toasts.filter((toast) => toast.position === "top-right");
  const topL = toasts.filter((toast) => toast.position === "top-left");
  const topC = toasts.filter((toast) => toast.position === "top-center");

  // bottom toasts
  const bottomR = toasts.filter((toast) => toast.position === "bottom-right");
  const bottomL = toasts.filter((toast) => toast.position === "bottom-left");
  const bottomC = toasts.filter((toast) => toast.position === "bottom-center");

  return (
    <>
      <PositionedList data={topR} position="top-right" />
      <PositionedList data={topL} position="top-left" />
      <PositionedList data={topC} position="top-center" />

      <PositionedList data={bottomR} position="bottom-right" />
      <PositionedList data={bottomL} position="bottom-left" />
      <PositionedList data={bottomC} position="bottom-center" />
    </>
  );
};

export default ToastList;

const PositionedList = ({
  data,
  position,
}: {
  data: ToastItemProps[];
  position: ToastPosition;
}) => {
  return (
    <div className={`fixed space-y-2 ${positionMap[position]}`}>
      <AnimatePresence>
        {data.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
