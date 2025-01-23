import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import GroupNav from "./GroupNav";
import { useGroup } from "../../contexts/GroupContext";
import { useEffect } from "react";
import GroupOrganiserContainer from "./GroupOrganiserContainer";
import EventMapContainer from "../../components/EventMapContainer";
import GroupWrapper from "./GroupWrapper";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { useUser } from "../../contexts/UserContext";
const GroupLayout = () => {
    const { id } = useParams();
    const { isMobile } = useScreenWidth();
    const { user } = useUser();
    const { group, setGroup, groupEvents, setGroupEvents, groupMembers, setGroupMembers, getGroupById, getEventsById, getGroupMembers, updateGroup, removeGroup, location, error, loading, } = useGroup();
    const navigate = useNavigate();
    const { lat, lng, placename } = group?.location || {};
    const isMember = user?.groups?.includes(id);
    const buttonText = isMember
        ? "Member"
        : group?.openAccess
            ? "Join Group"
            : "Request Access";
    function handleApproveGroup() {
        updateGroup("approved", true);
        navigate("/user/admin/groups");
    }
    function handleRemoveGroup(id) {
        removeGroup(id);
        navigate("/user/admin/groups");
    }
    useEffect(() => {
        if (id) {
            getGroupById(id);
            getEventsById(id);
            getGroupMembers(id);
        }
    }, [id]);
    return (_jsxs("div", { className: "w-full min-h-screen flex flex-col items-center bg-bgSecondary", children: [isMobile && !group?.approved && (_jsxs("div", { className: "fixed flex flex-row items-center justify-around bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100", children: [_jsx("button", { onClick: handleApproveGroup, className: "w-[120px] h-[40px]  text-[11px] flex items-center justify-center font-semibold rounded-lg  text-white bg-primary ", children: "Approve Group" }), _jsx("button", { onClick: () => handleRemoveGroup(id), className: "w-[120px] h-[40px] text-[11px] flex items-center justify-center font-semibold rounded-lg  text-white bg-secondary ", children: "Reject Group" })] })), isMobile && group?.approved && (_jsx("div", { className: "fixed flex flex-row items-center justify-between bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100", children: _jsx("button", { className: `w-[110px] h-[36px] ml-auto flex items-center justify-center text-[11px] font-semibold rounded-lg ${isMember
                        ? "bg-bgPrimary border-2 border-primary text-primary"
                        : "bg-secondary text-white"}`, children: buttonText }) })), group && (_jsxs(_Fragment, { children: [_jsx(GroupWrapper, { group: group, handleApproveGroup: handleApproveGroup, handleRemoveGroup: handleRemoveGroup }), _jsxs("main", { className: "w-full m-h-screen tablet:w-[94%]  desktop:w-[66%] desktop:h-auto flex flex-col tablet:flex-row items-start justify-center bg-bgPrimary tablet:bg-bgSecondary px-6 mt-0 tablet:mt-0 tablet:px-0 tablet:p-4 pb-[5rem] ", children: [_jsxs("section", { className: "flex flex-col justify-start items-start w-full tablet:w-[62%] h-auto p-0 tablet:p-4", children: [_jsx(GroupNav, { id: id }), _jsx(Outlet, {})] }), !isMobile && (_jsxs("section", { className: "w-full tablet:w-[38%] h-auto flex flex-col items-center justify-start p-0 pl-0 tablet:p-0 tablet:pl-4 desktop:pl-8 gap-y-4 ", children: [_jsx(GroupOrganiserContainer, {}), _jsx(EventMapContainer, { lat: lat, lng: lng, placename: placename })] }))] })] }))] }));
};
export default GroupLayout;
