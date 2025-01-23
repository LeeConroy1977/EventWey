import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
const SelectComponent = ({ defaultOption, optionArray, handleChange, selectedOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSelect = (optionValue) => {
        handleChange({
            target: { value: optionValue },
        });
        setIsOpen(false);
    };
    const handleClickOutside = (e) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const currentSelectedOption = selectedOption || defaultOption;
    const isSelected = currentSelectedOption && currentSelectedOption !== defaultOption;
    return (_jsxs("div", { className: "relative flex ", ref: dropdownRef, children: [_jsxs("button", { onClick: toggleDropdown, className: `tablet:w-[110px] w-[100px] xl-screen:w-[150px] p-2 pl-3 pr-3 mr-0 tablet:mr-5 xl-screen:mr-8  rounded-xl text-[8px] tablet:text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-bold flex justify-between items-center ${isSelected
                    ? "bg-bgSecondary text-textPrimary font-semibold border-2 border-primary "
                    : "text-textPrimary bg-bgSecondary"}`, children: [optionArray.find((opt) => opt.name === currentSelectedOption)?.title ||
                        defaultOption, _jsx(FaChevronDown, { className: "ml-2" })] }), isOpen && (_jsx("ul", { className: "absolute left-0 top-[31px] w-[110px] xl-screen:w-[150px] sm:w-[130px] mt-1 rounded-lg bg-bgPrimary shadow-lg z-10", children: optionArray.map((option, index) => (_jsx("li", { onClick: () => handleSelect(option.name), className: "p-2 text-[10px] xl-screen:text-[14px] font-bold text-primary hover:bg-primary hover:text-white dark:hover:text-white cursor-pointer", children: option.title }, index))) }))] }));
};
export default SelectComponent;
