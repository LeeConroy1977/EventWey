import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useParams } from "react-router-dom";
const ConnectionNavBar = () => {
    const { id } = useParams();
    return (_jsx("nav", { className: "flex items-center t w-[100%] h-[4rem] bg-bgPrimary rounded-lg mt-8", children: _jsxs("ul", { className: "w-[100%] flex items-center justify-start gap-10 text-[15px] ml-4 p-4 ", children: [_jsx(NavLink, { to: `/connection/${id}/events`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Events" }), _jsx(NavLink, { to: `/connection/${id}/groups`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Groups" }), _jsx(NavLink, { to: `/connection/${id}/connections`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Connections" })] }) }));
};
export default ConnectionNavBar;
