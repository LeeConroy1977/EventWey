import GoogleCalendarButton from "./GooelCalendarButton";

const EventConfimation = ({ event }) => {
  return (
    <div className="w-[100%] h-[80%] flex flex-col items-center justify-start ">
      <h1 className="text-textPrimary text-[26px] font-bold mt-[7rem] mr-auto ml-2">
        You have joined the <br />
        {event?.title} <br /> event
      </h1>
      <h2 className="text-textPrimary font-bold text-[28px] mt-6">
        Add this event to your{" "}
        <span className="text-primary ">Gooole Calendar?</span>
        <div className="mt-auto">
          <GoogleCalendarButton eventDetails={event} />
        </div>
      </h2>
    </div>
  );
};

export default EventConfimation;
