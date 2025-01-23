import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tag from "../reuseable-components/Tag";
const EventTags = ({ tags }) => {
    return (_jsxs("div", { className: "w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-4", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "text-[1rem] font-bold text-textPrimary", children: "Tags" }) }), _jsx("div", { className: "flex items-start justify-start flex-wrap mt-6 gap-3", children: tags &&
                    tags.length > 0 &&
                    tags.map((tag, i) => _jsx(Tag, { tag: tag }, i)) })] }));
};
export default EventTags;
