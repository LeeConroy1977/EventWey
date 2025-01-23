import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tag from "../../reuseable-components/Tag";
const ConnectionTags = ({ connection }) => {
    return (_jsxs("div", { className: "w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "font-bold text-textPrimary", children: "Tags" }) }), _jsx("div", { className: "flex items-start justify-start flex-wrap mt-6 gap-3", children: connection?.tags.map((tag) => {
                    return _jsx(Tag, { tag: tag });
                }) })] }));
};
export default ConnectionTags;
