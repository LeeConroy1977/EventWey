import { Outlet, useNavigate, useParams } from "react-router-dom";
import GroupNav from "./GroupNav";
import { useGroup } from "../../contexts/GroupContext";
import { useEffect, useState } from "react";
import GroupOrganiserContainer from "./GroupOrganiserContainer";
import EventMapContainer from "../../components/EventMapContainer";
import GroupWrapper from "./GroupWrapper";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { useUser } from "../../contexts/UserContext";
import { useGroups } from "../../contexts/GroupsContext";
import useIsGroupMember from "../../hooks/useIsGroupMember";
import { useModal } from "../../contexts/ModalContext";

const GroupLayout = () => {
  const { id } = useParams();
  const { isMobile } = useScreenWidth();
  const { user, joinGroup, leaveGroup } = useUser();

  const {
    group,
    getGroupById,
    getEventsById,
    getGroupMembers,
    updateGroup,
    removeGroup,
    setGroup,
  } = useGroup();
  const { fetchGroups, setGroups } = useGroups();
  const { isMember, setIsMember, refreshMembership } = useIsGroupMember(
    group?.id
  );
  const { showModal, hideModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { lat, lng, placename } = group?.location || {};
  // @ts-ignore

  const buttonText = isMember ? "Leave Group" : "Join Group";

  function handleApproveGroup() {
    updateGroup("approved", true);
    navigate("/user/admin/groups");
  }

  function handleRemoveGroup(id: string) {
    removeGroup(id);
    navigate("/user/admin/groups");
  }

  async function handleJoinGroup(groupId: number) {
    await joinGroup(groupId);
    setIsMember(true);
    getGroupMembers(groupId.toString());
    getGroupById(groupId.toString());
    fetchGroups({});
  }

  async function handleLeaveGroup(groupId: number) {
    setIsLoading(true);
    try {
      await leaveGroup(groupId);
      setIsMember(false);
      await getGroupById(groupId.toString());
      await getGroupMembers(groupId.toString()),
        await fetchGroups({}),
        console.log("handleLeaveGroup succeeded, isMember:", false);
    } catch (error) {
      console.error("Failed to leave group or fetch data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getGroupById(id);
      getEventsById(id);
      getGroupMembers(id);
      fetchGroups({});
    }
  }, [id]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary">
      {isMobile && !group?.approved && (
        <div className="fixed flex flex-row items-center justify-around bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100">
          <button
            onClick={handleApproveGroup}
            className="w-[120px] h-[40px]  text-[11px] flex items-center justify-center font-semibold rounded-lg  text-white bg-primary ">
            Approve Group
          </button>
          <button
            // @ts-ignore
            onClick={() => handleRemoveGroup(id)}
            className="w-[120px] h-[40px] text-[11px] flex items-center justify-center font-semibold rounded-lg  text-white bg-secondary ">
            Reject Group
          </button>
        </div>
      )}
      {isMobile && group?.approved && (
        <div className="fixed flex flex-row items-center justify-between bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100">
          <button
            onClick={
              !isMember && user?.id
                ? () => handleJoinGroup(group?.id)
                : isMember && user?.id
                ? () => showModal(<div>Modal</div>)
                : 
                  undefined
            }
            className={`w-[110px] h-[36px] ml-auto flex items-center justify-center text-[11px] font-semibold rounded-lg ${
              isMember
                ? "bg-bgPrimary border-2 border-primary text-primary"
                : "bg-secondary text-white"
            }`}>
            {buttonText}
          </button>
        </div>
      )}
      {group && (
        <>
          <GroupWrapper
            // @ts-ignore
            group={group}
            handleApproveGroup={handleApproveGroup}
            handleRemoveGroup={handleRemoveGroup}
            handleJoinGroup={handleJoinGroup}
            handleLeaveGroup={handleLeaveGroup}
            isLoading={isLoading}
            isMember={isMember}
            setIsMember={setIsMember}
          />
          <main className="w-full m-h-screen tablet:w-[94%]  desktop:w-[66%] desktop:h-auto flex flex-col tablet:flex-row items-start justify-center bg-bgPrimary tablet:bg-bgSecondary px-6 mt-0 tablet:mt-0 tablet:px-0 tablet:p-4 pb-[5rem] ">
            <section className="flex flex-col justify-start items-start w-full tablet:w-[62%] h-auto p-0 tablet:p-4">
              {id && <GroupNav id={id} />}

              <Outlet />
            </section>
            {!isMobile && (
              <section className="w-full tablet:w-[38%] h-auto flex flex-col items-center justify-start p-0 pl-0 tablet:p-0 tablet:pl-4 desktop:pl-8 gap-y-4 ">
                <GroupOrganiserContainer />
                <EventMapContainer lat={lat} lng={lng} placename={placename} />
              </section>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default GroupLayout;
