import { useEffect, useState } from "react";
import { useConnections } from "../contexts/ConnectionsContext";
import { NavLink } from "react-router-dom";

const ConnectionsOptions = () => {
  const [input, setInput] = useState("");
  const {
    connections,
    getAllConnections,
    loading,
    error,
    handleConnectionQuery,
    filteredConnections,
  } = useConnections();

  useEffect(() => {
    handleConnectionQuery(input);
  }, [input]);

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-between ml-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search connections..."
        className="w-[50%] h-[54%] p-2 pl-6 flex items-center justify-start bg-bgSecondary rounded-full  mr-auto border-[1px] border-gray-200 text-[11px] text-textPrimary placeholder:text-[10px] focus:outline-none focus:ring-0"
      />
      <nav>
        <ul className="flex items-center">
          <NavLink
            end
            to={"/user/my-connections"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary"
                : "font-semibold text-textPrimary"
            }
          >
            <li className="ml-auto mr-11  text-[14px] cursor-pointer ">
              Connections
            </li>
          </NavLink>
          <NavLink
            to={"/user/my-connections/requests"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary"
                : "font-semibold text-textPrimary"
            }
          >
            <li className="ml-auto mr-11  text-[14px]  cursor-pointer  ">
              View Requests
            </li>
          </NavLink>
          {/* <li className="ml-auto mr-11  text-[14px] text-[#5D9B9B] ">
          Connections
        </li> */}
          {/* <li className="ml-auto mr-11  text-[14px] text-[#5D9B9B] ">
          View Requests
        </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default ConnectionsOptions;
