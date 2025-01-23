import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";
const UserGroups = () => {
    const { user, userGroups, loading, error, getUserGroups } = useUser();
    const { isMobile } = useScreenWidth();
    const [searchParams] = useSearchParams();
    const handleGroupClick = useHandleGroupClick();
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy");
    console.log("Search Params:", category, sortBy);
    useEffect(() => {
        const params = {
            category,
            sortBy,
        };
        getUserGroups(params);
    }, [category, sortBy]);
    return (_jsxs("div", { className: "w-full min-h-screen bg-bgSecondary px-6 desktop:px-0 pb-6", children: [isMobile && (_jsxs("h2", { className: "text-[14px] font-bold text-textPrimary mb-4 mr-auto mt-4", children: ["Your groups (", _jsx("span", { className: "text-primary", children: userGroups?.length || 0 }), ")"] })), loading ? (_jsx("div", { className: "flex justify-center items-center h-[200px]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : userGroups?.length > 0 ? (_jsx("div", { className: "w-full flex flex-wrap gap-4", children: userGroups.map((group) => (_jsx(HomeGroupsCard, { group: group, handleClick: handleGroupClick }, group.id))) })) : (!loading && (_jsx("div", { className: "w-full text-gray-500 text-center mt-4", children: "No groups found." })))] }));
};
export default UserGroups;
