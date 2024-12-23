import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import ConnectionPreviewCard from "../../layouts/user-layout/ConnectionPreviewCard";

const EventConnectionsContainer: React.FC<EventConnectionsContainerProps> = ({
  eventConnections,
}) => {
  const handleConnectionClick = useHandleConnectionClick();

  const connections = eventConnections ?? [];
  const connectionPreview = connections.slice(0, 9);
  const connectionsLength = connections.length;

  return (
    <div className="w-full min-h-[250px] flex flex-col rounded-lg bg-white  p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">
          Attendees (<span className="text-primary">{connectionsLength}</span>)
        </h3>
        {connectionsLength > 9 && (
          <p className="text-[12px] font-semibold text-primary cursor-pointer">
            Show all
          </p>
        )}
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        {connectionPreview.length > 0 ? (
          connectionPreview.map((connection) => (
            <ConnectionPreviewCard
              connection={connection}
              key={connection.id} // Use unique ID
              handleClick={handleConnectionClick}
            />
          ))
        ) : (
          <p className="text-textSecondary text-sm">No attendees yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventConnectionsContainer;
