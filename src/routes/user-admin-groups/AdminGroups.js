import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useGroups } from "../../contexts/GroupsContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "../groups/HomeGroupsCard";
import { ClipLoader } from "react-spinners";
const AdminGroups = () => {
    const { fetchReviewGroups, reviewGroups, loading, error } = useGroups();
    const handleGroupClick = useHandleGroupClick();
    useEffect(() => {
        fetchReviewGroups({});
    }, []);
    return (_jsxs("div", { className: "w-full min-h-screen bg-bgSecondary mt-6 tablet:mt-0 px-6 tablet:px-0 tablet:mb-4", children: [loading && (_jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })), error && (_jsx("div", { className: "text-red-500 text-center mt-6", children: _jsx("p", { children: "Something went wrong. Please try again later." }) })), !loading &&
                !error &&
                reviewGroups &&
                reviewGroups.length > 0 &&
                reviewGroups.map((group) => (_jsx(HomeGroupsCard, { group: group, handleClick: handleGroupClick }, group.id))), !loading && !error && reviewGroups && reviewGroups.length === 0 && (_jsx("div", { className: "text-center text-gray-500 mt-6", children: _jsx("p", { children: "No groups available for review at the moment." }) }))] }));
};
export default AdminGroups;
