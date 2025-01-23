import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
const MobileNavOptions = ({ setIsMobileNavOpen }) => {
    const { user, handleSignOut } = useUser();
    function handleClick() {
        setIsMobileNavOpen(false);
    }
    return (_jsxs("div", { className: " h-screen-minus-4rem w-full flex flex-col justify-between overflow-hidden ", children: [_jsxs("div", { className: "h-[60%] w-full flex flex-col items-start justify-start gap-y-8 p-6 mt-6 ", children: [_jsx(NavLink, { to: "/user/events", className: "font-semibold text-textPrimary", onClick: handleClick, children: _jsx("li", { className: "cursor-pointer list-none", children: "Events" }) }), _jsx(NavLink, { to: "/user/groups", className: "font-semibold text-textPrimary", onClick: handleClick, children: _jsx("li", { className: "cursor-pointer list-none", children: "Groups" }) }), _jsx("div", { className: "w-full border-b-[1px] border-gray-200 mt-4 mb-4" }), _jsx(NavLink, { to: "/user/my-events", className: "font-semibold text-textPrimary", onClick: handleClick, children: _jsx("li", { className: "cursor-pointer list-none", children: "Your events" }) }), _jsx(NavLink, { to: "/user/my-groups", className: "font-semibold text-textPrimary", onClick: handleClick, children: _jsx("li", { className: "cursor-pointer list-none", children: "Your groups" }) }), _jsx(NavLink, { to: "/user/my-connections", className: "font-semibold text-textPrimary", onClick: handleClick, children: _jsx("li", { className: "cursor-pointer list-none", children: "Your connections" }) }), user?.role === "admin" && (_jsx(NavLink, { to: "/user/admin/groups", className: "font-semibold text-textPrimary", onClick: handleClick, children: _jsx("li", { className: "cursor-pointer list-none", children: "Admin" }) }))] }), _jsxs("div", { className: " w-full h-[12%] flex flex-row items-center px-6 py-2 border-t-[1px] border-gray-200", children: [_jsx("img", { className: "w-[40px] h-[40px] rounded-full", src: user?.profileImage, alt: "" }), _jsxs("div", { className: "flex flex-col items-center justify-start  ml-6", children: [_jsx("p", { className: "text-[14px] font-semibold mr-auto text-textPrimary", children: user?.username }), _jsx(Link, { to: "/user/profile", onClick: handleClick, children: _jsx("p", { className: "text-[13px] font-medium mr-auto text-primary", children: "View profile" }) })] }), _jsx("p", { onClick: () => {
                            handleSignOut();
                            setIsMobileNavOpen(false);
                        }, className: "ml-auto ", children: "Log out" })] })] }));
};
export default MobileNavOptions;
