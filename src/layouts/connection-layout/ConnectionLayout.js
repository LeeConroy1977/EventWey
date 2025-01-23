import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, useParams } from "react-router-dom";
import ConnectionNavBar from "./ConnectionNavBar";
import ConnectionWrapper from "./ConnectionWrapper";
import { useEffect, useState } from "react";
import { useConnection } from "../../contexts/ConnectionContext";
import ConnectionBio from "./ConnectionBio";
import ConnectionAboutMe from "./ConnectionAboutMe";
import ConnectionTags from "./ConnectionTags";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import HomeEventsCard from "../../routes/events/HomeEventsCard";
import HomeGroupsCard from "../../routes/groups/HomeGroupsCard";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { FaCaretDown } from "react-icons/fa";
import HomeConnectionCard from "../../routes/group-members/HomeConnectionCard";
const ConnectionLayout = () => {
    const { id } = useParams();
    const { isMobile } = useScreenWidth();
    const handleEventClick = useHandleEventClick();
    const handleGroupClick = useHandleGroupClick();
    const handleConnectionClick = useHandleConnectionClick();
    const [openSection, setOpenSection] = useState(null);
    const { connection, getConnectionById, getConnectionConnections, getConnectionEvents, getConnectionGroups, connectionEvents, connectionGroups, connectionConnections, } = useConnection();
    useEffect(() => {
        getConnectionById(id);
        getConnectionConnections(id);
        getConnectionEvents(id);
        getConnectionGroups(id);
    }, [id]);
    const toggleSection = (sectionKey) => {
        setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
    };
    const accordionData = [
        {
            title: `Your Upcoming Events (${connectionEvents?.length || 0})`,
            content: connectionEvents?.map((event, i) => (_jsx(HomeEventsCard, { event: event, handleClick: handleEventClick }, i))),
            sectionKey: "events",
        },
        {
            title: `Your Groups (${connection?.groups?.length || 0})`,
            content: connectionGroups?.map((group, i) => (_jsx(HomeGroupsCard, { group: group, handleClick: handleGroupClick }, group.id))),
            sectionKey: "groups",
        },
        {
            title: `Your Connections (${connectionConnections?.length || 0})`,
            content: connectionConnections?.map((connection, i) => (_jsx(HomeConnectionCard, { connection: connection, handleClick: handleConnectionClick }, connection.id))),
            sectionKey: "connections",
        },
    ];
    return (_jsxs("div", { className: "w-full flex flex-col items-center bg-bgSecondary", children: [_jsx(ConnectionWrapper, {}), _jsxs("main", { className: "w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-start justify-center mobile:bg-bgPrimary tablet:bg-bgSecondary", children: [!isMobile && (_jsxs(_Fragment, { children: [_jsxs("section", { className: "relative tablet:w-[34%] desktop:w-[34%] flex flex-col items-center justify-start  ", children: [_jsx("img", { src: connection?.profileImage, alt: "", className: "absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white" }), _jsx(ConnectionBio, { connection: connection }), _jsx(ConnectionAboutMe, { connection: connection }), _jsx(ConnectionTags, { connection: connection })] }), _jsxs("section", { className: "flex flex-col justify-start items-start tablet:w-[66%] desktop:w-[66%] pl-6 ", children: [_jsxs("div", { className: "w-full h-[4rem] flex justify-between items-center px-4 mt-[2.5rem]", children: [_jsx("h1", { className: "font-semibold text-[26px]", children: connection?.username }), _jsx("button", { className: " py-3 px-12 flex justify-center items-center mt-auto mb-3 text-primary text-[14px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary", children: "Connect" })] }), _jsx(ConnectionNavBar, {}), _jsx(Outlet, {})] })] })), isMobile && (_jsxs("section", { className: "flex flex-col w-full mb-6 p-6", children: [_jsxs("div", { className: "relative w-full flex items-center", children: [_jsx("img", { src: connection?.profileImage, alt: "Profile", className: "absolute top-[-90px] rounded-full w-[140px] h-[140px] border-[6px] border-white" }), _jsx("p", { className: "font-semibold text-[14px] ml-[150px] mr-auto", children: connection?.username }), _jsx("button", { className: " py-2 px-5 flex justify-center items-center  text-primary text-[9.5px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary", children: "Connect" })] }), _jsx(ConnectionBio, { connection: connection }), _jsx(ConnectionAboutMe, { connection: connection }), accordionData.map(({ title, content, sectionKey }) => (_jsxs("div", { className: "mt-6 w-full flex flex-col", children: [_jsxs("div", { className: "w-full h-[50px] flex items-center justify-between cursor-pointer", onClick: () => toggleSection(sectionKey), children: [_jsx("h2", { className: "font-bold text-textPrimary mobile:text-[14px]", children: title }), _jsx(FaCaretDown, { className: `text-[22px] text-primary mr-4 transition-transform duration-300 ${openSection === sectionKey ? "rotate-180" : ""}` })] }), openSection === sectionKey && (_jsx("div", { className: "flex flex-row flex-wrap gap-2 mt-4", children: content }))] }, sectionKey)))] }))] })] }));
};
export default ConnectionLayout;
