import { fetchAllUsers } from "./user-api";
export const SignInUser = async (email, password) => {
    try {
        const response = await fetchAllUsers();
        const users = Array.isArray(response) ? response : [];
        const user = users.find((user) => user.email === email && user.password === password);
        if (!user) {
            console.warn("No user found with the provided credentials");
            return undefined;
        }
        return user;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};
