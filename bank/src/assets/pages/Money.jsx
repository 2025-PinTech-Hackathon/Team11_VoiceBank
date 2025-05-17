import React, { useState } from "react";
import SwipePage from "../components/SwipePage";
import Mic from "../components/Mic";
const ACCOUNTS = [
  { name: "국민은행", num: "093-12-000234", amount: "340,000원", icon: "🏦", mainColor: "bg-gradient-to-br from-yellow-200 to-yellow-400", shadowColor: "shadow-yellow-300/40", },
  { name: "하나은행", num: "123-45-678910", amount: "2,500,000원", icon: "🍀", mainColor: "bg-gradient-to-br from-green-200 to-emerald-400", shadowColor: "shadow-emerald-300/40", },
  { name: "기업은행", num: "1002-456-777777", amount: "20,000원", icon: "💙", mainColor: "bg-gradient-to-br from-blue-200 to-blue-400", shadowColor: "shadow-blue-300/40", },
  { name: "신한은행", num: "110-123-456789", amount: "820,000원", icon: "🔷", mainColor: "bg-gradient-to-br from-sky-200 to-sky-400", shadowColor: "shadow-sky-300/40", },
  { name: "토스뱅크", num: "1234-12-345678", amount: "3,120,000원", icon: "📲", mainColor: "bg-gradient-to-br from-indigo-200 to-indigo-500", shadowColor: "shadow-indigo-400/40", },
];

export default function Charge() {
  const [zoomIdx, setZoomIdx] = useState(null); // 전체 카드 확대
  const [focus, setFocus] = useState({ idx: null, type: null }); // 텍스트 돋보기

  // 텍스트 요소별 스타일
  const getTextScale = (row, type) =>
    focus.idx === row && focus.type === type
      ? "scale-[2.4] z-20 shadow-2xl"
      : "scale-100";

  // 텍스트별 폰트 크기(기본값도 더 키움)
  const getFontSize = (type, focused) => {
    if (type === "name") return focused ? "text-[3rem]" : "text-[1.8rem] font-extrabold";
    if (type === "num") return focused ? "text-[2.2rem]" : "text-[1.3rem] text-gray-600";
    if (type === "amount") return focused ? "text-[3.2rem] text-blue-500" : "text-[1.7rem] text-blue-500 font-bold";
    return "";
  };

  return (
    <SwipePage>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          zoomIdx === null ? "bg-[#f7f8fa]" : ACCOUNTS[zoomIdx].mainColor
        }`}
      >
        <div className="h-screen overflow-y-auto flex flex-col items-center px-4 py-10 gap-6">
          {ACCOUNTS.map((acc, row) => {
            const isZoomed = zoomIdx === row;
            return (
              <button
                key={acc.num}
                className={`
                  w-full max-w-xl h-40 rounded-2xl flex items-center px-6
                  border-4 bg-white relative
                  transition-all duration-200
                  ${isZoomed ? `${acc.mainColor} border-yellow-400 scale-105 z-10 ${acc.shadowColor}` : "border-transparent"}
                  hover:scale-105 hover:shadow-2xl
                `}
                style={{
                  boxShadow: isZoomed ? "0 0 60px 0 rgba(0,0,0,0.10)" : undefined,
                }}
                onPointerDown={() => setZoomIdx(row)}
                onPointerUp={() => setZoomIdx(null)}
                onPointerLeave={() => setZoomIdx(null)}
              >
                {/* 아이콘 */}
                <div className="text-[3rem] mr-6 select-none">{acc.icon}</div>

                {/* 텍스트 정보 (각 요소에 돋보기 효과) */}
                <div className="flex flex-col items-start relative w-full space-y-2">
                  <span
                    className={`text-[1.6rem] font-extrabold cursor-pointer transition-transform duration-200 inline-block origin-left ${getTextScale(row, "name")}`}
                    onPointerDown={e => {
                      e.stopPropagation();
                      setFocus({ idx: row, type: "name" });
                    }}
                    onPointerUp={e => setFocus({ idx: null, type: null })}
                    onPointerLeave={e => setFocus({ idx: null, type: null })}
                  >
                    {acc.name}
                  </span>
                  <span
                    className={`text-[1.1rem] text-gray-600 cursor-pointer transition-transform duration-200 inline-block origin-left ${getTextScale(row, "num")}`}
                    onPointerDown={e => {
                      e.stopPropagation();
                      setFocus({ idx: row, type: "num" });
                    }}
                    onPointerUp={e => setFocus({ idx: null, type: null })}
                    onPointerLeave={e => setFocus({ idx: null, type: null })}
                  >
                    {acc.num}
                  </span>
                  <span
                    className={`text-[2rem] text-blue-500 font-bold cursor-pointer transition-transform duration-200 inline-block origin-left ${getTextScale(row, "amount")}`}
                    onPointerDown={e => {
                      e.stopPropagation();
                      setFocus({ idx: row, type: "amount" });
                    }}
                    onPointerUp={e => setFocus({ idx: null, type: null })}
                    onPointerLeave={e => setFocus({ idx: null, type: null })}
                  >
                    {acc.amount}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <Mic />
    </SwipePage>
  );
}