import { useParams } from "react-router-dom";
import { useGroup } from "../../contexts/GroupContext";

const GroupDetails = () => {
  const { id } = useParams();
  const { group } = useGroup();

  const {
    name,
    image,
    description,
    location,
    eventsCount,
    members,
    events,
    messages,
    category,
    openAccess,
  } = group;
  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      {group && (
        <>
          <h3 className="text-[1rem] font-bold text-textPrimary">
            Group Details
          </h3>
          {description &&
            description.map((paragraph, i) => {
              return (
                <p
                  className={`${
                    i === 0 ? "font-semibold" : "font-normal"
                  } text-textPrimary mt-6 text-[15px]`}
                >
                  {paragraph}
                </p>
              );
            })}
        </>
      )}
    </div>
  );
};

export default GroupDetails;
