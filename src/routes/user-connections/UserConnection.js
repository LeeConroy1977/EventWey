import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useConnections } from "../../contexts/ConnectionsContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";
const UserConnection = () => {
    const { connections, getAllConnections, loading, error, handleConnectionQuery, filteredConnections, } = useConnections();
    const { isMobile } = useScreenWidth();
    const handleConnectionClick = useHandleConnectionClick();
    useEffect(() => {
        getAllConnections();
    }, []);
    return (_jsxs("div", { className: "w-full min-h-screen flex flex-col desktop:flex-row items-start justify-start flex-wrap gap-3 bg-bgPrimary p-6 tablet:p-0 desktop:pl-12 desktop:py-6 desktop:mt-4", children: [isMobile && (_jsxs("h2", { className: "text-[14px] font-bold text-textPrimary mb-1 mr-auto", children: ["Your connections (", _jsx("span", { className: "text-primary", children: connections?.length || 0 }), ")"] })), loading ? (_jsx("div", { className: "w-full flex justify-center items-center h-[200px]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : filteredConnections?.length > 0 ? (_jsx("div", { className: "w-[100%] flex flex-row flex-wrap gap-3", children: filteredConnections.map((connection) => (_jsx(HomeConnectionCard, { connection: connection, handleClick: handleConnectionClick }, connection.id))) })) : (!loading && (_jsx("div", { className: "w-full text-gray-500 text-center mt-4", children: "No connections found." })))] }));
};
export default UserConnection;
