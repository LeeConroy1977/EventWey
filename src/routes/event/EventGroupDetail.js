import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";
const EventGroupDetail = ({ eventGroup, handleClick }) => {
    const { user } = useUser();
    const { id, name, image, description, members, openAccess } = eventGroup || {};
    const isMember = user?.groups?.includes(id);
    const buttonText = isMember
        ? "Member"
        : openAccess
            ? "Join Group"
            : "Request Access";
    return (_jsxs("div", { className: "w-[100%] tablet:h-[10rem] desktop:h-[11rem] xl-screen:h-[13rem] flex bg-bgPrimary  rounded-lg tablet:px-6 desktop:px-8 tablet:py-4 desktop:py-5 cursor-pointer", onClick: () => handleClick(id), children: [_jsx("img", { src: image, alt: name, className: "w-[31%] h-[100%] rounded-lg" }), _jsxs("div", { className: "w-[69%] h-[100%] flex flex-col pl-8 py-1", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-textPrimary tablet:text-[15px] desktop:text-[16px] xl-screen:text-[20px] font-bold", children: name }), _jsxs("p", { className: "text-textPrimary tablet:text-[10px] desktop:text-[11px] xl-screen:text-[14px]  font-semibold mt-1", children: [openAccess ? "Public" : "Private", " Group"] }), _jsx("p", { className: "w-[70%] text-primary tablet:text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-medium mt-2", children: description && description[0] })] }), _jsxs("div", { className: "flex items-center mt-auto", children: [_jsx(IoPerson, { className: "text-secondary tablet:text-[13px] desktop:text-[14px] xl-screen:text-[16px]" }), _jsxs("p", { className: "ml-2 text-[10px] xl-screen:text-[12px] font-semibold text-[#2C3E50]", children: [members && members.length, " Members"] }), _jsx("button", { className: `tablet:w-[88px] tablet:h-[32px] desktop:w-[100px]  desktop:h-[36px]  xl-screen:w-[120px] xl-screen:h-[44px] mt-auto tablet:mb-0 desktop:mb-1 ml-auto  flex items-center justify-center tablet:text-[9px] desktop:text-[10px] xl-screen:text-[11px] font-semibold rounded-lg ${isMember
                                    ? "bg-bgPrimary border-2 border-primary text-primary"
                                    : "bg-secondary text-white"}`, children: buttonText })] })] })] }));
};
export default EventGroupDetail;
