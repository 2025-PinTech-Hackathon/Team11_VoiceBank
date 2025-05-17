// src/pages/Benefit.jsx
import React from "react";
import SwipePage from "../components/SwipePage";
import Mic from "../components/Mic";
export default function Benefit() {
  return (
    <SwipePage>
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f7f8fa]">
        <div className="text-2xl font-bold text-gray-400">빈 페이지</div>
        <Mic />
      </div>
    </SwipePage>
  );
}

