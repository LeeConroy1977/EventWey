import { useEventModal } from "../contexts/EventModelContext";
import Button from "../reuseable-components/Button";
import { Event } from "../types/event";

interface RefundConfirmationProps {
  refund: {};
  event: Event;
}

const RefundConfirmation: React.FC<RefundConfirmationProps> = ({
  refund,
  event,
}) => {
  const { closeEventModal } = useEventModal();
  return (
    <div className="w-[100%] h-[80%] flex flex-col items-center justify-start ">
      <h1 className="text-textPrimary mobile:text-[14px] tablet:text-[20px] font-bold mobile:mt-12 tablet:mt-[5rem] desktop:mt-[5rem] mobile:mr-0  mobile:ml-0 tablet:ml-2 text-center">
        Success! You have left the <br />
        {event?.title} <br /> event
      </h1>
      <h2>
        The ticket refund of £{refund.amount} will be in your account in the 1 -
        5 working days
      </h2>

      <div className="mt-auto mb-16 flex flex-col">
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
          Close
        </Button>
      </div>
    </div>
  );
};
export default RefundConfirmation;
