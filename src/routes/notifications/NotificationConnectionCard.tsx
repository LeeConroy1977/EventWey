import { useConnection } from "../../contexts/ConnectionContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";

interface HomeConnectionCardProps {
  handleClick: (id: number) => void;
}

const NotificationConnectionCard: React.FC<HomeConnectionCardProps> = ({
  handleClick,
}) => {
  const { connection, loading } = useConnection();
  const { id, profileBackgroundImage, profileImage, username, bio, aboutMe } =
    connection || {};
  const { isMobile } = useScreenWidth();

  return (
    <div
      className="w-[100px] h-[180px] tablet:w-[23%] desktop:w-[75%] tablet:h-[220px] desktop:h-[90%]  bg-bgPrimary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 "
      onClick={() => handleClick(id)}>
      {loading && (
        <div className="flex justify-center items-center tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] ">
          <ClipLoader size={50} color={"#5d9b9b"} />
        </div>
      )}
      {!loading && connection && (
        <>
          <div
            className="relative w-[100%] h-[30%] desktop:h-[28%]  flex items-center justify-center
          ">
            <img
              className="w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg"
              src={profileBackgroundImage}
              alt=""
            />
            <img
              className="absolute  xl-screen:bottom-[-60px] w-[60px] h-[60px] desktop:w-[75px] desktop:h-[75px] xl-screen:w-[120px] xl-screen:h-[120px] rounded-full border-2 border-textPrimary"
              src={profileImage}
              alt=""
            />
          </div>
          <p className="mt-9 text-[12px] desktop:mt-[80px] desktop:text-[18px] font-semibold text-textPrimary">
            {username}
          </p>
          {!isMobile && (
            <div className="mt-2">
              <p className="text-[9px] tablet:text-[8px] desktop:text-[12px] font-medium text-center text-textTertiary tablet:p-2 desktop:p-4">
                {aboutMe}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationConnectionCard;
