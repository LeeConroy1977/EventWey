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
  startTime?: string;
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
    <div className="flex items-center mt-auto mb-12">
      <div className="mt-auto mb-12">
        <button
          onClick={() => addToGoogleCalendar(eventDetails)}
          className="py-3 px-6 bg-primary text-white mobile:text-[14px] font-semibold rounded-lg"
        >
          Add to Google Calendar
        </button>
      </div>{" "}
    </div>
  );
};

export default GoogleCalendarButton;
