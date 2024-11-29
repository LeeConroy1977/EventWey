import { eventsData } from "../data/events";
import { groupsData } from "../data/groups";
import { usersData } from "../data/users";
import { eventsDateFilter } from "./eventDateFilter";
import { sortByDate, sortByPopularity } from "./fakeEventSorting";

console.log(eventsData);

export const fetchAllUser = async (): Promise<any[]> => {
  let users = [...usersData];
  return Promise.resolve(users);
};

export const fetchAllEvents = (params: {
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

export const fetchAllGroups = (params: {
  category?: string;
  sortBy?: string;
}) => {
  let filteredData = [...groupsData];

  if (params.category) {
    filteredData = filteredData.filter(
      (group) => group.category === params.category
    );
  }

  if (params.sortBy === "popular") {
    filteredData = sortByPopularity(filteredData);
  } else if (params.sortBy === "date") {
    filteredData = sortByDate(filteredData);
  }

  return Promise.resolve(filteredData);
};

export const fetchUserEvents = async (
  id: number,
  params: { category?: string; date?: string; sortBy?: string }
): Promise<any[]> => {
  const allEvents = await fetchAllEvents(params);
  const userEvents = allEvents.filter((event) => event.attendees.includes(id));

  return Promise.resolve(userEvents);
};

export const fetchUserGroups = async (
  id: number,
  params: { category?: string; sortBy?: string }
): Promise<any[]> => {
  const allGroups = await fetchAllGroups(params);
  const userGroups = allGroups.filter((group) => group.members.includes(id));

  return Promise.resolve(userGroups);
};

export const fetchUserConnection = async (id: number): Promise<any[]> => {
  const users = await fetchAllUser();
  const userconnections = users.filter((user) => user.connections.includes(id));

  return Promise.resolve(userconnections);
};
