import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
const CreateGroupLayout = () => {
    const { state, nextStep, prevStep } = useCreateGroupContext();
    return (_jsxs("div", { className: "flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary p-12 mt-[6rem] rounded-lg", children: [_jsx(StepIndicator, { currentStepNum: state.currentStepNum }), _jsx("main", { children: _jsx(Outlet, {}) }), _jsxs("div", { className: "w-[80%] flex justify-between mt-auto mb-6", children: [_jsx("button", { onClick: prevStep, children: "Prev" }), _jsx("button", { onClick: nextStep, children: "Next" })] })] }));
};
export default CreateGroupLayout;
