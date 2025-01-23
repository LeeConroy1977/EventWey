import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGroup } from "../../contexts/GroupContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import GroupEventCard from "./GroupEventCard";
const GroupEvents = () => {
    const { group, groupEvents } = useGroup();
    const handleEventClick = useHandleEventClick();
    const eventsLength = groupEvents.length;
    return (_jsx("div", { className: "w-[100%] min-h-[8rem] bg-bgPrimary  mt-0 tablet:mt-8 rounded-lg tablet:p-6  desktop:p-10 desktop:pb-10", children: group && (_jsxs(_Fragment, { children: [_jsxs("h3", { className: "text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5", children: ["Upcoming Events (", _jsx("span", { className: "text-primary", children: eventsLength || 0 }), ")"] }), groupEvents.length > 0 ? (groupEvents.map((event, i) => {
                    return (_jsx(GroupEventCard, { event: event, handleClick: handleEventClick }, i));
                })) : (_jsx("p", { children: "No Upcoming Events To Show..." }))] })) }));
};
export default GroupEvents;
