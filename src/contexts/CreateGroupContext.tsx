import React, { useReducer, createContext, useContext } from "react";
import {
  CreateGroupReducer,
  initialState,
  CreateGroupState,
  CreateGroupAction,
} from "../reducers/CreateGroupReducer";

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

export const CreateGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CreateGroupReducer, initialState);

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  return (
    <CreateGroupContext.Provider
      value={{ state, dispatch, nextStep, prevStep }}
    >
      {children}
    </CreateGroupContext.Provider>
  );
};

export const useCreateGroupContext = () => useContext(CreateGroupContext);
