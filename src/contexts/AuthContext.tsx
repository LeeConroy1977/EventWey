// contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { signInUser, signOutUser } from '../../utils/api/auth-api';
import { useUser } from './UserContext';

interface AuthContextType {
  isEmailValid: boolean | null;
  isPasswordValid: boolean | null;
  loading: boolean;
  error: string | null;
  isFormValid: boolean | null;
  handleEmailValidation: (email: string, regex: RegExp) => void;
  handlePasswordValidation: (password: string, regex: RegExp) => void;
  handleValidation: (email: boolean, password: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setError: (message: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const handleEmailValidation = (email: string, regex: RegExp) => {
    if (email.length === 0) {
      setIsEmailValid(null);
    } else if (regex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordValidation = (password: string, regex: RegExp) => {
    if (password.length < 8) {
      setIsPasswordValid(null);
    } else if (regex.test(password)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleValidation = (emailValid: boolean, passwordValid: boolean) => {
    setIsFormValid(emailValid && passwordValid);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await signInUser(email, password);
      setUser(userData);
    } catch (err: any) {
      const errorMessage =
        err.message === 'User not found'
          ? 'User not found. Please check your email.'
          : err.message === 'Invalid password'
          ? 'Invalid password. Please try again.'
          : 'Failed to sign in. Please check your credentials.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOutUser();
      setUser(null);
      localStorage.removeItem('token');
    } catch (err: any) {
      setError(err.message || 'Failed to sign out. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isEmailValid,
        isPasswordValid,
        loading,
        error,
        isFormValid,
        handleEmailValidation,
        handlePasswordValidation,
        handleValidation,
        signIn,
        signOut,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};