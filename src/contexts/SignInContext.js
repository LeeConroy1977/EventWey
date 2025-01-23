import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { fetchAllUsers } from "../../utils/api/user-api";
import { SignInUser } from "../../utils/api/auth-api";
const SignInContext = createContext(undefined);
export const SignInProvider = ({ children, }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isFormValid, setIsFormValid] = useState(null);
    const checkIfUserExists = async (email) => {
        try {
            const users = await fetchAllUsers();
            const existingUser = users.some((user) => user.email === email);
            return existingUser;
        }
        catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to check if user exists.");
            return null;
        }
    };
    const handleFindUser = async (email, password) => {
        try {
            const user = await SignInUser(email, password);
            return user;
        }
        catch (error) {
            console.error("Error fetching user:", error);
            setError("Failed to fetch user.");
            return null;
        }
    };
    const handleEmailValidation = (email, regex) => {
        if (email.length === 0) {
            setIsEmailValid(null);
        }
        if (regex.test(email)) {
            setIsEmailValid(true);
        }
        else if (email.length > 0 && !regex.test(email)) {
            setIsEmailValid(false);
        }
    };
    const handlePasswordValidation = (password, regex) => {
        if (password.length < 8) {
            setIsPasswordValid(null);
        }
        if (regex.test(password)) {
            setIsPasswordValid(true);
        }
        else if (password.length >= 8 && !regex.test(password)) {
            setIsPasswordValid(false);
        }
    };
    const handleValidation = (emailValid, passwordValid) => {
        if (emailValid && passwordValid) {
            setIsFormValid(true);
        }
        else {
            setIsFormValid(false);
        }
    };
    return (_jsx(SignInContext.Provider, { value: {
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
        }, children: children }));
};
export const useSignInContext = () => {
    const context = useContext(SignInContext);
    if (!context) {
        throw new Error("useSignInContext must be used within a SignInProvider");
    }
    return context;
};
