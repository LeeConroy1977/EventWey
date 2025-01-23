import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoPerson } from "react-icons/io5";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
const GroupsPreviewCard = ({ group }) => {
    const { id, name, image, description, members } = group;
    const handleGroupClick = useHandleGroupClick();
    let filteredDesc = description[0];
    filteredDesc = filteredDesc.replaceAll("**", "");
    return (_jsxs("div", { className: "w-[100%] h-[5.8rem] xl-screen:h-[7rem] flex items-center rounded-lg cursor-pointer", onClick: () => handleGroupClick(id), children: [_jsx("img", { src: image, alt: "", className: "w-[34%] h-[84%] ml-2 rounded-lg" }), _jsxs("div", { className: "w-[66%] h-[100%] p-2 pl-4 flex flex-col", children: [_jsx("h3", { className: "text-[13px] xl-screen:text-[15px] text-textPrimary font-bold", children: name }), _jsx("p", { className: "text-[9px] xl-screen:text-[12px] text-primary font-medium mt-1", children: filteredDesc }), _jsxs("div", { className: "flex items-center mt-auto mb-1", children: [_jsx(IoPerson, { className: "text-secondary text-[12px] xl-screen:text-[13px] " }), _jsxs("p", { className: "ml-2 text-[8px] xl-screen:text-[10px]  font-semibold text-[#2C3E50]", children: [members.length, " Members"] })] })] })] }));
};
export default GroupsPreviewCard;
