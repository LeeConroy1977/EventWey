import React from "react";

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  googleId: string;
  authMethod: string;
  profileBackgroundImage: string;
  profileImage: string;
  aboutMe: string;
  bio: string;
  tags: string[];
  connections: string[];
  groups: string[];
  userEvents: string[];
  messages: string[];
  groupAdmin: string[];
  notifications: string[];
  viewEventsStatus: string;
  viewConnectionsStatus: string;
  viewGroupsStatus: string;
  viewTagsStatus: string;
  viewProfileImage: string;
  viewBioStatus: string;
  aboutMeStatus: string;
  role: string;
}

interface ProfileWrapperProps {
  user: User | null;
}

const ProfileWrapper: React.FC<ProfileWrapperProps> = ({ user }) => {
  return (
    <div className="w-[100%] h-[12rem] tablet:h-[28rem] flex justify-center items-center bg-bgPrimary">
      <div className="relative w-[100%] tablet-[94%] desktop:w-[66%] h-[100%] flex items-center justify-center">
        <img
          src={user?.profileBackgroundImage}
          alt=""
          className="w-[100%] h-[100%] "
        />
      </div>
    </div>
  );
};

export default ProfileWrapper;
