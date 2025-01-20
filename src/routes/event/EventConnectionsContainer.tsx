import { useState } from "react";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import ConnectionPreviewCard from "../../layouts/user-layout/ConnectionPreviewCard";
import Modal from "../../reuseable-components/Modal";
import HomeConnectionCard from "../group-members/HomeConnectionCard";

const EventConnectionsContainer = ({ eventConnections }) => {
  const handleConnectionClick = useHandleConnectionClick();
  const { isMobile } = useScreenWidth();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const connections = eventConnections ?? [];
  const connectionPreview = connections.slice(0, 9);
  const connectionMobilePreview = connections.slice(0, 4);
  const connectionsLength = connections.length;
  const additionalConnections = connectionPreview?.slice(4, 7);

  return (
    <div
      className="w-full min-h-[250px] flex flex-col rounded-lg bg-white p-0 
    tablet:p-6 desktop:p-8 xl-screen:p-8 mt-6  tablet:m-0 overflow-visible"
    >
      <div className="flex justify-between items-center desktop:px6">
        <h3 className="font-bold text-textPrimary text-[14px] desktop:text-[16px] xl-screen:text-[18px]">
          Attendees (<span className="text-primary">{connectionsLength}</span>)
        </h3>

        <p
          onClick={handleModalOpen}
          className="text-[12px] xl-screen:text-[14px] font-semibold text-primary cursor-pointer"
        >
          Show all
        </p>
      </div>
      <div
        className={`w-full flex items-start justify-start gap-3 xl-screen:gap-4 mt-4 desktop:mt-6 xl-screen:mt-8 pb-6 tablet-pb-0 xl-screen:ml-2 ${
          isMobile ? "overflow-x-scroll scrollbar-primary" : "tablet:flex-wrap"
        }`}
        style={{
          whiteSpace: isMobile ? "nowrap" : "normal", // Prevent wrapping in mobile view
        }}
      >
        {connectionPreview.length > 0 ? (
          (isMobile ? connectionMobilePreview : connectionPreview).map(
            (connection) => (
              <ConnectionPreviewCard
                connection={connection}
                key={connection.id} // Use unique ID
                handleClick={handleConnectionClick}
              />
            )
          )
        ) : (
          <p className="text-textSecondary text-sm">No attendees yet.</p>
        )}
        {isMobile && connectionPreview.length > 4 && (
          <div className="min-w-[100px] h-[180px] bg-bgPrimary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 ">
            <div className="relative w-[80%] h-[30%] mt-5 flex items-center justify-center mr-1">
              {additionalConnections?.map((connection, index) => (
                <img
                  key={connection.id}
                  src={connection.profileImage}
                  alt=""
                  className="w-[46px] h-[46px] rounded-full border-[1px] border-textPrimary object-cover"
                  style={{
                    position: "absolute",
                    right: `${index * 14}px`, // Adjust overlap by half the circle's width
                    zIndex: `${additionalConnections.length - index}`, // Ensure correct stacking order
                  }}
                />
              ))}
            </div>
            <p
              onClick={handleModalOpen}
              className="text-primary font-semibold text-[12px] mt-8"
            >{`+${connectionsLength - 4} more`}</p>
          </div>
        )}
      </div>
      {showModal && (
        <Modal onClose={handleModalClose} title="Attendees">
          <div className="flex flex-wrap gap-3 justify-start items-center p-0">
            {connections.map((connection) =>
              isMobile ? (
                <ConnectionPreviewCard
                  connection={connection}
                  key={connection.id}
                  handleClick={handleConnectionClick}
                  handleModalClose={handleModalClose}
                />
              ) : (
                <HomeConnectionCard
                  connection={connection}
                  key={connection.id}
                  handleClick={handleConnectionClick}
                  handleModalClose={handleModalClose}
                />
              )
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventConnectionsContainer;
