import { jsx as _jsx } from "react/jsx-runtime";
import { useReducer, createContext, useContext, useState } from "react";
import { CreateUserReducer, initialState, } from "../reducers/CreateUserReducer";
import { createUser, updateUser, fetchAllUsers, } from "../../utils/api/user-api";
import { fetchAllTags } from "../../utils/api/categories-api";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
const CreateUserContext = createContext({
    state: initialState,
    dispatch: () => null,
    nextStep: () => { },
    prevStep: () => { },
    resetCreateUser: () => null,
    createNewUser: () => { },
    checkIfUserExists: () => null,
    handleValidation: () => null,
    getTags: () => [],
    finishSignUp: () => null,
});
export const CreateUserProvider = ({ children, }) => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [state, dispatch] = useReducer(CreateUserReducer, initialState);
    const [categoryTags, setCategoryTags] = useState([]);
    const navigate = useNavigate();
    const createNewUser = async (newUser) => {
        setLoading(true);
        setError(null);
        try {
            const createdUser = await createUser(newUser);
            setUser(createdUser);
            console.log("User created successfully:", createdUser);
        }
        catch (err) {
            console.error("Error creating user:", err);
            setError("Failed to create user.");
        }
        finally {
            setLoading(false);
        }
    };
    const patchUser = async (field, value) => {
        try {
            setLoading(true);
            setError(null);
            const updatedUser = await updateUser(user.id, { [field]: value });
            setUser(updatedUser);
        }
        catch (err) {
            console.error(`Error updating user field ${field}:`, err);
            setError(`Failed to update ${field}.`);
        }
        finally {
            setLoading(false);
        }
    };
    const getTags = async () => {
        try {
            setLoading(true);
            setError(null);
            const tags = await fetchAllTags();
            setCategoryTags(tags);
        }
        catch (err) {
            console.error("Error fetching tags");
            setError(`Failed to fetch tags.`);
        }
        finally {
            setLoading(false);
        }
    };
    const checkIfUserExists = async (email) => {
        try {
            const users = await fetchAllUsers();
            const existingUser = users.some((user) => user.email === email);
            return existingUser;
        }
        catch (error) {
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
        }
        else if (!isUsernameValid && username.length < 2) {
            setIsUsernameValid(null);
        }
        else {
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
        }
        else if (!isPasswordValid && password.length < 40) {
            setIsPasswordValid(null);
        }
        else if (!regex.test(password)) {
            setIsPasswordValid(false);
        }
    }
    function handleValidation(username, email, password) {
        if (username && email && password) {
            dispatch({ type: "SET_FORM_VALID", payload: true });
        }
        else {
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
    return (_jsx(CreateUserContext.Provider, { value: {
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
        }, children: children }));
};
export const useCreateUserContext = () => useContext(CreateUserContext);
