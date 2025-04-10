import Tag from "../../reuseable-components/Tag";
import {User} from '../../types/user'

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
        {connection?.tags?.map((tag: any) => {
          return <Tag tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default ConnectionTags;
