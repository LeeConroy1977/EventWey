import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import createGroup3 from "../../assets/images/createGroup3.jpeg";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
const CreateGroupCategory = () => {
    const { nextStep, newEvent, setNewEvent, categories, getAllCatgories } = useCreateEventContext();
    const [eventCategory, setEventCategory] = useState("");
    useEffect(() => {
        (async () => {
            await getAllCatgories();
        })();
    }, []);
    const handleCategoryChange = (e) => {
        setEventCategory(e.target.value);
    };
    const handleSubmit = () => {
        if (eventCategory) {
            setNewEvent((prevEvent) => ({
                ...prevEvent,
                category: eventCategory.toLowerCase(),
            }));
            nextStep();
        }
    };
    console.log(eventCategory);
    return (_jsx("div", { className: "flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg", children: _jsxs("main", { className: "w-full h-full flex", children: [_jsx("section", { className: "w-[50%] h-[100%] flex flex-col items-center overflow-hidden", children: _jsx("img", { src: createGroup3, alt: "Sign Up Illustration", className: "w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg" }) }), _jsxs("section", { className: "w-[50%] h-[100%] flex flex-col items-center rounded-lg", children: [_jsx("h1", { className: "text-textPrimary text-[32px] font-semibold mt-12", children: "Add a group type" }), _jsx("h2", { className: "w-[70%] text-textPrimary text-[16px] font-semibold mt-8", children: "* Add a group category." }), _jsxs("div", { className: "mt-12 w-[70%]", children: [_jsx("label", { htmlFor: "category", className: "text-textPrimary font-semibold ", children: "Group Category" }), _jsxs("select", { id: "category", value: eventCategory, onChange: handleCategoryChange, className: "w-full mt-2 p-2 border-2 border-gray-300 rounded-lg text-textPrimary focus:outline-none", "aria-label": "Select Group Category", children: [_jsx("option", { value: "", disabled: true, children: "Select a category" }), (categories || []).map((category, index) => (_jsx("option", { value: category, className: "bg-bgPrimary hover:bg-primary hover:text-white", children: category }, index)))] })] }), _jsx("div", { className: "mt-auto mb-12", children: _jsx(Button, { handleClick: handleSubmit, isDisabled: !eventCategory, bgColour: eventCategory ? "bg-secondary" : "bg-gray-300", py: "py-3", px: "px-12", fontSize: "text-14px", children: "Add category" }) })] })] }) }));
};
export default CreateGroupCategory;
