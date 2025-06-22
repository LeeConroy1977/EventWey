import { Event } from "../types/event";

const GoogleCalendarButton = ({ eventDetails }: { eventDetails: Event }) => {
  function addToGoogleCalendar(event: Event) {
    const { title, date, startTime, duration, description, location } = event;

    const startDate = new Date(date);
    // @ts-ignore
    const [startHours, startMinutes] = startTime
      .split(/:|\s/)
      .map((val: any, i: any) => (i < 2 ? parseInt(val) : val));
    // @ts-ignore
    const isPM = startTime.includes("PM");
    startDate.setHours(
      isPM && startHours !== 12 ? startHours + 12 : startHours,
      startMinutes || 0
    );

    // Calculate end time
    const endDate = new Date(startDate);
    const hoursDuration = parseInt(duration.split(" ")[0]);
    endDate.setHours(endDate.getHours() + hoursDuration);

    const formatToGoogleDate = (dateObj: any) =>
      dateObj.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

    const formattedStartDate = formatToGoogleDate(startDate);
    const formattedEndDate = formatToGoogleDate(endDate);

    // Combine description array
    const eventDescription = description.join(" ");

    // Construct the Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
      title
    )}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(
      eventDescription
    )}&location=${encodeURIComponent(location.placename)}&ctz=${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    }`;

    window.open(googleCalendarUrl, "_blank");
  }

  return (
    <div className="flex items-center mt-auto ">
      <div className="mt-auto ">
        <button
          onClick={() => addToGoogleCalendar(eventDetails)}
          className="py-3 px-6 bg-primary text-white mobile:text-[14px] font-semibold rounded-lg border-2 border-primary">
          Add to Google Calendar
        </button>
      </div>{" "}
    </div>
  );
};

export default GoogleCalendarButton;
