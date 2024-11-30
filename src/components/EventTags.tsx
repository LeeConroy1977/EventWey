import Tag from "../reuseable-components/Tag";

const EventTags = ({ tags, connectionsLength }) => {
  return (
    <div className="w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white mt-8 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[1rem] font-bold text-textPrimary">Tags</h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, i) => <Tag tag={tag} key={i} />)}
      </div>
    </div>
  );
};

export default EventTags;
