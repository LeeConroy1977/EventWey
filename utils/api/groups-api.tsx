import axios from "axios";
import { sortByPopularity, sortByDate } from "../fakeEventSorting";

const API = "https://eventwey-backend.onrender.com";

export const fetchAllGroups = async (params: {
  category?: string;
  sortBy?: string;
}) => {
  try {
    const groupsResponse = await axios.get(`${API}/groups`);
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
    const response = await axios.get(`${API}/groups/${id}`);
    const group = response.data;

    if (!group) {
      throw new Error(`Group not found for ID: ${id}`);
    }

    return group;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
};

export const postGroup = async (groupData: any): Promise<any> => {
  try {
    const response = await axios.post(`${API}/groups`, groupData);

    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const patchGroup = async (id: string, patchObj: any): Promise<any> => {
  try {
    const { data: updatedGroup } = await axios.patch(
      `${API}/groups/${id}`,
      patchObj
    );

    return updatedGroup;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const deleteGroup = async (id: string): Promise<any> => {
  try {
    const { data: updatedGroup } = await axios.delete(`${API}/groups/${id}`);

    return updatedGroup;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const fetchGroupEventsById = async (id: string): Promise<any[]> => {
  try {
    const groupEventsResponse = await axios.get(`${API}/groups/${id}/events`);
    const groupEvents = groupEventsResponse.data;

    if (!groupEvents|| !Array.isArray(groupEvents)) {
      throw new Error(`Events not found or invalid for group with ID: ${id}`);
    }

  

    return groupEvents;
  } catch (error) {
    console.error("Error fetching group events by ID:", error);
    throw error;
  }
};

export const fetchGroupMembers = async (id: string): Promise<any[]> => {
  try {
    const groupMembersResponse = await axios.get(`${API}/groups/${id}/members`);
    const groupMembers = groupMembersResponse.data;

    console.log(groupMembers, 'group members')

    if (!groupMembers || !Array.isArray(groupMembers)) {
      throw new Error(`Members not found or invalid for group with ID: ${id}`);
    }

   

    return groupMembers;
  } catch (error) {
    throw error;
  }
};
