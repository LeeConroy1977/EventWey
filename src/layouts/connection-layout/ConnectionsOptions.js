import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useConnections } from "../../contexts/ConnectionsContext";
import { NavLink } from "react-router-dom";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const ConnectionsOptions = () => {
    const [input, setInput] = useState("");
    const { isMobile } = useScreenWidth();
    const { connections, getAllConnections, loading, error, handleConnectionQuery, filteredConnections, } = useConnections();
    useEffect(() => {
        handleConnectionQuery(input);
    }, [input]);
    return (_jsxs("div", { className: "w-[100%] h-[100%] flex items-center justify-between   desktop:ml-6", children: [!isMobile && (_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), placeholder: "Search connections...", className: "w-[50%] h-[54%] p-2 pl-6 ml-6 flex items-center justify-start bg-bgSecondary rounded-full  mr-auto border-[1px] border-gray-200 text-[11px] text-textPrimary placeholder:text-[10px] focus:outline-none focus:ring-0" })), _jsx("nav", { children: _jsxs("ul", { className: "flex items-center mr-auto desktop:mr-0 text-[13px] desktop:text-[14px]", children: [_jsx(NavLink, { end: true, to: "/user/my-connections", className: ({ isActive }) => isActive
                                ? "font-semibold text-primary"
                                : "font-semibold text-textPrimary", children: _jsx("li", { className: " mr-6 desktop:ml-auto desktop:mr-11   cursor-pointer ", children: "Connections" }) }), _jsx(NavLink, { to: "/user/my-connections/requests", className: ({ isActive }) => isActive
                                ? "font-semibold text-primary"
                                : "font-semibold text-textPrimary", children: _jsx("li", { className: "desktop:ml-auto desktop:mr-11   cursor-pointer  ", children: "View Requests" }) })] }) })] }));
};
export default ConnectionsOptions;
