import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useUser } from "../../contexts/UserContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import { ClipLoader } from "react-spinners";
const ProfileGroups = () => {
    const { userGroups, loading, error } = useUser();
    const handleGroupClick = useHandleGroupClick();
    const groupsLength = userGroups?.length;
    return (_jsxs("div", { className: "w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10", children: [_jsxs("h3", { className: "font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8", children: ["Your Groups (", _jsx("span", { className: "text-primary", children: groupsLength }), ")"] }), loading ? (_jsx("div", { className: "w-full flex justify-center items-center h-[100px]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : groupsLength > 0 ? (_jsx("div", { className: "flex flex-row items-start justify-start gap-3 flex-wrap", children: userGroups.map((group) => (_jsx(HomeGroupsCard, { group: group, handleClick: handleGroupClick }, group.id))) })) : (!loading && (_jsx("p", { className: "text-gray-500 text-center", children: "No groups to show..." })))] }));
};
export default ProfileGroups;
