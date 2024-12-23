export const sortByPopularity = (events: any[]) => {
  return events.sort((a, b) => b.going - a.going);
};

export const sortByDate = (events: any[]) => {
  return events.sort((a, b) => b.date - a.date);
};

export const sortByFree = (events: any[]) => {
  return events.filter((event) => event.free === true);
};
