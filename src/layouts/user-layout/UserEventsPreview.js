import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import EventsPreviewCard from "./EventsPreviewCard";
import { useEffect } from "react";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import { useUser } from "../../contexts/UserContext";
import { ClipLoader } from "react-spinners";
const UserEventsPreview = () => {
    const { userTotalEvents, getUserTotalEvents, loading, error } = useUser();
    const navigate = useNavigate();
    const handleEventClick = useHandleEventClick();
    const eventsLength = Array.isArray(userTotalEvents)
        ? userTotalEvents.length
        : 0;
    const slicedEvents = Array.isArray(userTotalEvents)
        ? userTotalEvents
            .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
        })
            .slice(0, 3)
        : [];
    useEffect(() => {
        if (getUserTotalEvents) {
            getUserTotalEvents();
        }
    }, []);
    function handleNavigation() {
        navigate("/user/my-events");
    }
    return (_jsxs("div", { className: "w-[100%] min-h-[380px] xl-screen:min-h-[300px] flex flex-col rounded-lg bg-white p-4 xl-screen:p-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("h3", { className: "font-bold text-textPrimary tablet:text-[14px] desktop:text-[16px] xl-screen:text-[18px]", children: ["Your Events (", _jsx("span", { className: "text-primary", children: eventsLength || 0 }), ")"] }), _jsx("p", { className: "text-[12px] xl-screen:text-[14px] font-semibold text-primary cursor-pointer", onClick: handleNavigation, children: "Show all" })] }), _jsxs("div", { className: "mt-4 space-y-4", children: [loading && (_jsx("div", { className: "flex items-center justify-center h-[250px] mx-auto  my-auto", children: _jsx(ClipLoader, { size: 60, color: "#5d9b9b" }) })), error && (_jsx("p", { className: "text-red-500 text-center", children: "Something went wrong. Please try again later." })), !loading && !error && slicedEvents.length > 0
                        ? slicedEvents.map((event) => (_jsx(EventsPreviewCard, { event: event, handleClick: handleEventClick }, event.id)))
                        : !loading &&
                            !error && (_jsx("p", { className: "text-gray-500 text-center", children: "No upcoming events" }))] })] }));
};
export default UserEventsPreview;
