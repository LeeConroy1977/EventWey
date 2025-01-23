import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const steps = 6;
const StepIndicator = ({ currentStepNum }) => {
    return (_jsxs("div", { className: "flex flex-col items-center w-[40%] mt-4", children: [_jsx("progress", { value: currentStepNum, max: steps, className: "w-full h-2 appearance-none" }), _jsxs("p", { className: "mt-2 text-textPrimary", children: ["Step ", currentStepNum, " of ", steps] })] }));
};
export default StepIndicator;
