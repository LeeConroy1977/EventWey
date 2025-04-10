import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import {User} from '../../types/user'



interface SignInUserCardProps {
  user: User;
  handleClick: (id: number) => void;
}

const SignInUserCard: React.FC<SignInUserCardProps> = ({
  user,
  handleClick,
}) => {
  const { id, profileBackgroundImage, profileImage, username, bio } = user;
  const { isMobile } = useScreenWidth();
  return (
    <div className="w-[30%] h-full bg-bgPrimary rounded-lg flex flex-col items-center justify-start  mt-1 border-[1px] border-gray-200 ">
      <div
        className="relative w-[100%] h-[28%]  flex items-center justify-center
  "
      >
        <img
          className="w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg"
          src={profileBackgroundImage ?? undefined}
          alt=""
        />
        <img
          className="absolute mobile:top-6  desktop:top-7 mobile:w-[64px] mobile:h-[64px] tablet:w-[60px] tablet:h-[60px] rounded-full border-2 border-textPrimary"
          src={profileImage ?? undefined}
          alt=""
        />
      </div>
      <p className="mobile:mt-11 tablet:mt-10 mobile:text-[10px] tablet:text-[10px] desktop:text-[12px] font-semibold text-textPrimary">
        {username}
      </p>
      {!isMobile && (
        <p className="tablet:mt-1 desktop:mt-2 px-4 tablet:text-[5px] desktop:text-[9px] font-semibold text-textPrimary text-center">
          {bio}
        </p>
      )}

      <button
        onClick={() => handleClick(id)}
        className="w-[80%] py-1 flex justify-center items-center mt-auto mb-3 text-primary mobile:text-[9px] 
         desktop:text-[10px] font-semibold mobile:border-2 tablet:border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInUserCard;
