export const eventsDateFilter = (events, dateRange) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();
    switch (dateRange) {
        case "today":
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(23, 59, 59, 999);
            break;
        case "tomorrow":
            startDate.setUTCDate(now.getUTCDate() + 1);
            endDate.setUTCDate(now.getUTCDate() + 1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(23, 59, 59, 999);
            break;
        case "this week":
            const startOfWeek = now.getUTCDate() - now.getUTCDay();
            startDate.setUTCDate(startOfWeek);
            endDate.setUTCDate(startOfWeek + 6);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(23, 59, 59, 999);
            break;
        case "next week":
            startDate.setUTCDate(now.getUTCDate() + (7 - now.getUTCDay()));
            endDate.setUTCDate(now.getUTCDate() + (13 - now.getUTCDay()));
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(23, 59, 59, 999);
            break;
        case "this month":
            startDate.setUTCDate(1);
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));
            endDate.setUTCHours(23, 59, 59, 999);
            break;
        case "next month":
            startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
            startDate.setUTCHours(0, 0, 0, 0);
            endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 2, 0));
            endDate.setUTCHours(23, 59, 59, 999);
            break;
        default:
            return events;
    }
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
    return events.filter((event) => {
        console.log("Event date:", event.date);
        return event.date >= startDate.getTime() && event.date <= endDate.getTime();
    });
};
