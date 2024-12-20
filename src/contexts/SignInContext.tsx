import React, { createContext, useContext, useState } from "react";

import { fetchAllUser } from "../../utils/api";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const SignInContext = createContext<{}>({});

export const SignInProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);

  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const checkIfUserExists = async (email) => {
    try {
      const users = await fetchAllUser();
      const existingUser = users.some((user) => user.email === email);
      return existingUser;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

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

  function handleValidation(email, password) {
    if (email === true && password === true) {
      setIsFormValid(true);
    }
  }

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
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};

export const useSignInContext = () => useContext(SignInContext);
