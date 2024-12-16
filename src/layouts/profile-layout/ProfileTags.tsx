import Tag from "../../reuseable-components/Tag";

const ProfileTags = ({ user }) => {
  return (
    <div className="w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">Tags</h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        {user?.tags.map((tag) => {
          return <Tag tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default ProfileTags;
