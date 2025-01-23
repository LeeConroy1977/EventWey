import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { ClipLoader } from "react-spinners";
const ConnectionEvents = () => {
    const { connection, connectionEvents, loading, error } = useConnection();
    const handleEventClick = useHandleEventClick();
    const eventsLength = connectionEvents?.length;
    const firstName = connection?.username.split(" ")[0];
    return (_jsxs("div", { className: "w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10", children: [_jsxs("h3", { className: "font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8", children: [`${firstName}'s Upcoming Events`, " (", _jsx("span", { className: "text-primary", children: eventsLength }), ")"] }), loading ? (_jsx("div", { className: "w-full flex justify-center items-center h-[100px]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : eventsLength > 0 ? (_jsx("div", { className: "flex flex-col gap-4", children: connectionEvents.map((event, index) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, index))) })) : (!loading &&
                eventsLength > 0 && (_jsx("p", { className: "text-gray-500 text-center", children: "No Upcoming Events To Show..." })))] }));
};
export default ConnectionEvents;
