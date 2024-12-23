import axios from "axios";
import { sortByPopularity, sortByDate } from "../fakeEventSorting";

export const fetchAllGroups = async (params: {
  category?: string;
  sortBy?: string;
}) => {
  try {
    const groupsResponse = await axios.get("http://localhost:3000/groups");
    let filteredData = groupsResponse.data;

    if (params.category) {
      filteredData = filteredData.filter(
        (group: any) => group.category === params.category
      );
    }
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

export const fetchGroupById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = response.data;

    console.log("Group Data:", group);
    if (!group) {
      throw new Error(`Group not found for ID: ${id}`);
    }

    return group;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
};

export const postGroup = async (groupData): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/groups",
      groupData
    );

    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const patchGroup = async (id: string, patchObj: any): Promise<any> => {
  try {
    const { data: group } = await axios.get(
      `http://localhost:3000/groups/${id}`
    );
    const patchedGroup = { ...group, ...patchObj };

    const { data: updatedGroup } = await axios.patch(
      `http://localhost:3000/groups/${id}`,
      patchedGroup
    );

    return updatedGroup;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const fetchGroupEventsById = async (id: string): Promise<any[]> => {
  try {
    const groupResponse = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = groupResponse.data;

    console.log("Group Data:", group);

    if (!group?.events || !Array.isArray(group.events)) {
      throw new Error(`Events not found or invalid for group with ID: ${id}`);
    }

    const eventsResponse = await axios.get("http://localhost:3000/events");
    const events = eventsResponse.data;

    const groupEvents = events.filter((event: any) =>
      group.events.includes(String(event.id))
    );

    return groupEvents;
  } catch (error) {
    console.error("Error fetching group events by ID:", error);
    throw error;
  }
};

export const fetchGroupMembers = async (id: string): Promise<any[]> => {
  try {
    const groupResponse = await axios.get(`http://localhost:3000/groups/${id}`);
    const group = groupResponse.data;

    console.log("Group Data:", group);

    if (!group?.members || !Array.isArray(group.members)) {
      throw new Error(`Members not found or invalid for group with ID: ${id}`);
    }

    const usersResponse = await axios.get("http://localhost:3000/users");
    const users = usersResponse.data;

    console.log("Fetched Users:", users);

    const groupMembers = users.filter((user: any) =>
      group.members.includes(String(user.id))
    );

    console.log("Filtered Group Members:", groupMembers);
    return groupMembers;
  } catch (error) {
    throw error;
  }
};
