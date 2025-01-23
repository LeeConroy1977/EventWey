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
  tags: string[];
  bio: string;
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

interface ConnectionPreviewCardProps {
  connection: User;
  handleClick: (id: string) => void;
  handleModalClose?: () => void;
}

const ConnectionPreviewCard: React.FC<ConnectionPreviewCardProps> = ({
  connection,
  handleClick,
  handleModalClose,
}) => {
  const { id, profileBackgroundImage, profileImage, username } = connection;
  return (
    <div
      className="mobile:w-[100px] h-[180px] tablet:w-[30%] desktop:h-[190px] xl-screen:h-[240px] bg-bgPrimary desktop:bg-bgSecondary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 "
      onClick={() => {
        handleClick(id);
        handleModalClose?.();
      }}
    >
      <div
        className="relative w-[100%] h-[30%]  flex items-center justify-center
      "
      >
        <img
          className="w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg"
          src={profileBackgroundImage}
          alt=""
        />
        <img
          className="absolute top-6 xl-screen:top-9 w-[60px] h-[60px] xl-screen:w-[70px] xl-screen:h-[70px] rounded-full border-2 border-textPrimary"
          src={profileImage}
          alt=""
        />
      </div>
      <p className="mt-9 tablet:mt-10 desktop:mt-9 xl-screen:mt-12 mobile:text-[12px] tablet:text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-semibold text-textPrimary">
        {username}
      </p>
      <button className="w-[80%] py-1 flex justify-center items-center mt-auto mb-3 text-primary text-[9px] desktop:text-[10px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary">
        Message
      </button>
    </div>
  );
};

export default ConnectionPreviewCard;
