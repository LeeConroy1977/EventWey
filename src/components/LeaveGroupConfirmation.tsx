import { useModal } from "../contexts/ModalContext";
import { useScreenWidth } from "../contexts/ScreenWidthContext";
import { IoPerson } from "react-icons/io5";
import { Group } from "../types/group";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user";

interface LeaveGroupConfirmationProps {
  group: Group;
  onLeave: (id: string) => Promise<void>;
  isMember: boolean;
  onFetchGroups: () => void;
  onGetGroupById: (id: string) => void;
  setIsMember: (value: boolean) => void;
  setIsLocalMember: (value: boolean) => void;
  user: User;
  isLoading: boolean;
  isLocalMember: boolean;
}

const LeaveGroupConfirmation: React.FC<LeaveGroupConfirmationProps> = ({
  group,
  onLeave,
  isLoading,
  setIsMember,
}) => {
  const { id, name, image, description, members } = group ?? {};
  const { isMobile } = useScreenWidth();
  const { hideModal } = useModal();
  const [isLocalMember, setIsLocalMember] = useState(true);

  function handleClick() {
    setIsLocalMember(false);
    onLeave(id.toString());
  }

  useEffect(() => {}, [setIsMember]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        {!isMobile && group && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <div className="w-[80%] h-[100%] flex flex-col items-center justify-start">
              <img
                className="w-[100%] tablet:h-[36%] desktop:h-[40%] rounded-lg mt-6"
                src={image ?? "/default-image.png"}
                alt={name ?? "Group"}
              />
              <h1 className="text-textPrimary tablet:text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold mt-4 mr-auto ml-2">
                {name ?? "Unnamed Group"}
              </h1>
              <p className="font-bold text-textPrimary mt-4 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] mr-auto ml-2 pr-3">
                {description?.[0] ?? "No description available"}
              </p>
              <p className="font-medium text-textPrimary mt-4 tablet:text-[11px] desktop:text-[13px] xl-screen:text-[15px] mr-auto ml-2 pr-3">
                {description?.[1] ?? ""}
              </p>
              <div className="flex items-center mr-auto mt-auto mb-12 pl-4">
                <div className="flex items-center">
                  <IoPerson className="text-[#D66E6E] tablet:text-[16px] desktop:text-[20px] xl-screen:text-[22px]" />
                  <p className="ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-[#2C3E50]">
                    {members?.length ?? 0} Member
                    {(members?.length ?? 0) !== 1 && "s"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="mobile:w-full tablet:w-[50%] h-full flex flex-col items-center justify-start rounded-lg p-16">
          {isLoading && (
            <p className="text-textPrimary text-[24px] font-semibold">
              Loading...
            </p>
          )}
          {!isLocalMember && (
            <div className="flex flex-col items-center">
              <p className="text-textPrimary text-[24px] font-semibold">
                Success
              </p>
              <button
                className="bg-white border-[2px] border-primary py-3 px-6 mt-6 rounded-lg"
                onClick={() => {
                  console.log("Close modal clicked");
                  hideModal();
                }}
                aria-label="Close modal">
                Close
              </button>
            </div>
          )}
          {isLocalMember && (
            <>
              <h1 className="text-[24px] text-textPrimary font-semibold text-center">
                Are you sure you want to leave{" "}
                <span className="text-primary">{name ?? "this group"}</span>?
              </h1>
              <div className="flex flex-col h-8 mt-16">
                <button
                  className="bg-primary py-3 px-6 text-white rounded-lg"
                  onClick={() => handleClick()}
                  aria-label={`Leave ${name ?? "group"}`}
                  disabled={isLoading}>
                  Yes, leave group
                </button>
                <button
                  className="bg-white border-[2px] border-primary py-3 px-6 mt-6 rounded-lg"
                  onClick={() => {
                    console.log("Cancel clicked");
                    hideModal();
                  }}
                  aria-label="Cancel leaving group">
                  Cancel
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default LeaveGroupConfirmation;
