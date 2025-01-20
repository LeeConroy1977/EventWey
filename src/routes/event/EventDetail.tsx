import { BiParagraph } from "react-icons/bi";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const EventDetail = ({ description }) => {
  const { isMobile } = useScreenWidth();
  return (
    <div className="w-[100%] min-h-[8rem] flex flex-col items-center justify-start bg-bgPrimary mt-0 tablet:mt-8 rounded-lg tablet:p-6  desktop:p-10 desktop:pb-10">
      <h3 className="text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5">
        Event Details
      </h3>
      {description &&
        description.slice(isMobile ? 1 : 0).map((paragraph, i) => {
          return (
            <p
              className={`${
                !isMobile && i === 0 ? "font-semibold" : "font-normal"
              } text-textPrimary  mr-auto mt-4 tablet:mt-6 xl-screen:mt-8 text-[12px] tablet:text-[13px] desktop:text-[15px] xl-screen:text-[17px]`}
            >
              {paragraph}
            </p>
          );
        })}
    </div>
  );
};

export default EventDetail;
