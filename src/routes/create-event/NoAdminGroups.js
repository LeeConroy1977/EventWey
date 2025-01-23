import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useHandleCreateGroupClick from "../../hooks/useHandleCreateGroupClick";
import Button from "../../reuseable-components/Button";
const NoAdminGroups = () => {
    const handleCreateGroupClick = useHandleCreateGroupClick();
    function handleClick() {
        handleCreateGroupClick();
    }
    return (_jsx("div", { className: "flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary mt-[4rem] rounded-lg", children: _jsxs("main", { className: "w-full h-[100%] flex flex-col items-center bg-bgPrimary", children: [_jsx("h1", { className: "text-[36px] font-bold text-secondary mt-12", children: "EventWey" }), _jsx("h2", { className: "text-[28px] font-semibold text-textPrimary mt-[8rem]", children: "You need to be a group organiser to create an event!" }), _jsxs("h3", { className: "text-[26px] font-semibold text-textPrimary mt-[5rem]", children: ["Start a", " ", _jsx("span", { onClick: handleClick, className: "text-primary cursor-pointer", children: "group" }), " ", "and create some exciting events in Weymouth..."] }), _jsx("div", { className: "mt-auto mb-16", children: _jsx(Button, { handleClick: handleClick, px: "px-12", py: "py-3", children: "Create a group" }) })] }) }));
};
export default NoAdminGroups;
