import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
const CreateEventTags = () => {
    const { nextStep, setNewEvent, getTags, categoryTags } = useCreateEventContext();
    const [isValidTags, setIsValidTags] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    useEffect(() => {
        getTags();
    }, []);
    useEffect(() => {
        handleValidTags();
    }, [tags]);
    function handleValidTags() {
        if (tags.length > 2) {
            setIsValidTags(true);
        }
        else {
            setIsValidTags(false);
        }
    }
    function handleSubmit() {
        if (isValidTags) {
            setNewEvent((prevEvent) => ({
                ...prevEvent,
                tags: [...tags],
            }));
            nextStep();
        }
        return;
    }
    function handleTagClick(name) {
        const isSelected = selectedTags.includes(name);
        if (isSelected) {
            setSelectedTags(selectedTags.filter((tag) => tag !== name));
            setTags(tags.filter((tag) => tag !== name));
        }
        else {
            setSelectedTags([...selectedTags, name]);
            setTags([...tags, name]);
        }
    }
    return (_jsx("div", { className: "flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg", children: _jsxs("main", { className: "w-full h-full flex", children: [_jsx("section", { className: "w-[50%] min-h-[80%] flex flex-col items-center", children: _jsx("div", { className: "w-[84%] h-[640px] flex justify-start items-start flex-wrap gap-3 p-6 rounded-lg bg-bgPrimary border-2 border-gray-200 mt-16 overflow-y-scroll", children: categoryTags
                            .sort((a, b) => a.localeCompare(b))
                            .map((tag, i) => (_jsx("div", { className: `flex items-center justify-center text-textPrimary text-[10px] font-semibold px-4 py-2 rounded-full border-[1px] border-gray-200 cursor-pointer ${selectedTags.includes(tag)
                                ? "bg-primary text-white"
                                : "bg-bgSecondary"}`, onClick: () => handleTagClick(tag), children: tag }, i))) }) }), _jsxs("section", { className: "w-[50%] h-[100%] flex flex-col items-center rounded-lg", children: [_jsx("h1", { className: "text-textPrimary text-[32px] font-semibold mt-12", children: "Who will be intested in this event?" }), _jsx("h2", { className: "w-[70%] text-textPrimary text-[16px] font-medium mt-8", children: "* Select at least 3 tags." }), _jsx("div", { className: "w-[70%] h-[400px] flex flex-wrap gap-2 items-start bg-bgPrimary p-4 mt-10 border-2 border-gray-200 rounded-lg overflow-y-auto", children: _jsx("div", { className: "h-auto  flex flex-wrap gap-3 items-start ", children: tags?.map((tag, i) => (_jsx("div", { className: "flex items-center justify-center text-textPrimary text-[10px] font-semibold px-4 py-2 bg-bgSecondary rounded-full border-[1px] border-gray-200 cursor-pointer", children: tag }, i))) }) }), _jsx("div", { className: "mt-auto mb-12", children: _jsx(Button, { handleClick: handleSubmit, isDisabled: !isValidTags, bgColour: isValidTags ? "bg-secondary" : "bg-gray-300", py: "py-3", px: "px-12", fontSize: "text-14px", children: "Add tags" }) })] })] }) }));
};
export default CreateEventTags;
