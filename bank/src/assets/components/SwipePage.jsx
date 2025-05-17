import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

// 순서대로 연결된 페이지 경로
const PAGE_ORDER = ["/home", "/money", "/benefit", "/charge", "/pay"];

export default function SwipePage({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const idx = PAGE_ORDER.indexOf(location.pathname);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (idx === PAGE_ORDER.length - 1) {
        // 마지막이면 처음으로
        navigate(PAGE_ORDER[0]);
      } else {
        navigate(PAGE_ORDER[idx + 1]);
      }
    },
    onSwipedRight: () => {
      if (idx === 0) {
        // 처음이면 마지막으로
        navigate(PAGE_ORDER[PAGE_ORDER.length - 1]);
      } else {
        navigate(PAGE_ORDER[idx - 1]);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers} className="min-h-screen">
      {children}
    </div>
  );
}
