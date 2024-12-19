import React, { useReducer, createContext, useContext } from "react";
import {
  CreateUserReducer,
  initialState,
  CreateUserState,
  CreateUserAction,
} from "../reducers/CreateUserReducer";

const CreateUserContext = createContext<{
  state: CreateUserState;
  dispatch: React.Dispatch<CreateUserAction>;
  nextStep: () => void;
  prevStep: () => void;
  resetCreateUser: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  nextStep: () => {},
  prevStep: () => {},
  resetCreateUser: () => null,
});

export const CreateUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CreateUserReducer, initialState);

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const resetCreateUser = () => {
    dispatch({ type: "RESET_SIGNUP" });
  };

  return (
    <CreateUserContext.Provider
      value={{ state, dispatch, nextStep, prevStep, resetCreateUser }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};

export const useCreateUserContext = () => useContext(CreateUserContext);
