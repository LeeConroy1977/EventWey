import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useHandleCreateEventClick from "../../hooks/useHandleCreateEventClick";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const VistorWrapper = () => {
    const handleCreateEventClick = useHandleCreateEventClick();
    const { isMobile, isTablet, isSmallLaptop } = useScreenWidth();
    function handleClick() {
        return handleCreateEventClick();
    }
    return (_jsx("div", { className: "w-[100%] tablet:h-[10rem] desktop:h-[10rem] xl-screen:h-[13rem] flex items-center justify-center   bg-[#F6F7F8]", children: _jsxs("div", { className: " tablet:w-[86%] desktop:w-[66%] h-[100%] flex items-center justify-center", children: [_jsxs("h1", { className: "tablet:text-[22px] desktop:text-[28px] font-bold ml-6 text-textPrimary", children: ["Welcome to", " ", _jsx("span", { className: "tablet:text-[24px] desktop:text-[30px] text-primary", children: "EventWey" })] }), _jsx("button", { onClick: handleClick, className: "tablet:text-[12px] desktop:text-[16px] xl-screen:text-[18px] px-8  py-3 xl-screen:px-12 xl-screen:py-4 bg-secondary ml-auto rounded-lg text-textSecondary font-medium", children: "Create an event" })] }) }));
};
export default VistorWrapper;
