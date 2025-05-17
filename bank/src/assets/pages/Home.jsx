import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mic from "../components/Mic";
import SwipePage from "../components/SwipePage";

const NAVS = [
  { label: "자산", to: "/money", color: "bg-yellow-500", bg: "bg-yellow-100" },
  { label: "혜택", to: "/benefit", color: "bg-green-500", bg: "bg-green-100" },
  { label: "충전", to: "/charge", color: "bg-blue-400", bg: "bg-blue-100" },
  { label: "결제", to: "/pay", color: "bg-indigo-500", bg: "bg-indigo-100" }
];

function speakText(text) {
  const tts = new window.SpeechSynthesisUtterance(text);
  tts.lang = "ko-KR";
  window.speechSynthesis.speak(tts);
}

export default function Home() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // active > hover > 기본색
  const currentIdx = activeIdx !== null ? activeIdx : hoveredIdx;
  const currentBg =
    currentIdx === null ? "bg-[#f7f8fa]" : NAVS[currentIdx].bg;

  return (
    <SwipePage>
      <div className={`${currentBg} min-h-screen flex flex-col justify-center items-center px-2 transition-colors duration-300`}>
        <div className="w-full max-w-sm flex flex-col gap-6 py-10">
          {NAVS.map(({ label, to, color }, i) => (
            <button
              key={label}
              className={`w-full h-24 text-5xl font-bold rounded-2xl text-white shadow-md active:scale-95 transition ${color}`}
              onClick={() => navigate(to)}
              onPointerDown={e => {
                let pressed = false;
                setActiveIdx(i);
                const timeout = setTimeout(() => {
                  pressed = true;
                  speakText(`${label} 버튼`);
                }, 500);
                e.target.onpointerup = () => {
                  setActiveIdx(null);
                  clearTimeout(timeout);
                  if (!pressed) navigate(to);
                  e.target.onpointerup = null;
                };
              }}
              onPointerEnter={() => setHoveredIdx(i)}
              onPointerLeave={() => {
                setHoveredIdx(null);
                setActiveIdx(null);
              }}
              style={{ outline: "none" }}
            >
              {label}
            </button>
          ))}
        </div>
        <Mic />
      </div>
    </SwipePage>
  );
}
