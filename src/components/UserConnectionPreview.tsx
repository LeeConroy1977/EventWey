import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ConnectionPreviewCard from "./ConnectionPreviewCard";

const UserConnectionPreview = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // const connectionPreview = [...userConnections].slice(0, 6);

  // const connectionsLength = userConnections.length;

  function handleNavigation() {
    navigate("/user/my-connections");
  }

  return (
    <div className="w-[100%] h-[450px] flex flex-col rounded-lg bg-white mt-4 p-4">
      <div className="flex justify-between items-center">
        {/* <h3 className="font-bold text-textPrimary">
          Your Connections(
          <span className="text-primary">{connectionsLength}</span>)
        </h3> */}
        <p
          className="text-[12px] font-semibold text-primary cursor-pointer"
          onClick={handleNavigation}
        >
          Show all
        </p>
      </div>
      {/* <div className="flex items-start justify-center flex-wrap mt-6 gap-3">
        {connectionPreview.map((connection, i) => {
          return <ConnectionPreviewCard connection={connection} key={i} />;
        })}
      </div> */}
    </div>
  );
};

export default UserConnectionPreview;
