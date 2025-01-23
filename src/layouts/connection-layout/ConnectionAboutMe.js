import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConnectionAboutMe = ({ connection }) => {
    return (_jsxs("div", { className: "w-[100%] tablet:min-h-[150px] flex flex-col rounded-lg bg-white mt-4 p-0 tablet:mt-8 tablet:p-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "text-[14px] tablet:text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mobile:mt-4 tablet:mt-0.5", children: "About Me" }) }), _jsx("div", { className: "flex items-start justify-start flex-wrap mt-6 gap-3", children: _jsx("p", { className: "font-normal mobile:text-[13px] tablet:text-[13px] desktop:text-[14px] xl-screen:text-[17px]", children: connection?.aboutMe }) })] }));
};
export default ConnectionAboutMe;
