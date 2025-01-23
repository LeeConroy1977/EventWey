import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GoogleCalendarButton = ({ eventDetails }) => {
    function addToGoogleCalendar(event) {
        const { title, date, startTime, duration, description, location } = event;
        const startDate = new Date(date);
        const [startHours, startMinutes] = startTime
            .split(/:|\s/)
            .map((val, i) => (i < 2 ? parseInt(val) : val));
        const isPM = startTime.includes("PM");
        startDate.setHours(isPM && startHours !== 12 ? startHours + 12 : startHours, startMinutes || 0);
        // Calculate end time
        const endDate = new Date(startDate);
        const hoursDuration = parseInt(duration.split(" ")[0]);
        endDate.setHours(endDate.getHours() + hoursDuration);
        const formatToGoogleDate = (dateObj) => dateObj.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
        const formattedStartDate = formatToGoogleDate(startDate);
        const formattedEndDate = formatToGoogleDate(endDate);
        // Combine description array
        const eventDescription = description.join(" ");
        // Construct the Google Calendar URL
        const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(title)}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(location.placename)}&ctz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
        window.open(googleCalendarUrl, "_blank");
    }
    return (_jsxs("div", { className: "flex items-center mt-auto mb-12", children: [_jsx("div", { className: "mt-auto mb-12", children: _jsx("button", { onClick: () => addToGoogleCalendar(eventDetails), className: "py-3 px-6 bg-primary text-white mobile:text-[14px] font-semibold rounded-lg", children: "Add to Google Calendar" }) }), " "] }));
};
export default GoogleCalendarButton;
