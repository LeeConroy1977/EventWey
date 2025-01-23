import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ProfileWrapper from "./ProfileWrapper";
import ProfileBio from "./ProfileBio";
import ProfileAboutMe from "./ProfileAboutMe";
import ProfileNavBar from "./ProfileNavBar";
import { useConnections } from "../../contexts/ConnectionsContext";
import { useEffect, useState } from "react";
import ProfileTags from "./ProfileTags";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { CiSettings } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import HomeEventsCard from "../../routes/events/HomeEventsCard";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeGroupsCard from "../../routes/groups/HomeGroupsCard";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import HomeConnectionCard from "../../routes/group-members/HomeConnectionCard";
const ProfileLayout = () => {
    const { user, getUserEvents, getUserGroups, userEvents, userGroups } = useUser();
    const { isMobile } = useScreenWidth();
    const { connections, getAllConnections, filteredConnections } = useConnections();
    const handleEventClick = useHandleEventClick();
    const handleGroupClick = useHandleGroupClick();
    const handleConnectionClick = useHandleConnectionClick();
    // State for tracking the currently open accordion section
    const [openSection, setOpenSection] = useState(null);
    useEffect(() => {
        getUserEvents({});
        getAllConnections();
        getUserGroups({});
    }, []);
    const toggleSection = (sectionKey) => {
        setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
    };
    const accordionData = [
        {
            title: `Your Upcoming Events (${userEvents?.length || 0})`,
            content: userEvents?.map((event, i) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, i))),
            sectionKey: "events",
        },
        {
            title: `Your Groups (${user?.groups?.length || 0})`,
            content: userGroups?.map((group, i) => (_jsx(HomeGroupsCard, { group: group, handleClick: handleGroupClick }, group.id))),
            sectionKey: "groups",
        },
        {
            title: `Your Connections (${filteredConnections?.length || 0})`,
            content: filteredConnections?.map((connection, i) => (_jsx(HomeConnectionCard, { connection: connection, handleClick: handleConnectionClick }, connection.id))),
            sectionKey: "connections",
        },
    ];
    return (_jsxs("div", { className: "w-full flex flex-col items-center bg-bgSecondary", children: [_jsx(ProfileWrapper, { user: user }), _jsxs("main", { className: "w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-start justify-center mobile:bg-bgPrimary tablet:bg-bgSecondary", children: [!isMobile && (_jsxs(_Fragment, { children: [_jsxs("section", { className: "relative tablet:w-[34%] desktop:w-[34%] flex flex-col items-center justify-start  ", children: [_jsx("img", { src: user?.profileImage, alt: "Profile", className: "absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white" }), _jsx(ProfileBio, { user: user }), _jsx(ProfileAboutMe, { user: user }), _jsx(ProfileTags, { user: user })] }), _jsxs("section", { className: "flex flex-col justify-start items-start tablet:w-[66%] desktop:w-[66%] pl-6 ", children: [_jsx("div", { className: "w-full h-[4rem] flex justify-between items-center px-4 mt-[2.5rem]", children: _jsx("h1", { className: "font-semibold text-[26px]", children: user?.username }) }), _jsx(ProfileNavBar, {}), _jsx(Outlet, {})] })] })), isMobile && (_jsxs("section", { className: "flex flex-col w-full mb-6 p-6", children: [_jsxs("div", { className: "relative w-full flex items-center", children: [_jsx("img", { src: user?.profileImage, alt: "Profile", className: "absolute top-[-90px] rounded-full w-[140px] h-[140px] border-[6px] border-white" }), _jsx("p", { className: "font-semibold text-[14px] ml-[150px] mr-auto", children: user?.username }), _jsx(CiSettings, { className: "text-[21px] text-textPrimary ml-auto cursor-pointer" })] }), _jsx(ProfileBio, { user: user }), _jsx(ProfileAboutMe, { user: user }), accordionData.map(({ title, content, sectionKey }) => (_jsxs("div", { className: "mt-6 w-full flex flex-col", children: [_jsxs("div", { className: "w-full h-[50px] flex items-center justify-between cursor-pointer", onClick: () => toggleSection(sectionKey), children: [_jsx("h2", { className: "font-bold text-textPrimary mobile:text-[14px]", children: title }), _jsx(FaCaretDown, { className: `text-[22px] text-primary mr-4 transition-transform duration-300 ${openSection === sectionKey ? "rotate-180" : ""}` })] }), openSection === sectionKey && (_jsx("div", { className: "flex flex-row flex-wrap gap-2 mt-4", children: content }))] }, sectionKey)))] }))] })] }));
};
export default ProfileLayout;
