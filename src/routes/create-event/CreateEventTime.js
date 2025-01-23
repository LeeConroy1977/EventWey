import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const CreateEventTime = () => {
    const { nextStep, setNewEvent } = useCreateEventContext();
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [durationHours, setDurationHours] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [isValid, setIsValid] = useState("");
    const { isMobile } = useScreenWidth();
    useEffect(() => {
        if (date && startTime && durationHours) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }, [date, startTime, durationHours]);
    const handleSubmit = () => {
        if (!isValid) {
            return;
        }
        const timestamp = new Date(date).getTime();
        let duration = `${durationHours} hrs`;
        if (durationMinutes && durationMinutes !== "0") {
            duration += ` ${durationMinutes} mins`;
        }
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            date: timestamp,
            startTime,
            duration,
        }));
        nextStep();
    };
    console.log(date, startTime, durationHours);
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg", children: _jsxs("main", { className: "w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0", children: [!isMobile && (_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center overflow-hidden", children: _jsx("img", { src: createGroup2, alt: "Sign Up", className: "w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg" }) })), _jsxs("section", { className: "mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ", children: [_jsx("h1", { className: "text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0", children: "Add the time and date" }), _jsx("h2", { className: " mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8", children: "* Please select a date, start time and the duration of the event..." }), _jsxs("div", { className: "mobile:w-[100%] tablet:w-[70%] mobile:h-[68%] tablet:h-[70%] desktop:h-[60%] flex flex-col items-center justify-center gap-2 mt-6 p-4 border rounded-lg", children: [_jsx("label", { className: "w-[90%] font-semibold text-[14px] tablet:mt-6 desktop:mt-5", children: "Event Date:" }), _jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "w-[90%] border p-2 rounded text-[14px] focus:outline-none" }), _jsx("label", { className: "w-[90%] font-semibold text-[14px] mobile:mt-4 tablet:mt-6", children: "Start Time:" }), _jsx("input", { type: "time", value: startTime, onChange: (e) => setStartTime(e.target.value), className: "w-[90%] border p-2 rounded text-[14px] focus:outline-none" }), _jsxs("div", { className: "w-[90%] mt-6", children: [_jsx("label", { className: "font-semibold text-[14px]", children: "Duration:" }), _jsxs("div", { className: "flex gap-4 mt-1", children: [_jsx("input", { type: "number", min: "0", placeholder: "Hours", value: durationHours, onChange: (e) => setDurationHours(e.target.value), className: "w-[48%] border p-2 rounded text-[14px] focus:outline-none" }), _jsx("input", { type: "number", min: "0", max: "59", placeholder: "Minutes", value: durationMinutes, onChange: (e) => setDurationMinutes(e.target.value), className: "w-[48%] border p-2 rounded text-[14px] focus:outline-none" })] })] }), _jsx("div", { className: "mobile:mt-8 tablet:mt-6 desktop:mt-8 mt-auto mobile:mb-[40px] tablet:mb-8 desktop:mb-12", children: _jsx(Button, { isDisabled: !isValid, bgColour: !isValid ? "bg-gray-300" : "bg-primary", handleClick: handleSubmit, py: "py-3", px: "px-12", fontSize: "text-14px", children: "Save event details" }) })] })] })] }) }));
};
export default CreateEventTime;
