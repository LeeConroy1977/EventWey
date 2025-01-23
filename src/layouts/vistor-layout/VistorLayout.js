import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import VistorWrapper from "./VistorWrapper";
import VistorSignUpAdvert from "./VistorSignUpAdvert";
import VistorCreateEventAdvert from "./VistorCreateEventAdvert";
import EventsOptions from "../../components/OptionsContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
const VistorLayout = () => {
    const { isMobile } = useScreenWidth();
    return (_jsxs("div", { className: "w-screen min-h-screen flex flex-col items-center bg-bgSecondary mt-0 desktop:mt-6", children: [!isMobile && _jsx(VistorWrapper, {}), _jsx(EventsOptions, {}), _jsxs("main", { className: "w-screen tablet:w-[86%] desktop:w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary mt-6 tablet:mt-0", children: [!isMobile && (_jsxs("section", { className: "w-[34%] h-[100%] flex flex-col items-center justify-start p-4", children: [_jsx(VistorSignUpAdvert, {}), _jsx(VistorCreateEventAdvert, {})] })), _jsx("section", { className: "flex flex-col justify-start items-start w-screen tablet:w-[86%]  desktop:w-[66%] h-auto desktop:h-[100%] ", children: _jsx(Outlet, {}) })] })] }));
};
export default VistorLayout;
