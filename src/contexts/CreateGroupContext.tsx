import React, { useReducer, createContext, useContext, useState } from "react";
import {
  CreateGroupReducer,
  initialState,
  CreateGroupState,
  CreateGroupAction,
} from "../reducers/CreateGroupReducer";
import { fetchAllCategories } from "../../utils/api/categories-api";
import { postGroup } from "../../utils/api/groups-api";
import { useNavigate } from "react-router-dom";
import {Group} from '../types/group'


interface CreateGroupContextType {
  state: CreateGroupState;
  dispatch: React.Dispatch<CreateGroupAction>;
  nextStep: () => void;
  prevStep: () => void;
  newGroup: Partial<Group>;
  setNewGroup: React.Dispatch<React.SetStateAction<Partial<Group>>>;
  categories: string[];
  getAllCategories: () => Promise<void>;
  createGroup: (newGroup: Group) => Promise<Group | null>;
  finishCreateGroup: () => void;
  resetGroup: () => void;
}

const CreateGroupContext = createContext<CreateGroupContextType | undefined>(
  undefined
);

export const CreateGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CreateGroupReducer, initialState);
  const [newGroup, setNewGroup] = useState<Partial<Group>>({
  
  });

  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const fetchedCategories = await fetchAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createGroup = async (newGroup: Group): Promise<Group | null> => {
    try {
      const group = await postGroup(newGroup);
      setNewGroup(group);
      return group;
    } catch (error) {
      console.error("Error creating group:", error);
      return null;
    }
  };

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const finishCreateGroup = () => {
    navigate("/user/events");
  };

  const resetGroup = () => {
    dispatch({ type: "RESTART_GROUP_CREATION" });
    setNewGroup({
      id: 0,
      name: "",
      image: "",
      groupAdmins: [],
      description: [],
      openAccess: true,
      category: "",
      location: { placename: "", lng: -2.4512, lat: 50.6105 },
      creationDate: 0,
      members: [],
      events: [],
      approved: false,
    });
  };

  return (
    <CreateGroupContext.Provider
      value={{
        nextStep,
        prevStep,
        newGroup,
        setNewGroup,
        state,
        categories,
        getAllCategories,
        createGroup,
        finishCreateGroup,
        resetGroup,
        dispatch,
      }}
    >
      {children}
    </CreateGroupContext.Provider>
  );
};

export const useCreateGroupContext = (): CreateGroupContextType => {
  const context = useContext(CreateGroupContext);
  if (!context) {
    throw new Error(
      "useCreateGroupContext must be used within a CreateGroupProvider"
    );
  }
  return context;
};
