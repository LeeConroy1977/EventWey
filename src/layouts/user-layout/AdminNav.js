import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const AdminNav = () => {
    return (_jsx("div", { className: "w-[100%] h-[100%] flex items-center justify-end desktop:ml-6", children: _jsx("nav", { children: _jsxs("ul", { className: "flex items-center ml-auto desktop:mr-0 text-[13px] desktop:text-[14px]", children: [_jsx(NavLink, { end: true, to: "/user/admin/groups", className: ({ isActive }) => isActive
                            ? "font-semibold text-primary"
                            : "font-semibold text-textPrimary", children: _jsx("li", { className: " mr-6 desktop:ml-auto desktop:mr-11   cursor-pointer ", children: "Review groups" }) }), _jsx(NavLink, { to: "/user/admin/events", className: ({ isActive }) => isActive
                            ? "font-semibold text-primary"
                            : "font-semibold text-textPrimary", children: _jsx("li", { className: "desktop:ml-auto desktop:mr-11   cursor-pointer  ", children: "Review events" }) })] }) }) }));
};
export default AdminNav;
