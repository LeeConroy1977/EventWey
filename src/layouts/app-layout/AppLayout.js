import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import MobileNavOptions from "./MobileNavOptions";
const AppLayout = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    return (_jsxs("div", { className: "w-full min-h-screen flex justify-center bg-bgSecondary font-poppins", children: [_jsx(NavBar, { isMobileNavOpen: isMobileNavOpen, setIsMobileNavOpen: setIsMobileNavOpen }), _jsx("main", { className: "w-full min-h-screen mt-[2.3rem] flex justify-center", children: isMobileNavOpen ? (_jsx(MobileNavOptions, { setIsMobileNavOpen: setIsMobileNavOpen })) : (_jsx(Outlet, {})) })] }));
};
export default AppLayout;
