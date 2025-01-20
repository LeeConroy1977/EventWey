const ConnectionBio = ({ connection }) => {
  return (
    <div className="w-[100%] desktop:min-h-[130px] flex flex-col rounded-lg bg-white mobile:mt-8 tablet:mt-[8.5rem] tablet:p-6 ">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5">
          Bio
        </h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mobile:mt-4 tablet:mt-2 desktop:mt-4 xl-screen:mt-4 gap-3">
        <p className="text-textPrimary  mr-auto mobile:mt-0 tablet:mt-4 desktop:mt-4 xl-screen:mt-4 text-[13px] tablet:text-[13px] desktop:text-[14px] xl-screen:text-[17px]">
          {connection?.bio}
        </p>
      </div>
    </div>
  );
};

export default ConnectionBio;
