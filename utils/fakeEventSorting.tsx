export const sortByPopularity = (events: any[]) => {
  return events.sort((a, b) => b.attendees.length - a.attendees.length);
};

export const sortByDate = (events: any[]) => {
  return events.sort((a, b) => b.date - a.date);
};
