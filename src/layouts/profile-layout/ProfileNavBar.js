import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const ProfileNavBar = () => {
    return (_jsx("nav", { className: "flex items-center t w-[100%] h-[4rem] bg-bgPrimary rounded-lg mt-8", children: _jsxs("ul", { className: "w-[100%] flex items-center justify-start gap-10 tablet:text-[14px] desktop:text-[15px] ml-4 p-4 ", children: [_jsx(NavLink, { to: `/user/profile/events`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Events" }), _jsx(NavLink, { to: `/user/profile/groups`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Groups" }), _jsx(NavLink, { to: `/user/profile/connections`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Connections" }), _jsx(NavLink, { to: `/user/profile/settings`, className: ({ isActive }) => isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary", children: "Settings" })] }) }));
};
export default ProfileNavBar;
