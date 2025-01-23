import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const CreateEventTickets = () => {
    const { nextStep, setNewEvent } = useCreateEventContext();
    const [isFree, setIsFree] = useState(true);
    const [priceBands, setPriceBands] = useState([
        { type: "EarlyBird", price: "", ticketCount: 0 },
        { type: "Standard", price: "", ticketCount: 0 },
        { type: "VIP", price: "", ticketCount: 0 },
    ]);
    const { isMobile } = useScreenWidth();
    const [totalTickets, setTotalTickets] = useState(0);
    const [selectedPlaces, setSelectedPlaces] = useState(0);
    useEffect(() => {
        const total = priceBands.reduce((sum, band) => sum + Number(band.ticketCount || 0), 0);
        setTotalTickets(total);
    }, [priceBands]);
    const handleFreeToggle = () => {
        setIsFree(!isFree);
        if (!isFree) {
            setPriceBands([
                { type: "EarlyBird", price: "", ticketCount: 0 },
                { type: "Standard", price: "", ticketCount: 0 },
                { type: "VIP", price: "", ticketCount: 0 },
            ]);
            setSelectedPlaces(0);
        }
    };
    const handleBandChange = (index, field, value) => {
        const updatedBands = [...priceBands];
        updatedBands[index] = { ...updatedBands[index], [field]: value };
        setPriceBands(updatedBands);
    };
    const handleSubmit = () => {
        if (!isFree) {
            const isValid = priceBands.some((band) => band.price && band.ticketCount > 0);
            if (!isValid) {
                console.log("Invalid priceBands data");
                return;
            }
        }
        const capacity = isFree ? selectedPlaces : totalTickets;
        const availability = isFree ? selectedPlaces : totalTickets;
        console.log("Setting new event:", {
            free: isFree,
            priceBands: isFree ? [] : priceBands,
            capacity,
            availability,
        });
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            free: isFree,
            priceBands: isFree ? [] : priceBands,
            capacity,
            availability,
        }));
        console.log("Calling next step");
        nextStep();
    };
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg", children: _jsxs("main", { className: "w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0", children: [!isMobile && (_jsx("section", { className: "w-[50%] flex flex-col items-center", children: _jsx("img", { src: createGroup2, alt: "Sign Up", className: "w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg" }) })), _jsxs("section", { className: "mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ", children: [_jsx("h1", { className: "text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0", children: "Set Pricing" }), _jsxs("div", { className: "flex items-center gap-6 mt-16", children: [_jsx("span", { className: isFree ? "text-textPrimary font-semibold" : "text-textSecondary", children: "Free" }), _jsxs("label", { className: "relative flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: !isFree, onChange: handleFreeToggle, className: "sr-only peer focus:outline-none" }), _jsx("div", { className: "w-[200px] h-[50px] pl-2 flex items-center border-2 border-primary rounded-full bg-bgPrimary peer-checked:bg-bgSecondary transition-all" }), _jsx("span", { className: `absolute top-1/2 left-[5px] w-[40px] h-[40px] bg-primary rounded-full transition-transform transform -translate-y-1/2 peer-checked:translate-x-[150px]` })] }), _jsx("span", { className: isFree ? "text-textPrimary font-semibold" : "text-textSecondary", children: "Paid" })] }), !isFree && (_jsx("div", { className: "mt-8 w-[80%] flex flex-col gap-6", children: priceBands.map((band, index) => (_jsxs("div", { className: "mb-4 w-full flex flex-col items-center", children: [_jsx("h2", { className: "font-semibold text-[16px]", children: band.type }), _jsxs("div", { className: "flex gap-4 mt-2 w-full justify-center", children: [_jsx("input", { type: "text", placeholder: "Price (\u00A3)", value: band.price, onChange: (e) => handleBandChange(index, "price", e.target.value), className: "w-[40%] border p-2 rounded" }), _jsx("input", { type: "number", min: "0", placeholder: "Tickets", value: band.ticketCount, onChange: (e) => handleBandChange(index, "ticketCount", e.target.value), className: "w-[40%] border p-2 rounded" })] })] }, index))) })), isFree && (_jsxs("div", { className: "mt-16 flex flex-col gap-6 w-[80%] items-center", children: [_jsx("h2", { className: "font-semibold text-[16px]", children: "Number of Available Places" }), _jsx("input", { type: "number", value: selectedPlaces, onChange: (e) => setSelectedPlaces(Number(e.target.value)), min: "0", className: "border p-2 rounded-lg w-[60%] pl-4" })] })), !isFree && (_jsxs("div", { className: "mt-4 text-textPrimary", children: [_jsx("strong", { children: "Total Tickets:" }), " ", totalTickets] })), _jsx("div", { className: "mt-auto mb-12", children: _jsx(Button, { px: "px-12", py: "py-3", handleClick: handleSubmit, children: "Save Pricing" }) })] })] }) }));
};
export default CreateEventTickets;
