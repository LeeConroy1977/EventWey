import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import Button from "../reuseable-components/Button";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import EventConfimation from "./EventConfimation";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useScreenWidth } from "../contexts/ScreenWidthContext";
const JoinedEventConfimation = ({ event }) => {
    const { id } = useParams();
    const { image, title, groupName, description, date, going, priceBands, availability, free, } = event;
    const { joinFreeEvent, isUserAttendingEvent } = useUser();
    const [isJoined, setIsJoined] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isAttending, setIsAttending] = useState(false);
    const { isMobile } = useScreenWidth();
    useEffect(() => {
        const checkAttendanceStatus = async () => {
            const attendingStatus = await isUserAttendingEvent(id);
            setIsAttending(attendingStatus);
        };
        checkAttendanceStatus();
    }, [id, setIsAttending, isUserAttendingEvent]);
    function getPriceRange(priceBands) {
        const availablePriceBands = priceBands.filter((priceBand) => priceBand.price && priceBand.ticketCount > 0);
        if (event?.free)
            return "Free";
        if (availablePriceBands.length === 0)
            return "No price available";
        const sortedPriceBands = availablePriceBands.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sortedPriceBands.length === 1)
            return `${sortedPriceBands[0].price}`;
        return `${sortedPriceBands[0].price} - ${sortedPriceBands[sortedPriceBands.length - 1].price}`;
    }
    const handleJoinEvent = async () => {
        console.log("isLoading", isLoading); // Check loading state
        await joinFreeEvent(event.id); // Simulate event join
        setIsJoined(true); // Update joined status
        setLoading(false); // Set loading to false after completion
    };
    const eventPrices = getPriceRange(priceBands);
    return (_jsx("div", { className: "flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg", children: _jsxs("main", { className: "w-full h-full flex", children: [!isMobile && (_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center overflow-hidden ", children: _jsxs("div", { className: "w-[80%] h-[100%] flex flex-col items-center justify-start ", children: [_jsx("img", { className: "w-[100%] tablet:h-[36%] desktop:h-[40%] rounded-lg mt-6", src: image, alt: "" }), _jsx("h1", { className: "text-textPrimary tablet:text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold mt-4 mr-auto ml-2", children: title }), _jsxs("p", { className: "text-textPrimary font-bold tablet:text-[14px] desktop:text-[18px] xl-screen:text-[22px] mr-auto ml-2 mt-4", children: ["Hosted by: ", _jsx("span", { className: "text-primary", children: groupName })] }), _jsx("p", { className: "font-bold text-textPrimary mt-4 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] mr-auto ml-2 pr-3", children: description[0] }), _jsx("p", { className: "font-medium text-textPrimary mt-4 tablet:text-[11px] deskto:text-[13px] xl-screen:text-[15px] mr-auto ml-2 pr-3", children: description[1] }), _jsxs("div", { className: "flex items-center mr-auto mt-auto mb-12 pl-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(IoPerson, { className: "text-[#D66E6E] tablet:text-[16px] desktop:text-[20px] xl-screen:text-[22px]" }), _jsxs("p", { className: "ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-[#2C3E50]", children: [going, " going"] })] }), _jsxs("div", { className: "flex items-center ml-4", children: [_jsx(IoMdPricetag, { className: "text-[#5D9B9B] tablet:text-[17px] desktop:text-[21px] xl-screen:text-[23px]" }), _jsx("p", { className: "ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-[#2C3E50]", children: eventPrices })] })] })] }) })), _jsxs("section", { className: "mobile:full mobile:w-full tablet:w-[50%] h-[100%] flex flex-col items-center rounded-lg mt-8", children: [_jsx("h1", { className: "mobile:text-[28px] tablet:text-[28px] desktop:text-[36px] xl-screen:text-[42px] font-bold text-secondary mt-4", children: "EventWey" }), isLoading ? (_jsx("div", { className: "flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : (_jsx(_Fragment, { children: !isLoading && isJoined ? (_jsx(EventConfimation, { event: event })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "w-full flex flex-col tablet:justify-center items-center ", children: [_jsx("h2", { className: "text-textPrimary mobile:text-[18px]  tablet:text-[20px] desktop:text-[24px] xl-screen:text-[28px] font-bold mobile:mt-12 tablet:mt-[7rem]  ml-2", children: "Confirm your attendance" }), _jsx("h3", { className: "text-primary font-bold mobile:text-[18px]  tablet:text-[22px] desktop:text-[26px] xl-screen:text-[30px] mt-10", children: title })] }), _jsx("div", { className: "mt-auto mb-16", children: _jsx(Button, { handleClick: () => {
                                                setLoading(true);
                                                handleJoinEvent();
                                            }, px: "px-12", py: "py-3", bgColour: "bg-secondary", children: "Join Event" }) })] })) }))] })] }) }));
};
export default JoinedEventConfimation;
