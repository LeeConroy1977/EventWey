import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HomeConnectionCard from "../group-members/HomeConnectionCard";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { ClipLoader } from "react-spinners";
const ConnectionConnections = () => {
    const { connection, connectionConnections, loading, error } = useConnection();
    const handleConnectionClick = useHandleConnectionClick();
    const connectionsLength = connectionConnections?.length;
    const firstName = connection?.username.split(" ")[0];
    return (_jsxs("div", { className: "w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10", children: [_jsxs("h3", { className: "font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8", children: [`${firstName}'s Connections`, " (", _jsx("span", { className: "text-primary", children: connectionsLength }), ")"] }), loading ? (_jsx("div", { className: "w-full flex justify-center items-center h-[100px]", children: _jsx(ClipLoader, { size: 50, color: "#5d9b9b" }) })) : error ? (_jsx("div", { className: "w-full text-red-500 text-center mt-4", children: error })) : connectionsLength > 0 ? (_jsx("div", { className: "flex flex-row items-start justify-start gap-3 flex-wrap", children: connectionConnections?.map((connection) => (_jsx(HomeConnectionCard, { connection: connection, handleClick: handleConnectionClick }, connection.id))) })) : (!loading &&
                connectionsLength > 0 && (_jsx("p", { className: "text-gray-500 text-center", children: "No Connections To Show..." })))] }));
};
export default ConnectionConnections;
