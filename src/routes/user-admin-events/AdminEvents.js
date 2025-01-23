import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useEvents } from "../../contexts/EventsContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { ClipLoader } from "react-spinners";
const AdminEvents = () => {
    const { reviewEvents, fetchReviewEvents, loading, error } = useEvents();
    const handleEventClick = useHandleEventClick();
    useEffect(() => {
        fetchReviewEvents({});
    }, []);
    return (_jsxs("div", { className: "w-full min-h-screen bg-bgSecondary mt-6 tablet:mt-0 px-6 tablet:px-0 tablet:mb-4", children: [loading && (_jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })), error && (_jsx("div", { className: "text-red-500 text-center mt-6", children: _jsx("p", { children: "Something went wrong. Please try again later." }) })), !loading &&
                !error &&
                reviewEvents &&
                reviewEvents.length > 0 &&
                reviewEvents.map((event) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, event.id))), !loading && !error && reviewEvents && reviewEvents.length === 0 && (_jsx("div", { className: "text-center text-gray-500 mt-6", children: _jsx("p", { children: "No events available for review at the moment." }) }))] }));
};
export default AdminEvents;
