import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GoogleCalendarButton from "./GoogleCalendarButton";
const EventConfimation = ({ event }) => {
    return (_jsxs("div", { className: "w-[100%] h-[80%] flex flex-col items-center justify-start ", children: [_jsxs("h1", { className: "text-textPrimary mobile:text-[14px] text-[26px] font-bold mobile:mt-12 tablet:mt-[7rem] mobile:mr-0 tablet:mr-auto mobile:ml-0 tablet:ml-2 text-center", children: ["You have joined the ", _jsx("br", {}), event?.title, " ", _jsx("br", {}), " event"] }), _jsxs("h2", { className: "text-textPrimary font-bold mobile:text-[16px] tablet:text-[28px] mt-6 text-center", children: ["Add this event to your ", _jsx("br", {}), _jsx("span", { className: "text-primary ", children: "Gooole Calendar?" })] }), _jsx(GoogleCalendarButton, { eventDetails: event })] }));
};
export default EventConfimation;
