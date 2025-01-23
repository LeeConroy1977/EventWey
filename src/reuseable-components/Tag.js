import { jsx as _jsx } from "react/jsx-runtime";
const Tag = ({ tag }) => {
    return (_jsx("div", { className: " flex items-center justify-center text-textPrimary tablet:text-[9px] desktop:text-[10px] xl-screen:text-[12px] font-semibold px-4 py-2 bg-bgSecondary rounded-full border-[1px] border-gray-200", children: tag }));
};
export default Tag;
