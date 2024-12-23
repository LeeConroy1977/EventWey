import React, { useReducer, createContext, useContext, useState } from "react";
import {
  CreateUserReducer,
  initialState,
  CreateUserState,
  CreateUserAction,
} from "../reducers/CreateUserReducer";
import {
  createUser,
  updateUser,
  fetchAllUsers,
} from "../../utils/api/user-api";
import { fetchAllTags } from "../../utils/api/categories-api";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  googleId: string;
  authMethod: string;
  profileBackgroundImage: string;
  profileImage: string;
  aboutMe: string;
  tags: string[];
  connections: string[];
  groups: string[];
  userEvents: string[];
  messages: string[];
  groupAdmin: string[];
  notifications: string[];
  viewEventsStatus: string;
  viewConnectionsStatus: string;
  viewGroupsStatus: string;
  viewTagsStatus: string;
  viewProfileImage: string;
  viewBioStatus: string;
  aboutMeStatus: string;
  role: string;
}

const CreateUserContext = createContext<{
  state: CreateUserState;
  dispatch: React.Dispatch<CreateUserAction>;
  nextStep: () => void;
  prevStep: () => void;
  resetCreateUser: () => void;
  createNewUser: () => void;
  checkIfUserExists: () => void;
  handleValidation: () => void;
  getTags: () => void;
  finishSignUp: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  nextStep: () => {},
  prevStep: () => {},
  resetCreateUser: () => null,
  createNewUser: () => {},
  checkIfUserExists: () => null,
  handleValidation: () => null,
  getTags: () => [],
  finishSignUp: () => null,
});

export const CreateUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [state, dispatch] = useReducer(CreateUserReducer, initialState);
  const [categoryTags, setCategoryTags] = useState<string[]>([]);

  const navigate = useNavigate();

  const createNewUser = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      const createdUser = await createUser(newUser);
      setUser(createdUser);
      console.log("User created successfully:", createdUser);
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  const patchUser = async (field: keyof User, value: any) => {
    try {
      setLoading(true);
      setError(null);

      const updatedUser = await updateUser(user.id, { [field]: value });
      setUser(updatedUser);
    } catch (err) {
      console.error(`Error updating user field ${field}:`, err);
      setError(`Failed to update ${field}.`);
    } finally {
      setLoading(false);
    }
  };

  const getTags = async () => {
    try {
      setLoading(true);
      setError(null);
      const tags = await fetchAllTags();
      setCategoryTags(tags);
    } catch (err) {
      console.error("Error fetching tags");
      setError(`Failed to fetch tags.`);
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserExists = async (email) => {
    try {
      const users = await fetchAllUsers();
      const existingUser = users.some((user) => user.email === email);
      return existingUser;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

  function handleUsenameValidation(username, regex) {
    if (username.length < 2) {
      setIsUsernameValid(null);
    }

    if (regex.test(username)) {
      setIsUsernameValid(true);
    } else if (!isUsernameValid && username.length < 2) {
      setIsUsernameValid(null);
    } else {
      setIsUsernameValid(false);
    }
  }

  function handleEmailValidation(email, regex) {
    if (email.length === 0) {
      setIsEmailValid(null);
    }
    if (regex.test(email)) {
      setIsEmailValid(true);
    }
    if (!isEmailValid && email.length < 2) {
      setIsEmailValid(null);
    }
    if (!regex.test(email)) {
      setIsEmailValid(false);
    }
  }

  function handlePasswordValidation(password, regex) {
    if (password.length < 8) {
      setIsPasswordValid(null);
    }

    if (regex.test(password)) {
      setIsPasswordValid(true);
    } else if (!isPasswordValid && password.length < 40) {
      setIsPasswordValid(null);
    } else if (!regex.test(password)) {
      setIsPasswordValid(false);
    }
  }

  function handleValidation(username, email, password) {
    if (username && email && password) {
      dispatch({ type: "SET_FORM_VALID", payload: true });
    } else {
      dispatch({ type: "SET_FORM_VALID", payload: false });
    }
  }

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const prevStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const resetCreateUser = () => {
    dispatch({ type: "RESET_SIGNUP" });
  };

  const finishSignUp = () => {
    navigate("/user/events");
  };

  return (
    <CreateUserContext.Provider
      value={{
        state,
        dispatch,
        nextStep,
        prevStep,
        resetCreateUser,
        createNewUser,
        checkIfUserExists,
        handleValidation,
        handleUsenameValidation,
        handleEmailValidation,
        handlePasswordValidation,
        isUsernameValid,
        isEmailValid,
        isPasswordValid,
        patchUser,
        getTags,
        categoryTags,
        finishSignUp,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};

export const useCreateUserContext = () => useContext(CreateUserContext);
