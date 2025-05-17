// src/pages/Benefit.jsx
import React, { useState } from "react";
import SwipePage from "../components/SwipePage";
import Mic from "../components/Mic";

const payMoney = 1_643_056;

const CHARGE_BUTTONS = [
  { label: "100만원", value: 1000000 },
  { label: "50만원", value: 500000 },
  { label: "30만원", value: 300000 },
  { label: "20만원", value: 200000 },
  { label: "10만원", value: 100000 },
  { label: "직접 입력하기", value: "custom" },
];

// 머니 내역 더미데이터
const HISTORY = [
  { month: 5, detail: "5월: 충전 100,000원" },
  { month: 4, detail: "4월: 충전 300,000원" },
  { month: 3, detail: "3월: 충전 200,000원" },
  { month: 2, detail: "2월: 충전 400,000원" },
  { month: 1, detail: "1월: 충전 150,000원" },
];

export default function Benefit() {
  const [mode, setMode] = useState("main"); // main, charge, history

  // 금액 직접 입력 예시
  const [custom, setCustom] = useState("");

  return (
    <SwipePage>
      <div className="flex flex-col items-center min-h-screen bg-[#ece9f9] px-4 pt-10 transition-colors duration-300">
        {/* 상단 Pay머니 영역 */}
        <div className="w-full max-w-md flex flex-col items-center bg-white rounded-2xl shadow-md px-6 py-7 mb-8">
          <div className="text-3xl font-extrabold text-[#251c4c] mb-1">페이머니</div>
          <div className="text-lg text-gray-700 font-bold mb-2">{payMoney.toLocaleString()}원</div>
        </div>

        {/* 머니내역/충전 버튼 */}
        <div className="w-full max-w-md flex gap-3 mb-8">
          <button
            className={`flex-1 py-3 rounded-xl font-bold text-lg shadow ${mode === "history"
              ? "bg-[#5742b6] text-white"
              : "bg-white text-[#5742b6] hover:bg-[#ede6ff]"}`}
            onClick={() => setMode("history")}
          >
            머니내역
          </button>
          <button
            className={`flex-1 py-3 rounded-xl font-bold text-lg shadow ${mode === "charge"
              ? "bg-[#5742b6] text-white"
              : "bg-white text-[#5742b6] hover:bg-[#ede6ff]"}`}
            onClick={() => setMode("charge")}
          >
            충전
          </button>
        </div>

        {/* 본문 영역 */}
        <div className="w-full max-w-md flex-1 flex flex-col items-center">
          {/* 머니내역 모드 */}
          {mode === "history" && (
            <div className="w-full flex flex-col gap-4">
              {HISTORY.map(item => (
                <div key={item.month} className="flex items-center gap-4 bg-white px-5 py-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-[#857661]">{item.month}월</div>
                  <div className="text-gray-700 text-base">{item.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* 충전 모드 */}
          {mode === "charge" && (
            <div className="w-full flex flex-col items-center">
              <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full mb-6">
                {CHARGE_BUTTONS.slice(0, 5).map(btn => (
                  <button
                    key={btn.label}
                    className="h-20 rounded-2xl bg-white text-[#5742b6] font-bold text-xl shadow hover:bg-[#ede6ff] transition"
                    // onClick 등 추가
                  >
                    {btn.label}
                  </button>
                ))}
                <button
                  key={CHARGE_BUTTONS[5].label}
                  className="h-20 rounded-2xl bg-white text-[#5742b6] font-bold text-base shadow hover:bg-[#ede6ff] transition col-span-3"
                  onClick={() => setCustom("직접입력")}
                >
                  {CHARGE_BUTTONS[5].label}
                </button>
              </div>
              {/* 직접 입력시 입력창 노출 (옵션) */}
              {custom && (
                <input
                  type="number"
                  className="w-full py-3 px-4 rounded-lg border mt-2 text-lg"
                  placeholder="금액 입력 (원)"
                  value={custom === "직접입력" ? "" : custom}
                  onChange={e => setCustom(e.target.value)}
                />
              )}
              <div className="text-sm text-gray-500">최대 1,839,120원 충전 가능</div>
            </div>
          )}
        </div>
        <div className="mt-auto w-full flex justify-center pb-8">
          <Mic />
        </div>
      </div>
    </SwipePage>
  );
}
