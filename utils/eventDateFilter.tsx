export const eventsDateFilter = (events: any[], dateRange: string) => {
  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  console.log("Current time:", now); // Log the current time

  switch (dateRange) {
    case "today":
      startDate.setUTCHours(0, 0, 0, 0); // Start of today in UTC
      endDate.setUTCHours(23, 59, 59, 999); // End of today in UTC
      break;

    case "tomorrow":
      startDate.setUTCDate(now.getUTCDate() + 1); // Tomorrow's date in UTC
      endDate.setUTCDate(now.getUTCDate() + 1);
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
      break;

    case "this week":
      const startOfWeek = now.getUTCDate() - now.getUTCDay(); // Get start of the week (Sunday)
      startDate.setUTCDate(startOfWeek);
      endDate.setUTCDate(startOfWeek + 6); // End of the week (Saturday)
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
      break;

    case "next week":
      startDate.setUTCDate(now.getUTCDate() + (7 - now.getUTCDay())); // Start of next week
      endDate.setUTCDate(now.getUTCDate() + (13 - now.getUTCDay())); // End of next week
      startDate.setUTCHours(0, 0, 0, 0);
      endDate.setUTCHours(23, 59, 59, 999);
      break;

    case "this month":
      startDate.setUTCDate(1); // First day of the month
      startDate.setUTCHours(0, 0, 0, 0);
      endDate = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
      ); // Last day of the month
      endDate.setUTCHours(23, 59, 59, 999);
      break;

    case "next month":
      startDate = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
      ); // First day of next month
      startDate.setUTCHours(0, 0, 0, 0);
      endDate = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 2, 0)
      ); // Last day of next month
      endDate.setUTCHours(23, 59, 59, 999);
      break;

    default:
      return events; // Return all events if no valid date range is provided
  }

  console.log("Start date:", startDate); // Log start date
  console.log("End date:", endDate); // Log end date

  return events.filter((event) => {
    console.log("Event date:", event.date); // Log each event date
    return event.date >= startDate.getTime() && event.date <= endDate.getTime();
  });
};
