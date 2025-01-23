import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tag from "../../reuseable-components/Tag";
const ProfileTags = ({ user }) => {
    const tags = Array.isArray(user?.tags) ? user.tags : [];
    return (_jsxs("div", { className: "w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5", children: "Tags" }) }), _jsx("div", { className: "flex items-start justify-start flex-wrap mt-6 gap-3", children: tags.length > 0 ? (tags.map((tag, index) => _jsx(Tag, { tag: tag }, index))) : (_jsx("p", { className: "text-textSecondary", children: "No tags available" })) })] }));
};
export default ProfileTags;
