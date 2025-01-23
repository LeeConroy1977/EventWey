import Tag from "../../reuseable-components/Tag";

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
  connections: string[];
  groups: string[];
  userEvents: string[];
  bio: string;
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

interface ConnectionTagsProps {
  connection: User | null;
}

const ConnectionTags: React.FC<ConnectionTagsProps> = ({ connection }) => {
  return (
    <div className="w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">Tags</h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        {connection?.tags.map((tag: any) => {
          return <Tag tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default ConnectionTags;
