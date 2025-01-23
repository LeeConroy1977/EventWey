import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useGroups } from "../../contexts/GroupsContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "./HomeGroupsCard";
import { ClipLoader } from "react-spinners";
const Home = () => {
    const { groups, setGroups, fetchGroups, loading, error } = useGroups();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy");
    const handleGroupClick = useHandleGroupClick();
    useEffect(() => {
        const params = {
            category,
            sortBy,
        };
        fetchGroups(params);
    }, [category, sortBy]);
    return (_jsxs("div", { className: "w-full min-h-screen bg-bgSecondary mt-6 tablet:mt-0 px-6 tablet:px-0 tablet:mb-4", children: [loading && (_jsx("div", { className: "flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })), error && (_jsx("div", { className: "text-red-500 text-center mt-4", children: "Something went wrong. Please try again later." })), !loading && !error && (!groups || groups.length === 0) && (_jsx("div", { className: "text-center mt-4 text-gray-500", children: "No groups found." })), !loading &&
                !error &&
                groups &&
                groups.length > 0 &&
                groups.map((group) => (_jsx(HomeGroupsCard, { group: group, handleClick: handleGroupClick }, group.id)))] }));
};
export default Home;
