import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useConnections } from "../../contexts/ConnectionsContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { ClipLoader } from "react-spinners";
const ProfileConnections = () => {
    const { connections, loading, error } = useConnections();
    const handleConnectionClick = useHandleConnectionClick();
    const connectionsLength = connections?.length;
    return (_jsxs("div", { className: "w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10", children: [_jsxs("h3", { className: "font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8", children: ["Your Connections (", _jsx("span", { className: "text-primary", children: connectionsLength }), ")"] }), loading ? (_jsx("div", { className: "w-full flex justify-center items-center h-[100px]", children: _jsx(ClipLoader, { size: 80, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : connectionsLength > 0 ? (_jsx("div", { className: "flex flex-row items-start justify-start gap-3 flex-wrap", children: connections.map((connection, index) => (_jsx(HomeConnectionCard, { connection: connection, handleClick: handleConnectionClick }, index))) })) : (!loading && (_jsx("p", { className: "text-gray-500 text-center", children: "No connections to show..." })))] }));
};
export default ProfileConnections;
