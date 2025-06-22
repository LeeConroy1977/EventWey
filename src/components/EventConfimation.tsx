import { useEventModal } from "../contexts/EventModelContext";
import Button from "../reuseable-components/Button";
import { Event } from "../types/event";
import GoogleCalendarButton from "./GoogleCalendarButton";

interface EventConfimationProps {
  event: Event;
}

const EventConfimation: React.FC<EventConfimationProps> = ({ event }) => {
  const { closeEventModal } = useEventModal();
  return (
    <div className="w-[100%] h-[80%] flex flex-col items-center justify-start ">
      <h1 className="text-textPrimary mobile:text-[14px] tablet:text-[20px] font-bold mobile:mt-12 tablet:mt-[5rem] desktop:mt-[5rem] mobile:mr-0  mobile:ml-0 tablet:ml-2 text-center">
        You have joined the <br />
        {event?.title} <br /> event
      </h1>
      <h2 className="text-textPrimary font-bold mobile:text-[16px] tablet:text-[20px] desktop:text-[28px] mt-6 tablet:mt-16 text-center">
        Add this event to your <br />
        <span className="text-primary ">Gooole Calendar?</span>
      </h2>
      <div className="mt-auto mb-16 flex flex-col">
        <GoogleCalendarButton eventDetails={event} />

        <Button
          handleClick={() => {
            closeEventModal();
          }}
          px="px-12"
          py="py-3"
          mt="mt-8"
          borderWidth="border-2"
          borderColour="border-primary"
          bgColour="bg-bgPrimary"
          textColour="text-primary">
          No thanks
        </Button>
      </div>
    </div>
  );
};

export default EventConfimation;
