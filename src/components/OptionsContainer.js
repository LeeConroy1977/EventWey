import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import { categoriesArr, dateArr, sortByArr } from "../../data/options";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import ConnectionsOptions from "../layouts/connection-layout/ConnectionsOptions";
import { useUser } from "../contexts/UserContext";
import { useScreenWidth } from "../contexts/ScreenWidthContext";
import AdminNav from "../layouts/user-layout/AdminNav";
const OptionsContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isMobile } = useScreenWidth();
    const { user } = useUser();
    const location = useLocation();
    const isConnectionsPage = location.pathname === "/user/my-connections" ||
        location.pathname === "/user/my-connections/requests";
    const isGroupPage = location.pathname === "/user/groups";
    const isEventPage = location.pathname === "/user/events";
    const isAdminPage = location.pathname === "/user/admin/groups" ||
        location.pathname === "/user/admin/events";
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [date, setDate] = useState(searchParams.get("date") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
    const handleParams = (paramOption, value) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (value) {
            newParams.set(paramOption, value);
        }
        else {
            newParams.delete(paramOption);
        }
        setSearchParams(newParams);
    };
    const handleCategoryOption = (e) => {
        const categoryValue = e.target.value;
        setCategory(categoryValue);
        handleParams("category", categoryValue === "categories" || categoryValue === ""
            ? null
            : categoryValue);
    };
    const handleDateOption = (e) => {
        const dateValue = e.target.value;
        setDate(dateValue);
        handleParams("date", dateValue === "date" || dateValue === "" ? null : dateValue);
    };
    const handleSortByOption = (e) => {
        const sortByValue = e.target.value;
        setSortBy(sortByValue);
        handleParams("sortBy", sortByValue === "sort by" || sortByValue === "" ? null : sortByValue);
    };
    const handleResetParams = () => {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
        setDate("");
        setCategory("");
        setSortBy("");
    };
    return (_jsxs("div", { className: `${isConnectionsPage || isAdminPage ? "h-[4rem]" : "h-[6rem]"} w-screen  tablet:w-[100%] tablet:h-[62px] desktop:h-[65px] xl-screen:h-[70px] flex items-center justify-center bg-white border-t-2 border-b-2 border-gray-100 font-semibold  py-4 desktop:py-0`, children: [isMobile && (_jsxs("div", { className: "w-screen flex flex-col px-6 ", children: [isConnectionsPage && _jsx(ConnectionsOptions, {}), (isGroupPage || isEventPage) && !isConnectionsPage && (_jsx("nav", { className: "w-[100%] h-[100%] flex items-center mt-6 ", children: _jsxs("ul", { className: "w-[100%] flex items-center justify-start text-[13px] ", children: [_jsx(NavLink, { to: user ? "/user/events" : "/events", className: ({ isActive }) => isActive
                                        ? "font-semibold text-primary"
                                        : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Events" }) }), _jsx(NavLink, { to: user ? "/user/groups" : "/groups", className: ({ isActive }) => isActive
                                        ? "font-semibold text-primary"
                                        : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer ml-4", children: "Groups" }) }), " ", user?.role === "admin" && (_jsx(NavLink, { to: "/user/admin", className: ({ isActive }) => isActive
                                        ? "font-semibold text-primary"
                                        : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer ml-4", children: "Admin" }) })), _jsx("button", { className: "ml-auto  text-[11px] text-[#5D9B9B] font-semibold", onClick: handleResetParams, children: "Reset filters" })] }) })), !isConnectionsPage && !isAdminPage && (_jsxs("div", { className: `${isGroupPage
                            ? "justify-end gap-x-4 desktop:ml-0"
                            : "justify-between gap-x-0 "} flex w-[100%]  items-center  desktop:justify-start mb-4 mt-4`, children: [!isGroupPage && !isConnectionsPage && (_jsx(SelectComponent, { optionArray: dateArr, defaultOption: "Date", handleChange: handleDateOption, selectedOption: date })), !isConnectionsPage && (_jsxs(_Fragment, { children: [" ", _jsx(SelectComponent, { optionArray: categoriesArr, defaultOption: "Categories", handleChange: handleCategoryOption, selectedOption: category }), _jsx(SelectComponent, { optionArray: sortByArr, defaultOption: "Sort By", handleChange: handleSortByOption, selectedOption: sortBy })] }))] })), isAdminPage && _jsx(AdminNav, {}), !isEventPage &&
                        !isGroupPage &&
                        !isConnectionsPage &&
                        !isAdminPage && (_jsx("div", { className: "ml-auto mb-4 mt-0", children: _jsx("button", { className: "ml-auto  text-[11px] text-[#5D9B9B] font-semibold", onClick: handleResetParams, children: "Reset filters" }) }))] })), !isMobile && (_jsx("div", { className: "tablet:w-[90%] desktop:w-[66%] h-[100%]", children: _jsxs("div", { className: "w-[100%] h-[100%] flex justify-between mr-auto ", children: [_jsx("nav", { className: "w-[50%] h-[100%] flex items-center desktop:ml-4 ", children: _jsxs("ul", { className: "w-[100%] flex items-center justify-start gap-10 text-[15px] xl-screen:text-[17px] ml-6", children: [_jsx(NavLink, { to: user ? "/user/events" : "/events", className: ({ isActive }) => isActive
                                            ? "font-semibold text-primary"
                                            : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Events" }) }), _jsx(NavLink, { to: user ? "/user/groups" : "/groups", className: ({ isActive }) => isActive
                                            ? "font-semibold text-primary"
                                            : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Groups" }) }), user?.role === "admin" && (_jsx(NavLink, { to: "/user/admin", className: ({ isActive }) => isActive
                                            ? "font-semibold text-primary"
                                            : "font-semibold text-textPrimary", children: _jsx("li", { className: "cursor-pointer", children: "Admin" }) }))] }) }), isConnectionsPage ? (_jsx(ConnectionsOptions, {})) : isAdminPage ? (_jsx(AdminNav, {})) : (_jsxs("div", { className: "w-full flex  items-center justify-end", children: [!isGroupPage && (_jsx(SelectComponent, { optionArray: dateArr, defaultOption: "Date", handleChange: handleDateOption, selectedOption: date })), _jsx(SelectComponent, { optionArray: categoriesArr, defaultOption: "Categories", handleChange: handleCategoryOption, selectedOption: category }), _jsx(SelectComponent, { optionArray: sortByArr, defaultOption: "Sort By", handleChange: handleSortByOption, selectedOption: sortBy }), _jsx("button", { className: "mr-8  text-[14px] tablet:text-[12px] desktop:text-[14px] xl-screen:text-[15px] text-[#5D9B9B] font-semibold", onClick: handleResetParams, children: "Reset filters" })] }))] }) }))] }));
};
export default OptionsContainer;
