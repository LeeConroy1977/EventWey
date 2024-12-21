import useHandleConnectionClick from "../hooks/useHandleConnectionClick";
import ConnectionPreviewCard from "./ConnectionPreviewCard";
import HomeConnectionCard from "./HomeConnectionCard";

const EventConnectionsContainer = ({ eventConnections }) => {
  const handleConnectionClick = useHandleConnectionClick();

  const connectionPreview = [...eventConnections].slice(0, 9);

  const connectionsLength = eventConnections.length;

  return (
    <div className="w-[100%] min-h-[250px] flex flex-col rounded-lg bg-white mt-8 p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">
          Attendees (<span className="text-primary">{connectionsLength}</span>)
        </h3>
        <p className="text-[12px] font-semibold text-primary cursor-pointer">
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

export default EventConnectionsContainer;
