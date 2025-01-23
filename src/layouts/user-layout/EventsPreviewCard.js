import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
const EventsPreviewCard = ({ event, handleClick, }) => {
    const { id, date, title, groupName } = event;
    const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
    return (_jsxs("div", { onClick: () => handleClick(id), children: [_jsx("p", { className: "text-[12px] xl-screen:text-[13px] text-textPrimary font-semibold ml-3 mb-1 xl-screen:mt-4", children: formattedDate }), _jsxs("div", { className: " h-[4.2rem] xl-screen:h-[5rem] xl-screen:mt-1 p-3  bg-bgSecondary border rounded-md text-textPrimary mb-4 cursor-pointer", children: [_jsx("h4", { className: "text-[13px] xl-screen:text-[15px] font-bold text-textPrimary mb-2 ", children: title }), _jsxs("p", { className: "text-[11px] xl-screen:text-[13px] font-medium text-textPrimary", children: ["Hosted by:", " ", _jsx("span", { className: "text-primary font-semibold cursor-pointer", children: groupName })] })] })] }));
};
export default EventsPreviewCard;
