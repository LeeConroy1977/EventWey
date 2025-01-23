import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";
const UserEvents = () => {
    const { user, userEvents, loading, error, getUserEvents } = useUser();
    const { isMobile } = useScreenWidth();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const date = searchParams.get("date");
    const sortBy = searchParams.get("sortBy");
    const handleEventClick = useHandleEventClick();
    useEffect(() => {
        const params = {
            category,
            date,
            sortBy,
        };
        getUserEvents(params);
    }, [category, date, sortBy]);
    return (_jsxs("div", { className: "w-full min-h-screen bg-bgSecondary px-6 desktop:px-0 pb-6", children: [isMobile && (_jsxs("h2", { className: "text-[14px] font-bold text-textPrimary mb-4 mr-auto mt-4", children: ["Your events (", _jsx("span", { className: "text-primary", children: userEvents?.length || 0 }), ")"] })), loading ? (_jsx("div", { className: "flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "text-red-500 text-center mt-4", children: error })) : userEvents && userEvents.length > 0 ? (userEvents.map((event) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, event.id)))) : (!loading && (_jsx("div", { className: "text-center text-gray-500 mt-4", children: "No events found." })))] }));
};
export default UserEvents;
