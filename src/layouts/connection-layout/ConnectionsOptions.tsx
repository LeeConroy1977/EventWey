import { useEffect, useState } from "react";
import { useConnections } from "../../contexts/ConnectionsContext";
import { NavLink } from "react-router-dom";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const ConnectionsOptions = () => {
  const [input, setInput] = useState("");
  const { isMobile } = useScreenWidth();
  const { handleConnectionQuery } = useConnections();

  useEffect(() => {
    handleConnectionQuery(input);
  }, [input]);

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-between   desktop:ml-6">
      {!isMobile && (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search connections..."
          className="w-[50%] h-[54%] p-2 pl-6 ml-6 flex items-center justify-start bg-bgSecondary rounded-full  mr-auto border-[1px] border-gray-200 text-[11px] text-textPrimary placeholder:text-[10px] focus:outline-none focus:ring-0"
        />
      )}

      <nav>
        <ul className="flex items-center mr-auto desktop:mr-0 text-[13px] desktop:text-[14px]">
          <NavLink
            end
            to={"/user/my-connections"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary"
                : "font-semibold text-textPrimary"
            }
          >
            <li className=" mr-6 desktop:ml-auto desktop:mr-11   cursor-pointer ">
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
            <li className="desktop:ml-auto desktop:mr-11   cursor-pointer  ">
              View Requests
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default ConnectionsOptions;
