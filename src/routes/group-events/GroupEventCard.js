import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
const GroupEventCard = ({ event, handleClick }) => {
    const { user } = useUser();
    const { id, image, date, title, description, groupName, duration, going, availability, free, priceBands, startTime, } = event;
    const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
    const isAttending = user?.userEvents?.includes(id);
    let filteredDescription = description[0];
    filteredDescription = filteredDescription.replaceAll("**", "");
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
    return (_jsxs("div", { onClick: () => handleClick(id), className: "relative flex flex-col tablet:flex-row items-center w-[100%] h-auto tablet:h-[170px] desktop:h-[190px] xl-screen:h-[220px] bg-white tablet:p-2 desktop:p-4 border-gray-200 rounded-lg mt-6 border-[1px] cursor-pointer", children: [_jsx("img", { src: image, alt: title, className: "w-[100%] h-[200px]  tablet:w-[40%]  tablet:h-[90%] tablet:ml-2 rounded-tl-lg rounded-tr-lg tablet:rounded-lg" }), _jsxs("div", { className: "w-full tablet:w-[60%] h-[56%] tablet:h-[100%]  flex flex-col justify-between p-3 py-4 tablet:py-0 tablet:pl-8 tablet:pt-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-[10px] desktop:text-[11px] xl-screen:text-[13px] text-secondary   font-bold tablet:font-semibold mt-1", children: [formattedDate, " . ", startTime] }), _jsx("h2", { className: "text-[16px] desktop:text-[17px] xl-screen:text-[19px]  font-bold text-textPrimary mt-1 xl-screen:mt-2", children: title }), _jsx("p", { className: "text-[10px] desktop:text-[11px] xl-screen:text-[13px]  font-semibold text-textPrimary mt-1  desktop:mt-1 xl-screen:mt-2 pr-4", children: filteredDescription })] }), _jsx("div", { className: "flex w-[100%] h-[25%] mt-4 mb-1  tablet:mb-2 xl-screen:mb-4 desktop:mt-auto items-end", children: _jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(IoPerson, { className: "text-[#D66E6E] text-[15px] desktop:text-[17px] xl-screen:text-[19px]" }), _jsxs("p", { className: "ml-2 text-[10px] xl-screen:text-[13px] font-semibold text-[#2C3E50]", children: [going, " going"] })] }), _jsxs("div", { className: "flex items-center ml-4", children: [_jsx(IoMdPricetag, { className: "text-[#5D9B9B] text-[15px] desktop:text-[17px] xl-screen:text-[19px]" }), _jsx("p", { className: "ml-2 text-[10px] xl-screen:text-[13px] font-semibold text-[#2C3E50]", children: eventPrices })] }), !isAttending && (_jsxs("p", { className: "ml-4 text-[10px] text-[#D66E6E] font-semibold", children: [availability, " places left"] }))] }) })] })] }));
};
export default GroupEventCard;
