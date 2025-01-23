import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useEvents } from "../../contexts/EventsContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "./HomeEventsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";
const Home = () => {
    const { events, setEvents, fetchEvents, loading, error } = useEvents();
    const [searchParams] = useSearchParams();
    const { isMobile } = useScreenWidth();
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
        fetchEvents(params);
    }, [category, date, sortBy]);
    return (_jsxs("div", { className: "w-full h-auto tablet:min-h-screen flex flex-col justify-start gap-y-4 tablet:gap-y-0 px-6 tablet:px-0 tablet:mt-2 mb-6 tablet:mb-0", children: [!events && !loading && (_jsx("div", { className: "text-center mt-4 text-gray-500", children: "No events found." })), loading ? (_jsx("div", { className: "flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "text-red-500 text-center mt-4", children: error })) : (events &&
                events.length > 0 &&
                events.map((event) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, event.id))))] }));
};
export default Home;
