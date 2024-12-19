export interface CreateUserState {
  isSignUp: boolean;
  currentStep: number;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  profileBackgroundImage: string;
  bio: string;
  aboutMe: string;
  tags: string[];
  googleId: string;
  isGoogleUser: boolean;
  errors: Partial<Record<string, string>>;
  userExists: boolean;
  isFormValid: boolean;
}

export type CreateUserAction =
  | { type: "START_USER_CREATION" }
  | { type: "RESTART_USER_CREATION" }
  | { type: "RESET_SIGNUP" }
  | { type: "SET_FORM_VALID"; payload: boolean }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | {
      type: "SET_FIELD";
      payload: { field: keyof CreateUserState; value: any };
    }
  | {
      type: "SET_GOOGLE_USER";
      payload: { email: string; username: string; googleId: string };
    }
  | { type: "SET_ERRORS"; payload: Partial<Record<string, string>> }
  | { type: "SET_USER_EXISTS"; payload: boolean };

export const initialState: CreateUserState = {
  isSignUp: false,
  currentStep: 1,
  username: "",
  email: "",
  password: "",
  profileImage: "",
  profileBackgroundImage: "",
  bio: "",
  aboutMe: "",
  tags: [],
  googleId: "",
  isGoogleUser: false,
  errors: {},
  userExists: false,
  isFormValid: false,
};

const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9]{2,20}$/;
  if (!username) return "Username is required.";
  if (!usernameRegex.test(username))
    return "Username must be between 2-20 characters.";
  return "";
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email format.";
  return "";
};

const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  if (!password) return "Password is required.";
  if (!passwordRegex.test(password))
    return "Password must be between 8-16 characters, with a number, capital letter, and a special character.";
  return "";
};

export const CreateUserReducer = (
  state: CreateUserState,
  action: CreateUserAction
): CreateUserState => {
  switch (action.type) {
    case "START_USER_CREATION":
      return { ...state, isSignUp: false };

    case "RESTART_USER_CREATION":
      return {
        ...state,
        isSignUp: true,
        currentStep: 1,
        username: "",
        email: "",
        password: "",
        googleId: "",
        isGoogleUser: false,
        userExists: false,
        errors: {},
        isFormValid: false,
      };

    case "RESET_SIGNUP":
      return {
        ...state,
        isSignUp: true,
        currentStep: 1,
        username: "",
        email: "",
        password: "",
        errors: {},
        isFormValid: false,
      };
    case "SET_FORM_VALID":
      return {
        ...state,
        isFormValid: action.payload,
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };

    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };

    case "SET_FIELD":
      const { field, value } = action.payload;
      let errors = { ...state.errors };
      let isFormValid = true;

      if (field === "username") {
        const usernameError = validateUsername(value);
        if (usernameError) errors.username = usernameError;
        else delete errors.username;
      }

      if (field === "email") {
        const emailError = validateEmail(value);
        if (emailError) errors.email = emailError;
        else delete errors.email;
      }

      if (field === "password") {
        const passwordError = validatePassword(value);
        if (passwordError) errors.password = passwordError;
        else delete errors.password;
      }

      for (let key in errors) {
        if (errors[key]) {
          isFormValid = false;
          break;
        }
      }

      return {
        ...state,
        [field]: value,
        errors,
        isFormValid,
      };

    case "SET_GOOGLE_USER":
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        googleId: action.payload.googleId,
        isGoogleUser: true,
      };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_USER_EXISTS":
      return { ...state, userExists: action.payload };

    default:
      return state;
  }
};
