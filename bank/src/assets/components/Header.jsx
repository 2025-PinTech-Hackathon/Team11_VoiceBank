import React from "react";

function Header() {
    return (
        <div className="pt-7 px-5 pb-2">
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl text-[#191919] flex items-center gap-1">
            <span>💬</span>pay
          </div>
          <div className="flex gap-4 items-center">
            <button className="bg-none border-none rounded-full p-1.5 hover:bg-[#f6f8fa] hover:shadow-md hover:text-blue-600 transition"><span className="text-xl">&#128269;</span></button>
            <button className="bg-none border-none rounded-full p-1.5 hover:bg-[#f6f8fa] hover:shadow-md hover:text-blue-600 transition relative">
              <span className="text-xl">&#128276;</span>
              <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            <button className="bg-none border-none rounded-full p-1.5 hover:bg-[#f6f8fa] hover:shadow-md hover:text-blue-600 transition"><span className="text-xl">&#9776;</span></button>
          </div>
        </div>
      </div>
    )
}

export default Header;