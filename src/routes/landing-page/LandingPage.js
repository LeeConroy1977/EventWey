import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LandingPageWrapper from "./LandingPageWrapper";
import EventDisplayContainer from "../../reuseable-components/EventDisplayContainer";
import LandingPageAdvert from "./LandingPageAdvert";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const LandingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isMobile } = useScreenWidth();
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
    const navigate = useNavigate();
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
    const handleSortByOption = (e) => {
        const sortByValue = e.target.value;
        setSortBy(sortByValue);
        handleParams("sortBy", sortByValue);
        navigate(`/events?sortBy=${sortByValue}`);
    };
    return (_jsxs("div", { className: "w-full h-full flex flex-col items-center justify-start bg-bgPrimary mt-0 ", children: [_jsx(LandingPageWrapper, {}), _jsxs("main", { className: "w-full tablet:w-[86%] desktop:w-[66%] flex flex-col items-center justify-start pb-8 px-6 tablet:px-0 desktop:mt-8 ", children: [_jsx(EventDisplayContainer, { title: "Popular events", sortBy: "popular", listName: "popular", handleClick: handleSortByOption }), _jsx(EventDisplayContainer, { title: "Upcoming events", sortBy: "date", listName: "upcoming", handleClick: handleSortByOption }), _jsx(EventDisplayContainer, { title: "Free events", sortBy: "free", listName: "free", handleClick: handleSortByOption }), !isMobile && _jsx(LandingPageAdvert, {})] })] }));
};
export default LandingPage;
