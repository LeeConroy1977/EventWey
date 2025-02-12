import GoogleCalendarButton from "./GoogleCalendarButton";

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand[];
  going: number;
  capacity: number;
  availability: number;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendeesId: string[];
  location: Location;
  approved: boolean;
}

interface EventConfimationProps {
  event: Event;
}

const EventConfimation: React.FC<EventConfimationProps> = ({ event }) => {
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

      <GoogleCalendarButton eventDetails={event} />
    </div>
  );
};

export default EventConfimation;
