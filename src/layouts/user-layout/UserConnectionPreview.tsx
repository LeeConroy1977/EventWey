import { useNavigate } from "react-router-dom";
import ConnectionPreviewCard from "./ConnectionPreviewCard";

import { useEffect } from "react";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { useConnections } from "../../contexts/ConnectionsContext";

const UserConnectionPreview = () => {
  const navigate = useNavigate();
  const { connections, getAllConnections, loading, error } = useConnections();
  const handleConnectionClick = useHandleConnectionClick();

  const connectionPreview = [...connections].slice(0, 6);

  const connectionsLength = connections.length;

  useEffect(() => {
    getAllConnections();
  }, []);

  function handleNavigation() {
    navigate("/user/my-connections");
  }

  return (
    <div className="w-[100%] h-[450px] flex flex-col rounded-lg bg-white mt-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">
          Your Connections (
          <span className="text-primary">{connectionsLength || 0}</span>)
        </h3>
        <p
          className="text-[12px] font-semibold text-primary cursor-pointer"
          onClick={handleNavigation}
        >
          Show all
        </p>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        {connectionPreview.length > 0 &&
          connectionPreview.map((connection, i) => {
            return (
              <ConnectionPreviewCard
                connection={connection}
                key={i}
                handleClick={handleConnectionClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default UserConnectionPreview;
