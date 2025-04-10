import axios from 'axios';

const API = 'https://eventwey-backend.onrender.com';

// Define the User type based on your backend response (adjust fields as needed)
interface User {
  id: number;
  email: string;
  username?: string;
  // Add other fields returned by your User entity (e.g., loadRelationIds results)
}

export const SignUpUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const signUpData = { username, email, password };

  try {
    const response = await axios.post(`${API}/auth/signup`, signUpData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Send and receive cookies
    });

    return response.data; // User object only
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error('Failed to sign up');
  }
};

export const SignInUser = async (
  email: string,
  password: string
): Promise<User> => {
  const signInData = { email, password };

  try {
    const response = await axios.post(`${API}/auth/signin`, signInData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Send and receive cookies
    });

    return response.data; // User object only
  } catch (error) {
    console.error('Error signing in:', error);
    throw new Error('Failed to sign in');
  }
};

export const SignOutUser = async (): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${API}/auth/signout`, {}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Ensure cookie is cleared
    });

    return response.data; // { message: 'Logged out successfully' }
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
};


