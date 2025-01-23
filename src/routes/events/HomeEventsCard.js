import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const HomeEventsCard = ({ event, handleClick, }) => {
    const { isUserAttendingEvent } = useUser();
    const { isMobile } = useScreenWidth();
    const { id, image, date, title, description, groupName, going, free, priceBands, startTime, approved, } = event;
    const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
    const isAttending = isUserAttendingEvent(event?.id);
    let filteredDescription = description[0];
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
    return (_jsxs("div", { onClick: () => handleClick(id), className: "relative flex flex-col tablet:flex-row items-center w-[100%] tablet:h-[210px] desktop:h-[240px]  xl-screen:h-[280px] bg-white tablet:p-3 desktop:p-4  border-gray-200 rounded-lg mt-4  border-[1px] cursor-pointer", children: [_jsx("img", { src: image, alt: title, className: "w-[100%] h-[200px] tablet:w-[40%] tablet:h-[90%] tablet:ml-2 rounded-tl-lg rounded-tr-lg tablet:rounded-lg " }), _jsxs("div", { className: "w-[100%] tablet:w-[60%] h-[56%] tablet:h-[90%]  flex flex-col justify-between  p-3 py-4 tablet:px-0 tablet:py-0 tablet:p-3 tablet:pl-8 tablet:pt-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-[10px] desktop:text-[12px] xl-screen:text-[14px]  text-secondary  font-bold desktop:font-medium", children: [formattedDate, " . ", startTime] }), _jsx("h2", { className: "text-[16px] desktop:text-[18px] xl-screen:text-[22px]  font-bold text-textPrimary mt-1", children: title }), _jsxs("p", { className: "text-[9px] desktop:text-[11px] xl-screen:text-[14px]   font-semibold text-textPrimary mt-1 desktop:mt-2", children: ["Hosted by:", " ", _jsx("span", { className: "text-[#5D9B9B] ml-1 desktop:ml-2", children: groupName })] }), _jsx("p", { className: "text-[10px] desktop:text-[11px] xl-screen:text-[14px]   font-semibold text-textPrimary mt-3 tablet:mt-2 pr-4 xl-screen:pr-16", children: filteredDescription })] }), _jsxs("div", { className: "flex items-center w-[100%] h-[25%] mt-4 mb-1 tablet:mb-0 tablet:mt-auto", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(IoPerson, { className: "text-[#D66E6E] text-[15px] desktop:text-[18px] xl-screen:text-[20px]" }), _jsxs("p", { className: "ml-2 tablet:ml-1 desktop:ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-semibold text-[#2C3E50]", children: [going, " going"] })] }), _jsxs("div", { className: "flex items-center ml-4 tablet:ml-2 desktop:ml-4", children: [_jsx(IoMdPricetag, { className: "text-[#5D9B9B] text-[15px] desktop:text-[18px] xl-screen:text-[20px]" }), _jsx("p", { className: "ml-2 tablet:ml-1 desktop:ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[14px]  font-semibold text-[#2C3E50]", children: eventPrices })] })] }), !isMobile && (_jsx("button", { className: `tablet:w-[74px] tablet:h-[30px] desktop:w-[100px] xl-screen:w-[120px]  desktop:h-[34px]  xl-screen:h-[40px]  ml-auto desktop:mr-4 flex items-center justify-center  tablet:text-[9px] desktop:text-[11px] xl-screen:text-[13px] xl-screen:mr-4 font-semibold rounded-lg ${isAttending
                                    ? "bg-bgPrimary border-2 border-primary text-primary"
                                    : free
                                        ? "bg-[#5D9B9B] text-white"
                                        : "bg-[#5D9B9B] text-white"}`, children: !approved
                                    ? "Review Event"
                                    : isAttending
                                        ? "Going"
                                        : free
                                            ? "Join Event"
                                            : "Get Tickets" }))] })] })] }));
};
export default HomeEventsCard;
