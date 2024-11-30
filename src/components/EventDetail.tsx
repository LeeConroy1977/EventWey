import { BiParagraph } from "react-icons/bi";

const EventDetail = ({ description }) => {
  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      <h3 className="text-[1rem] font-bold text-textPrimary">Event Details</h3>
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
    </div>
  );
};

export default EventDetail;
