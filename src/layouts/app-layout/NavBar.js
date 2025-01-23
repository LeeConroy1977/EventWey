import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Button from "../../reuseable-components/Button";
import useHandleCreateGroupClick from "../../hooks/useHandleCreateGroupClick";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";
import { CgProfile } from "react-icons/cg";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
const NavBar = ({ setIsMobileNavOpen, isMobileNavOpen }) => {
    const { user, handleSignOut } = useUser();
    const { isMobile } = useScreenWidth();
    const location = useLocation();
    const handleCreateUserClick = useHandleCreateUserClick();
    const handleCreateGroupClick = useHandleCreateGroupClick();
    const isHomeActive = location.pathname.startsWith("/user/events") ||
        location.pathname.startsWith("/user/groups") ||
        location.pathname.startsWith("/user/messages") ||
        location.pathname.startsWith("/user/notifications");
    return (_jsx("nav", { className: "w-screen tablet-w-[100%] h-[4rem] tablet:w-[100%] tablet:h-[4.6rem] xl-screen:h-[5rem]   fixed top-0 left-0 flex items-center justify-between bg-bgPrimary border-b-2 border-gray-100 z-20 xl-screen:px-[8rem]", children: isMobile ? (user ? (_jsxs("div", { className: "relative w-[100%] h-[100%] flex items-center justify-center flex-row ", children: [isMobileNavOpen ? (_jsx(MdClose, { onClick: () => setIsMobileNavOpen(false), className: "absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer text-textPrimary text-[22px]" })) : (_jsx(GiHamburgerMenu, { onClick: () => setIsMobileNavOpen(true), className: "absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer text-textPrimary text-[22px]" })), _jsx(NavLink, { to: user ? "user/events" : "/", children: _jsx("div", { className: "text-center text-[22px] font-bold text-secondary", children: "EventWey" }) })] })) : (_jsxs("div", { className: "relative w-[100%] h-[100%] flex items-center justify-end flex-row", children: [_jsx(NavLink, { className: "mr-auto ml-4", to: user ? "user/events" : "/", children: _jsx("div", { className: "text-center text-[22px] font-bold text-secondary ", children: "EventWey" }) }), _jsx(NavLink, { to: "/auth/sign-in", children: _jsx("li", { className: "font-semibold text-textPrimary text-[13px] cursor-pointer list-none mr-4", children: "Log in" }) }), _jsx("div", { className: "mr-4 ", children: _jsx(Button, { handleClick: handleCreateUserClick, bgColour: "bg-primary", px: "px-6", py: "py-1.5", fontSize: "text-[13px]", fontWeight: "font-semibold", children: "Sign up" }) })] }))) : (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: user ? "user/events" : "/", children: _jsx("div", { className: "text-center text-[26px] font-bold text-secondary ml-12 ", children: "EventWey" }) }), _jsxs("div", { className: "flex items-center desktop:gap-10 tablet:mr-10 desktop:mr-12", children: [_jsxs("ul", { className: "flex items-center tablet:gap-6 desktop:gap-10 tablet:text-[13px] desktop:text-[16px] tablet:pr-6 desktop:pr-0 ", children: [_jsx("li", { className: "p-2 pl-4 pr-4 bg-bgPrimary border-2 border-[#2C3E50] text-textPrimary rounded-lg tablet:text-[12px] desktop:text-[14px] font-semibold cursor-pointer", onClick: handleCreateGroupClick, children: "Create a group" }), user ? (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/user/events", className: ({ isActive }) => isHomeActive || isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Home" }) }), _jsx(NavLink, { to: "/user/profile", className: ({ isActive }) => isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Profile" }) }), _jsx(NavLink, { to: "/user/notifications", className: ({ isActive }) => isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Notifications" }) }), _jsx(NavLink, { onClick: handleSignOut, to: "/", className: ({ isActive }) => isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Sign out" }) })] })) : (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: "/events", className: ({ isActive }) => isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Events" }) }), _jsx(NavLink, { to: "/groups", className: ({ isActive }) => isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Groups" }) }), _jsx(NavLink, { to: "/auth/sign-in", className: ({ isActive }) => isActive
                                                ? "font-semibold text-primary"
                                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "font-semibold text-textPrimary cursor-pointer", children: "Log in" }) })] }))] }), user && user.profileImage ? (_jsx("img", { src: user.profileImage || "path/to/default-image.jpg", alt: "User Profile", className: "w-[48px] h-[48px] rounded-full border-[3px] border-textPrimary" })) : (_jsx(CgProfile, { className: "w-[50px] h-[50px] rounded-full text-textPrimary" }))] })] })) }));
};
export default NavBar;
