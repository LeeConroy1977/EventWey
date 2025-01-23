import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { useEventModal } from "../../contexts/EventModelContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import EventOptionsContainer from "../../layouts/user-layout/EventOptionsContainer";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
const EventWrapper = ({ event, handleApproveEvent, handleRemoveEvent }) => {
    const { user, isUserAttendingEvent } = useUser();
    const { isMobile } = useScreenWidth();
    const handleGroupClick = useHandleGroupClick();
    const { id } = useParams();
    const { image, date, title, description, groupName, duration, going, availability, free, priceBands, tags, location, startTime, groupId, approved, } = event;
    const { openEventModal } = useEventModal();
    const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
    const handleJoinEvent = () => openEventModal(event, "join");
    const handleGetTickets = () => openEventModal(event, "tickets");
    const handleCancelAttendance = () => openEventModal(event, "cancel");
    const isAttending = isUserAttendingEvent(id);
    function getPriceRange(priceArr) {
        if (free)
            return "Free";
        if (!priceArr || priceArr.length === 0)
            return "No price available";
        const sortedPrice = priceArr.sort((a, b) => a.price - b.price);
        if (priceArr.length === 1)
            return `${sortedPrice[0].price}`;
        return `${sortedPrice[0].price} - ${sortedPrice[sortedPrice.length - 1].price}`;
    }
    const eventPrices = getPriceRange(priceBands);
    return (_jsx("div", { className: "w-[100%] h-auto tablet:h-[18rem] desktop:h-[21rem] xl-screen:h-[25rem] flex flex-col tablet:flex-row items-center justify-center  bg-bgPrimary border-b-2 border-gray-200 p-6 desktop:p-8", children: _jsxs("div", { className: " w-full tablet:w-[94%] desktop:w-[66%] h-[100%] flex flex-col tablet:flex-row items-center justify-center mt-0  tablet:mt-6 ", children: [_jsx("div", { className: "h-[100%] w-full tablet:w-[50%] flex items-center justify-center ", children: _jsx("img", { src: image, alt: "", className: "w-full h-[100%] tablet:w-[90%] tablet:h-[92%] rounded-lg " }) }), _jsxs("div", { className: "w-full tablet:w-[50%] h-[100%] flex flex-col items-center justify-start pl-0 p-0 tablet:pl-12 desktop:pl-16 tablet:p-2", children: [_jsxs("p", { className: "text-[12px] desktop:text-[14px] xl-screen:text-[18px] font-semibold text-secondary mt-4 tablet:mt-3 mr-auto", children: [formattedDate, " @ ", startTime] }), _jsx("h1", { className: "text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold  text-[#2C3E50] mt-2 mr-auto", children: title }), isMobile && (_jsxs("p", { className: "text-[12px] desktop:text-[14px]  font-semibold mt-2 mr-auto", children: ["Hosted by:", _jsxs("span", { onClick: () => handleGroupClick(groupId), className: "font-semibold text-primary ml-2", children: [" ", groupName] })] })), _jsxs("p", { className: "text-[12px] desktop:text-[14px] xl-screen:text-[18px] font-semibold mt-2 mr-auto", children: ["Location:", _jsxs("span", { className: "font-semibold text-textPrimary desktop:text-primary ml-2", children: [" ", location.placename] })] }), _jsx("p", { className: "mt-3 desktop:mt-3 text-[12px] desktop:text-[14px] xl-screen:text-[16px] font-semibold mr-auto", children: description[0] }), isMobile && _jsx(EventOptionsContainer, {}), !isMobile && !approved && (_jsxs("div", { className: "flex mr-auto mt-auto mb-1 desktop:h-[66px]", children: [_jsx("button", { onClick: handleApproveEvent, className: "w-[110px]  desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto  flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 bg-primary text-white\n              ", children: "Approve Group" }), _jsx("button", { onClick: () => handleRemoveEvent(id), className: "w-[110px]  desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto  flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 bg-secondary text-white tablet:ml-8\n              ", children: "Reject Group" })] })), !isMobile && approved && (_jsx("button", { onClick: isAttending
                                ? () => handleCancelAttendance()
                                : free
                                    ? () => handleJoinEvent()
                                    : () => handleGetTickets(), className: `w-[110px]  desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto  flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 ${isAttending
                                ? "bg-bgPrimary border-2 border-primary text-primary"
                                : free
                                    ? "bg-secondary text-white"
                                    : "bg-secondary text-white"}`, children: isAttending ? "Going" : free ? "Join Event" : "Get Tickets" }))] })] }) }));
};
export default EventWrapper;
