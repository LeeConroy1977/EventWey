import { eventsData } from "../data/events";
import { groupsData } from "../data/groups";
import { usersData } from "../data/users";
import { eventsDateFilter } from "./eventDateFilter";
import { sortByDate, sortByPopularity } from "./fakeEventSorting";

console.log(eventsData);

export const fetchEventData = (params: {
  category?: string;
  date?: string;
  sortBy?: string;
}) => {
  let filteredData = [...eventsData];

  if (params.category) {
    filteredData = filteredData.filter(
      (event) => event.category === params.category
    );
  }

  if (params.date) {
    filteredData = eventsDateFilter(filteredData, params.date);
  }

  if (params.sortBy === "popular") {
    filteredData = sortByPopularity(filteredData);
  } else if (params.sortBy === "date") {
    filteredData = sortByDate(filteredData);
  }

  return Promise.resolve(filteredData);
};
