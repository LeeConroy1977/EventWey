import axios from "axios";

import { eventsData } from "../data/events";
import { groupsData } from "../data/groups";
import { usersData } from "../data/users";
import { eventsDateFilter } from "./eventDateFilter";
import { sortByDate, sortByPopularity, sortByFree } from "./fakeEventSorting";

console.log(eventsData);

// export const fetchAllUser = async (): Promise<any[]> => {
//   let users = [...usersData];
//   return Promise.resolve(users);
// };

export const createUser = async (newUser: any): Promise<any> => {
  try {
    const response = await axios.post("http://localhost:3000/users", newUser);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const fetchAllUser = async (): Promise<any[]> => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchAllEvents = async (params: {
  category?: string;
  date?: string;
  sortBy?: string;
}): Promise<any[]> => {
  try {
    const response = await axios.get("http://localhost:3000/events");
    let filteredData = response.data;

    if (params.category) {
      filteredData = filteredData.filter(
        (event: any) => event.category === params.category
      );
    }

    if (params.date) {
      filteredData = eventsDateFilter(filteredData, params.date);
    }

    if (params.sortBy === "popular") {
      filteredData = sortByPopularity(filteredData);
    } else if (params.sortBy === "date") {
      filteredData = sortByDate(filteredData);
    } else if (params.sortBy === "free") {
      filteredData = sortByFree(filteredData);
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

export const fetchGroupById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
};

export const fetchConnectionById = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching connection by ID:", error);
    throw error;
  }
};

export const fetchEventGroupById = async (id: number): Promise<any> => {
  try {
    // Fetch the event by ID
    const eventResponse = await axios.get(`http://localhost:3000/events/${id}`);
    const event = eventResponse.data;

    if (!event?.groupId) {
      throw new Error(`Group ID not found for event with ID: ${id}`);
    }

    // Fetch the group by event's groupId
    const groupResponse = await axios.get(
      `http://localhost:3000/groups/${event.groupId}`
    );
    return groupResponse.data;
  } catch (error) {
    console.error("Error fetching event group by ID:", error);
    throw error;
  }
};

export const fetchGroupEventsById = async (id: number): Promise<any[]> => {
  try {
    // Fetch the group by ID
    const groupResponse = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = groupResponse.data;

    if (!group?.events) {
      throw new Error(`Events not found for group with ID: ${id}`);
    }

    // Fetch all events
    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    // Filter events belonging to the group
    const groupEvents = events.filter((event: any) =>
      group.events.includes(Number(event.id))
    );

    return groupEvents;
  } catch (error) {
    console.error("Error fetching group events by ID:", error);
    throw error;
  }
};

export const fetchEventConnections = async (id: number): Promise<any[]> => {
  try {
    // Fetch the event by ID
    const eventResponse = await axios.get(`http://localhost:3000/events/${id}`);
    const event = eventResponse.data;

    if (!event?.attendees) {
      throw new Error(`Attendees not found for event with ID: ${id}`);
    }

    // Fetch all users
    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    // Filter users who are attending the event
    const eventConnections = users.filter((user: any) =>
      event?.attendees.includes(Number(user.id))
    );

    return eventConnections;
  } catch (error) {
    console.error("Error fetching event connections:", error);
    throw error;
  }
};
export const fetchGroupMembers = async (id: number): Promise<any[]> => {
  try {
    // Fetch the group by ID
    const groupResponse = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = groupResponse.data;

    console.log("Group Data:", group);

    // Check if the group has a 'members' field and ensure it's an array
    if (!group?.members || !Array.isArray(group.members)) {
      throw new Error(`Members not found or invalid for group with ID: ${id}`);
    }

    // Fetch all users
    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    console.log("Users Data:", users);

    // Filter users who are members of the group
    const groupMembers = users.filter((user: any) =>
      group.members.includes(Number(user.id))
    );

    console.log("Group Members:", groupMembers);

    return groupMembers;
  } catch (error) {
    console.error("Error fetching group members:", error);
    throw error;
  }
};

export const fetchAllGroups = async (params: {
  category?: string;
  sortBy?: string;
}) => {
  try {
    // Fetch all groups
    const groupsResponse = await axios.get("http://localhost:3000/groups");
    let filteredData = groupsResponse.data;

    // Filter by category if specified
    if (params.category) {
      filteredData = filteredData.filter(
        (group: any) => group.category === params.category
      );
    }

    // Sort by specified criteria (popular or date)
    if (params.sortBy === "popular") {
      filteredData = sortByPopularity(filteredData);
    } else if (params.sortBy === "date") {
      filteredData = sortByDate(filteredData);
    }

    return filteredData;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export const fetchUserEvents = async (
  id: number,
  params: { category?: string; date?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    // Fetch all events
    const eventsResponse = await axios.get("http://localhost:3000/events");
    let allEvents = eventsResponse.data;

    // Filter events based on passed parameters
    if (params.category) {
      allEvents = allEvents.filter(
        (event: any) => event.category === params.category
      );
    }

    if (params.date) {
      allEvents = allEvents.filter((event: any) => event.date === params.date);
    }

    // Sorting by provided criteria
    if (params.sortBy === "popular") {
      allEvents = sortByPopularity(allEvents);
    } else if (params.sortBy === "date") {
      allEvents = sortByDate(allEvents);
    }

    // Filter events where the user is an attendee
    const userEvents = allEvents.filter((event: any) =>
      event.attendees.includes(Number(id))
    );

    return userEvents;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
};

export const fetchUserGroups = async (
  id: number,
  params: { category?: string; sortBy?: string }
): Promise<any[]> => {
  try {
    // Fetch all groups
    const groupsResponse = await axios.get("http://localhost:3000/groups");
    let allGroups = groupsResponse.data;

    // Filter groups based on passed parameters
    if (params.category) {
      allGroups = allGroups.filter(
        (group: any) => group.category === params.category
      );
    }

    // Sorting by provided criteria
    if (params.sortBy === "popular") {
      allGroups = sortByPopularity(allGroups);
    } else if (params.sortBy === "date") {
      allGroups = sortByDate(allGroups);
    }

    // Filter groups where the user is a member
    const userGroups = allGroups.filter((group: any) =>
      group.members.includes(Number(id))
    );

    return userGroups;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
};

export const fetchUserConnection = async (id: number): Promise<any[]> => {
  try {
    // Fetch all users
    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    // Filter users where the connections array includes the given user ID
    const userConnections = users.filter((user: any) =>
      user.connections.includes(Number(id))
    );

    return userConnections;
  } catch (error) {
    console.error("Error fetching user connections:", error);
    throw error;
  }
};

export const fetchSortedEvents = async (sortBy: string): Promise<any[]> => {
  try {
    // Fetch all events
    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    // Sort the events based on the provided `sortBy` parameter
    let sortedEvents: any[] = [];

    if (sortBy === "popular") {
      sortedEvents = events.sort((a, b) => b.popularity - a.popularity); // Sort by popularity (example)
    } else if (sortBy === "date") {
      sortedEvents = events.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ); // Sort by date
    } else if (sortBy === "free") {
      sortedEvents = events.filter((event) => event.price === "Free"); // Filter by "Free" events
    } else {
      sortedEvents = events; // Return unsorted if no matching criteria
    }

    return sortedEvents;
  } catch (error) {
    console.error("Error fetching sorted events:", error);
    throw error;
  }
};

export const fetchConnectionEvents = async (id: number): Promise<any[]> => {
  try {
    // Fetch the user's connection data
    const connectionResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const connection = connectionResponse.data;

    // Fetch all events
    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    // Filter events where the event id is included in the connection's connections list
    const connectionEvents = events.filter((event) =>
      connection?.connections.includes(Number(event.id))
    );

    return connectionEvents;
  } catch (error) {
    console.error("Error fetching connection events:", error);
    throw error;
  }
};

export const fetchConnectionGroups = async (id: number): Promise<any[]> => {
  try {
    // Fetch the user's connection data
    const connectionResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const connection = connectionResponse.data;

    // Fetch all groups
    const groupsResponse = await axios.get("http://localhost:3000/groups");
    const groups = groupsResponse.data;

    // Filter groups where the group id is included in the connection's groups list
    const connectionGroups = groups.filter((group) =>
      connection?.groups.includes(Number(group.id))
    );

    return connectionGroups;
  } catch (error) {
    console.error("Error fetching connection groups:", error);
    throw error;
  }
};

export const fetchConnectionConnections = async (
  id: number
): Promise<any[]> => {
  try {
    // Fetch the user's connection data
    const connectionResponse = await axios.get(
      `http://localhost:3000/users/${id}`
    );
    const connection = connectionResponse.data;

    // Fetch all users
    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    // Filter users where the user id is included in the connection's connections list
    const connectionConnections = users.filter((user) =>
      connection?.connections.includes(Number(user.id))
    );

    return connectionConnections;
  } catch (error) {
    console.error("Error fetching connection connections:", error);
    throw error;
  }
};
// export const fetchAllEvents = (params: {
//   category?: string;
//   date?: string;
//   sortBy?: string;
// }) => {
//   let filteredData = [...eventsData];

//   if (params.category) {
//     filteredData = filteredData.filter(
//       (event) => event.category === params.category
//     );
//   }

//   if (params.date) {
//     filteredData = eventsDateFilter(filteredData, params.date);
//   }

//   if (params.sortBy === "popular") {
//     filteredData = sortByPopularity(filteredData);
//   } else if (params.sortBy === "date") {
//     filteredData = sortByDate(filteredData);
//   } else if (params.sortBy === "free") {
//     filteredData = sortByFree(filteredData);
//   }

//   return Promise.resolve(filteredData);
// };

// export const fetchEventById = (id) => {
//   const event = eventsData.find((event) => event.id === id);

//   return Promise.resolve(event);
// };

// export const fetchGroupById = (id) => {
//   const group = groupsData.find((group) => group.id === id);

//   return Promise.resolve(group);
// };

// export const fetchConnectionById = (id) => {
//   const connection = usersData.find((user) => user.id === id);

//   return Promise.resolve(connection);
// };

// export const fetchEventGroupById = async (id) => {
//   const event = await fetchEventById(id);
//   const group = await fetchGroupById(event?.groupId);

//   return group;
// };

// export const fetchGroupEventsById = async (id) => {
//   const group = await fetchGroupById(id);
//   const events = await fetchAllEvents({});
//   const groupEvents = events.filter((event) =>
//     group?.events.includes(event.id)
//   );

//   return groupEvents;
// };

// export const fetchEventConnections = async (id) => {
//   const event = await fetchEventById(id);
//   const users = await fetchAllUser();

//   const eventConnections = users.filter((user) =>
//     event?.attendees.includes(user.id)
//   );

//   return eventConnections;
// };

// export const fetchGroupMembers = async (id) => {
//   const group = await fetchGroupById(id);
//   const users = await fetchAllUser();

//   const groupMembers = users.filter((user) => group?.members.includes(user.id));

//   return groupMembers;
// };

// export const fetchAllGroups = (params: {
//   category?: string;
//   sortBy?: string;
// }) => {
//   let filteredData = [...groupsData];

//   if (params.category) {
//     filteredData = filteredData.filter(
//       (group) => group.category === params.category
//     );
//   }

//   if (params.sortBy === "popular") {
//     filteredData = sortByPopularity(filteredData);
//   } else if (params.sortBy === "date") {
//     filteredData = sortByDate(filteredData);
//   }

//   return Promise.resolve(filteredData);
// };

// export const fetchUserEvents = async (
//   id: number,
//   params: { category?: string; date?: string; sortBy?: string }
// ): Promise<any[]> => {
//   const allEvents = await fetchAllEvents(params);
//   const userEvents = allEvents.filter((event) => event.attendees.includes(id));

//   return Promise.resolve(userEvents);
// };

// export const fetchUserGroups = async (
//   id: number,
//   params: { category?: string; sortBy?: string }
// ): Promise<any[]> => {
//   const allGroups = await fetchAllGroups(params);
//   const userGroups = allGroups.filter((group) => group.members.includes(id));

//   return Promise.resolve(userGroups);
// };

// export const fetchUserConnection = async (id: number): Promise<any[]> => {
//   const users = await fetchAllUser();
//   const userconnections = users.filter((user) => user.connections.includes(id));

//   return Promise.resolve(userconnections);
// };

// export const fetchSortedEvents = async (sortBy: string): Promise<any[]> => {
//   const events = await fetchAllEvents({ sortBy });
//   return events;
// };

// export const fetchConnectionEvents = async (id) => {
//   const connection = await fetchConnectionById(id);
//   const events = await fetchAllEvents({});

//   const connectionEvents = events.filter((event) =>
//     connection?.connections.includes(event.id)
//   );

//   return connectionEvents;
// };

// export const fetchConnectionGroups = async (id) => {
//   const connection = await fetchConnectionById(id);
//   const groups = await fetchAllGroups({});

//   const connectionGroups = groups.filter((group) =>
//     connection?.groups.includes(group.id)
//   );

//   return connectionGroups;
// };

// export const fetchConnectionConnections = async (id) => {
//   const connection = await fetchConnectionById(id);
//   const users = await fetchAllUser();

//   const connectionConnections = users.filter((user) =>
//     connection?.connections.includes(user.id)
//   );

//   return connectionConnections;
// };
