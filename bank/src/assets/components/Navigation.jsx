import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();

    // 각 탭 정보
    const navs = [
        { icon: "🏠", label: "홈", path: "/home" },
        { icon: "🎁", label: "혜택", path: "/benefit", badge: true },
        { icon: "💳", label: "결제", path: "/pay" },
        { icon: "💰", label: "자산", path: "/money" },
        { icon: "💹", label: "증권", path: "/paper" },
    ];

    // 현재 경로와 일치하는지 체크
    const isActive = (path) =>
        location.pathname === path || (path === "/home" && location.pathname === "/");

    return (
        <div className="fixed left-0 right-0 bottom-0 w-full mx-auto bg-white border-t border-[#f3f3f3] flex justify-around py-2 z-20">
            {navs.map((nav, i) => (
                <button
                    key={nav.label}
                    className={
                        "flex flex-col items-center text-[12px] font-medium transition-all relative hover:shadow-md " +
                        (isActive(nav.path) ? "text-[#191919]" : "text-[#bbb]")
                    }
                    onClick={() => navigate(nav.path)}
                >
                    <span className="text-[22px] mb-0.5">
                        {nav.icon}
                        {/* 혜택 뱃지 */}
                        {nav.badge && (
                            <span className="absolute top-0 right-0 bg-[#ff3636] text-white text-[9px] rounded-full px-1 ml-1 -mt-2">
                                {/* 뱃지 내용 예시: • */}
                                •
                            </span>
                        )}
                    </span>
                    {nav.label}
                </button>
            ))}
        </div>
    );
}

export default Navigation;
