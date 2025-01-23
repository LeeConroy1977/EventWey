import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import LandingEventCard from "../routes/landing-page/LandingEventCard";
import { fetchSortedEvents } from "../../utils/api/events-api";
import useHandleEventClick from "../hooks/useHandleEventClick";
import { ClipLoader } from "react-spinners";
const EventDisplayContainer = ({ title, sortBy, listName, handleClick, }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleEventClick = useHandleEventClick();
    const handleSelect = (sortBy) => {
        handleClick({
            target: { value: sortBy },
        });
    };
    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await fetchSortedEvents(sortBy);
                setEvents(fetchedEvents.slice(0, 4));
            }
            catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to load events.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [sortBy]);
    return (_jsx("div", { className: "w-[100%] mt-2 tablet:mt-8  desktop:mt-8  xl-screen:mt-12 gap-x-4", children: loading ? (_jsx("div", { className: "flex justify-center items-center tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] ", children: _jsx(ClipLoader, { size: 50, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "text-red-500 text-center mt-4", children: error })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-row justify-between items-center", children: [_jsx("h3", { className: "text-[16px] tablet:text-[20px] xl-screen:text-[22px]  text-textPrimary font-bold", children: title }), _jsx("p", { className: "text-[12px] tablet:text-[14px] xl-screen:text-[16px]  text-primary font-semibold cursor-pointer", onClick: () => handleSelect(sortBy), children: `See all ${listName} events` })] }), _jsx("div", { className: "w-[100%] flex flex-col tablet:flex-row tablet:justify-between mt-6 tablet:mt-4 desktop:mt-8 ", children: events.map((event, i) => (_jsx(LandingEventCard, { event: event, handleClick: handleEventClick }, i))) })] })) }));
};
export default EventDisplayContainer;
