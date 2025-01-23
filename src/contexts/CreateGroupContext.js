import { jsx as _jsx } from "react/jsx-runtime";
import { useReducer, createContext, useContext, useState } from "react";
import { CreateGroupReducer, initialState, } from "../reducers/CreateGroupReducer";
import { fetchAllCategories } from "../../utils/api/categories-api";
import { postGroup } from "../../utils/api/groups-api";
import { useNavigate } from "react-router-dom";
const CreateGroupContext = createContext(undefined);
export const CreateGroupProvider = ({ children, }) => {
    const [state, dispatch] = useReducer(CreateGroupReducer, initialState);
    const [newGroup, setNewGroup] = useState({
        id: "",
        name: "",
        image: "",
        groupAdmin: [],
        description: [],
        openAccess: true,
        category: "",
        location: { placename: "", lng: -2.4512, lat: 50.6105 },
        creationDate: 0,
        members: [],
        events: [],
        messages: [],
        eventsCount: 0,
        approved: false,
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const getAllCategories = async () => {
        try {
            const fetchedCategories = await fetchAllCategories();
            setCategories(fetchedCategories);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const createGroup = async (newGroup) => {
        try {
            const group = await postGroup(newGroup);
            setNewGroup(group);
            return group;
        }
        catch (error) {
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
            id: "",
            name: "",
            image: "",
            groupAdmin: [],
            description: [],
            openAccess: true,
            category: "",
            location: { placename: "", lng: -2.4512, lat: 50.6105 },
            creationDate: 0,
            members: [],
            events: [],
            messages: [],
            eventsCount: 0,
            approved: false,
        });
    };
    return (_jsx(CreateGroupContext.Provider, { value: {
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
        }, children: children }));
};
export const useCreateGroupContext = () => {
    const context = useContext(CreateGroupContext);
    if (!context) {
        throw new Error("useCreateGroupContext must be used within a CreateGroupProvider");
    }
    return context;
};
