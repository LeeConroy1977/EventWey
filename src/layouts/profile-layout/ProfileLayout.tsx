import { Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ProfileWrapper from "./ProfileWrapper";
import ProfileBio from "./ProfileBio";
import ProfileAboutMe from "./ProfileAboutMe";
import ProfileNavBar from "./ProfileNavBar";
import { useConnections } from "../../contexts/ConnectionsContext";
import { useEffect } from "react";
import ProfileTags from "./ProfileTags";

const ProfileLayout = () => {
  const { user, getUserEvents, getUserGroups } = useUser();
  const { connections, getAllConnections } = useConnections();

  useEffect(() => {
    getUserEvents({});
    getAllConnections();
    getUserGroups({});
  }, []);

  return (
    <div className="w-full min-[100%] flex flex-col items-center bg-bgSecondary">
      <ProfileWrapper user={user} />
      <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary">
        <section className="relative w-[34%] h-[100%] flex flex-col items-center justify-start pr-6">
          <img
            src={user?.profileImage}
            alt=""
            className="absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white"
          />

          <ProfileBio user={user} />
          <ProfileAboutMe user={user} />
          <ProfileTags user={user} />
        </section>
        <section className="flex flex-col justify-start items-start w-[66%] h-[100%] pl-6">
          <div className=" w-[100%] h-[4rem] flex justify-between items-center px-4 mt-[2.5rem] ">
            <h1 className=" font-semibold text-[26px]">{user?.username}</h1>
          </div>
          <ProfileNavBar />
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default ProfileLayout;
