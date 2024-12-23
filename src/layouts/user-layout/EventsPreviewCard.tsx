import { format } from "date-fns";

interface EventsPreviewCardProps {
  event: Event;
  handleClick: () => void;
}

const EventsPreviewCard: React.FC<EventsPreviewCardProps> = ({
  event,
  handleClick,
}) => {
  const { id, date, title, groupName } = event;

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");
  return (
    <div onClick={() => handleClick(id)}>
      <p className="text-[12px] text-textPrimary font-medium ml-3 mb-1">
        {formattedDate}
      </p>
      <div className=" h-[4.2rem] p-3 bg-bgSecondary border rounded-md text-textPrimary mb-4 cursor-pointer">
        <h4 className="text-[13px] font-bold text-textPrimary mb-2 ">
          {title}
        </h4>
        <p className="text-[11px] font-medium text-textPrimary">
          Hosted by:{" "}
          <span className="text-primary font-semibold cursor-pointer">
            {groupName}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EventsPreviewCard;
