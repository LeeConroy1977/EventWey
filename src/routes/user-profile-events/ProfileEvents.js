import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUser } from "../../contexts/UserContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { ClipLoader } from "react-spinners";
const ProfileEvents = () => {
    const { userEvents, loading, error } = useUser();
    const handleEventClick = useHandleEventClick();
    const eventsLength = userEvents?.length;
    return (_jsxs("div", { className: "w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10", children: [_jsxs("h3", { className: "font-bold text-textPrimary mobile:text-[14px] tablet:text-[1rem] xl-screen:text-[18px] mb-8", children: ["Your Upcoming Events (", _jsx("span", { className: "text-primary", children: eventsLength }), ")"] }), loading ? (_jsx("div", { className: "w-full flex justify-center items-center h-[100px]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : eventsLength > 0 ? (_jsx("div", { className: "w-full flex flex-col gap-4", children: userEvents.map((event, i) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, i))) })) : (!loading && (_jsx("p", { className: "text-gray-500 text-center", children: "You have no upcoming events to show..." })))] }));
};
export default ProfileEvents;
