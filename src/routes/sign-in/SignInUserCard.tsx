const SignInUserCard = ({ user, handleClick }) => {
  const { id, profileBackgroundImage, profileImage, username, bio } = user;
  return (
    <div className="w-[30%] h-full bg-bgPrimary rounded-lg flex flex-col items-center justify-start  mt-1 border-[1px] border-gray-200 ">
      <div
        className="relative w-[100%] h-[28%]  flex items-center justify-center
  "
      >
        <img
          className="w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg"
          src={profileBackgroundImage}
          alt=""
        />
        <img
          className="absolute top-7 w-[64px] h-[64px] rounded-full border-2 border-textPrimary"
          src={profileImage}
          alt=""
        />
      </div>
      <p className="mt-9 text-[12px] font-semibold text-textPrimary">
        {username}
      </p>
      <p className="mt-2 px-4 text-[9px] font-semibold text-textPrimary">
        {bio}
      </p>
      <button
        onClick={() => handleClick(id)}
        className="w-[80%] py-1 flex justify-center items-center mt-auto mb-3 text-primary text-[10px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInUserCard;
