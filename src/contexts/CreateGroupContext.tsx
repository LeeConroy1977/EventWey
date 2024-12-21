import React, { useReducer, createContext, useContext, useState } from "react";
import {
  CreateGroupReducer,
  initialState,
  CreateGroupState,
  CreateGroupAction,
} from "../reducers/CreateGroupReducer";
import { fetchAllCategories, postGroup } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const CreateGroupContext = createContext<{
  state: CreateGroupState;
  dispatch: React.Dispatch<CreateGroupAction>;
  nextStep: () => void;
  prevStep: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  nextStep: () => {},
  prevStep: () => {},
});

const newGroupObj = {
  name: "",
  image: "",
  groupAdmin: [],
  description: [],
  openAccess: true,
  category: "",
  location: {
    placename: "",
    lng: -2.4512,
    lat: 50.6105,
  },
  creationDate: "",
  members: [],
  events: [],
  groupComments: [],
  approved: false,
};

export const CreateGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CreateGroupReducer, initialState);
  const [newGroup, setNewGroup] = useState({
    name: "",
    image: "",
    groupAdmin: [],
    description: [],
    openAccess: true,
    category: "",
    location: {
      placename: "",
      lng: -2.4512,
      lat: 50.6105,
    },
    creationDate: "",
    members: [],
    events: [],
    groupComments: [],
    approved: false,
  });
  const [categories, setCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  const getAllCatgories = async () => {
    try {
      const categories = await fetchAllCategories();

      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };

  const createGroup = async (newGroup) => {
    try {
      const group = await postGroup(newGroup);
      setNewGroup(group);
      return newGroup;
    } catch (error) {
      console.error("Error fetching categories:", error);
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

  function resetGroup() {
    dispatch({ type: "RESTART_GROUP_CREATION" });
  }

  console.log(newGroup);

  return (
    <CreateGroupContext.Provider
      value={{
        nextStep,
        prevStep,
        newGroup,
        setNewGroup,
        state,
        categories,
        getAllCatgories,
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

export const useCreateGroupContext = () => useContext(CreateGroupContext);
