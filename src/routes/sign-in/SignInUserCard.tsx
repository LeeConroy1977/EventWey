const SignInUserCard = ({ user, handleClick }) => {
  const { id, profileBackgroundImage, profileImage, username, bio } = user;
  return (
    <div
      className="w-[30%] h-full bg-bgSecondary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 "
      onClick={() => handleClick(id)}
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
          className="absolute top-4 w-[60px] h-[60px] rounded-full border-2 border-textPrimary"
          src={profileImage}
          alt=""
        />
      </div>
      <p className="mt-5 text-[12px] font-semibold text-textPrimary">
        {username}
      </p>
      <p className="mt-2 px-3 text-[10px] font-semibold text-textPrimary">
        {bio}
      </p>
      <button className="w-[80%] py-1 flex justify-center items-center mt-auto mb-3 text-primary text-[10px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary">
        Sign In
      </button>
    </div>
  );
};

export default SignInUserCard;
