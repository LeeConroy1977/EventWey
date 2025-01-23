import React, { createContext, useContext, useState } from "react";

import { fetchAllUsers } from "../../utils/api/user-api";
import { SignInUser } from "../../utils/api/auth-api";

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

interface SignInContextType {
  isEmailValid: boolean | null;
  isPasswordValid: boolean | null;
  loading: boolean;
  error: string | null;
  checkIfUserExists: (email: string) => Promise<boolean | null>;
  handleEmailValidation: (email: string, regex: RegExp) => void;
  handlePasswordValidation: (password: string, regex: RegExp) => void;
  handleValidation: (email: boolean, password: boolean) => void;
  isFormValid: boolean | null;
  handleFindUser: (email: string, password: string) => Promise<User | null>;
}

const SignInContext = createContext<SignInContextType | undefined>(undefined);

export const SignInProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);

  const checkIfUserExists = async (email: string) => {
    try {
      const users = await fetchAllUsers();
      const existingUser = users.some((user: User) => user.email === email);
      return existingUser;
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to check if user exists.");
      return null;
    }
  };

  const handleFindUser = async (email: string, password: string) => {
    try {
      const user = await SignInUser(email, password);
      return user as User | null;
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user.");
      return null;
    }
  };

  const handleEmailValidation = (email: string, regex: RegExp) => {
    if (email.length === 0) {
      setIsEmailValid(null);
    }
    if (regex.test(email)) {
      setIsEmailValid(true);
    } else if (email.length > 0 && !regex.test(email)) {
      setIsEmailValid(false);
    }
  };

  const handlePasswordValidation = (password: string, regex: RegExp) => {
    if (password.length < 8) {
      setIsPasswordValid(null);
    }
    if (regex.test(password)) {
      setIsPasswordValid(true);
    } else if (password.length >= 8 && !regex.test(password)) {
      setIsPasswordValid(false);
    }
  };

  const handleValidation = (emailValid: boolean, passwordValid: boolean) => {
    if (emailValid && passwordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <SignInContext.Provider
      value={{
        isEmailValid,
        isPasswordValid,
        loading,
        error,
        checkIfUserExists,
        handleEmailValidation,
        handlePasswordValidation,
        handleValidation,
        isFormValid,
        handleFindUser,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};

export const useSignInContext = (): SignInContextType => {
  const context = useContext(SignInContext);
  if (!context) {
    throw new Error("useSignInContext must be used within a SignInProvider");
  }
  return context;
};
