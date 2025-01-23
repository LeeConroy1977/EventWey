import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
const LandingEventCard = ({ event, handleClick }) => {
    const { id, image, date, title, description, groupName, duration, going, availability, free, priceBands, startTime, } = event;
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
    let filteredDescription = description[0];
    const eventPrices = getPriceRange(priceBands);
    const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
    return (_jsx("div", { className: "w-[100%] tablet:w-[23.5%] tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] flex flex-col bg-bgPrimary rounded-lg cursor-pointer border-[1px] border-gray-200 mb-6 desktop:mb-0", onClick: () => handleClick(id), children: event && (_jsxs(_Fragment, { children: [_jsx("img", { src: image, alt: "", className: "w-[100%] h-[200px] tablet:h-[140px] desktop:h-[160px] xl-screen:h-[200px] rounded-tl-lg rounded-tr-lg" }), _jsxs("div", { className: "w-[100%] h-[56%] flex flex-col p-3 py-4 tablet:py-3 xl-screen:p-4", children: [_jsxs("p", { className: "text-[10px] desktop:text-[11px] xl-screen:text-[12px] text-secondary font-bold  ", children: [formattedDate, " . ", startTime] }), _jsx("h4", { className: "text-textPrimary font-bold text-[16px] tablet:text-[13px] desktop:text-[16px] xl-screen:text-[18px]  mt-1", children: title }), _jsxs("p", { className: "text-[9px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-textPrimary mt-1", children: ["Hosted by: ", _jsx("span", { className: "text-primary ml-1", children: groupName })] }), _jsx("p", { className: "text-[10px] tablet:text-[9px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-textPrimary mobile:mt-3 tablet:mt-2 desktop:mt-3 pr-4", children: filteredDescription }), _jsxs("div", { className: "flex items-center mt-4 tablet:mt-auto mb-1 tablet:mb-0", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(IoPerson, { className: "text-[#D66E6E] text-[15px] desktop:text-[16px] xl-screen:text-[17px] " }), _jsxs("p", { className: "ml-2 text-[10px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-[#2C3E50]", children: [going, " going"] })] }), _jsxs("div", { className: "flex items-center ml-4", children: [_jsx(IoMdPricetag, { className: "text-[#5D9B9B] text-[15px] desktop:text-[16px] xl-screen:text-[17px] " }), _jsx("p", { className: "ml-2 text-[10px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-[#2C3E50]", children: eventPrices })] })] })] })] })) }));
};
export default LandingEventCard;
