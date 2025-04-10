import {User} from '../../types/user'

interface ProfileAboutMeProps {
  user: User | null;
}

const ProfileAboutMe: React.FC<ProfileAboutMeProps> = ({ user }) => {
  return (
    <div className="w-[100%] tablet:min-h-[150px] flex flex-col rounded-lg bg-white mt-4 p-0 tablet:mt-8 tablet:p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] tablet:text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mobile:mt-4 tablet:mt-0.5">
          About Me
        </h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        <p className="font-normal mobile:text-[13px] tablet:text-[13px] desktop:text-[14px] xl-screen:text-[17px]">
          {user?.aboutMe}
        </p>
      </div>
    </div>
  );
};

export default ProfileAboutMe;
