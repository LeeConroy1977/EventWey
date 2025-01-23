import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ children, px = "px-4", py = "py-2", ml, bgColour = "bg-primary", textColour = "text-textSecondary", fontSize = "text-[14px]", fontWeight = "font-semibold", borderWidth, borderColour, handleClick, isDisabled, }) => {
    return (_jsx("button", { disabled: isDisabled, onClick: handleClick, className: `${px} ${py} ${ml} ${bgColour} ${textColour} ${fontSize} ${fontWeight} ${borderWidth} ${borderColour} flex justify-center items-center rounded-lg`, children: children }));
};
export default Button;
