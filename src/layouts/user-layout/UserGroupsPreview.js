import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import GroupsPreviewCard from "./GroupsPreviewCard";
import { ClipLoader } from "react-spinners";
const UserGroupsPreview = () => {
    const { userTotalGroups, loading, error, getUserGroups, userGroups, getUserTotalGroups, } = useUser();
    const navigate = useNavigate();
    const groupsLength = Array.isArray(userTotalGroups)
        ? userTotalGroups.length
        : 0;
    const slicedGroups = Array.isArray(userTotalGroups)
        ? userTotalGroups
            .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
        })
            .slice(0, 3)
        : [];
    useEffect(() => {
        getUserTotalGroups();
    }, []);
    function handleNavigation() {
        navigate("/user/my-groups");
    }
    return (_jsxs("div", { className: "w-[100%] min-h-[380px] flex flex-col rounded-lg bg-white p-4 mt-4 xl-screen:p-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("h3", { className: "font-bold text-textPrimary tablet:text-[14px] desktop:text-[16px] xl-screen:text-[18px]", children: ["Your groups (", _jsx("span", { className: "text-primary", children: groupsLength || 0 }), ")"] }), _jsx("p", { className: "text-[12px] xl-screen:text-[14px] font-semibold text-primary cursor-pointer", onClick: handleNavigation, children: "Show all" })] }), _jsxs("div", { className: "mt-4 space-y-4", children: [loading && (_jsx("div", { className: "flex items-center justify-center h-[300px] mx-auto  my-auto", children: _jsx(ClipLoader, { size: 60, color: "#5d9b9b" }) })), error && (_jsx("p", { className: "text-red-500 text-center w-full", children: "Something went wrong. Please try again later." })), !loading &&
                        !error &&
                        slicedGroups.length > 0 &&
                        slicedGroups.map((group) => (_jsx(GroupsPreviewCard, { group: group }, group.id))), !loading && !error && slicedGroups.length === 0 && (_jsx("p", { className: "text-gray-500 text-center w-full", children: "You are not part of any groups yet." }))] })] }));
};
export default UserGroupsPreview;
