export interface CreateUserState {
  isSignUp: boolean;
  currentStep: number;
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
  | { type: "SET_PROFILE_IMAGE"; payload: string }
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
  isSignUp: true,
  currentStep: 1,
  isGoogleUser: false,
  errors: {},
  userExists: false,
  isFormValid: false,
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

    case "SET_GOOGLE_USER":
      return {
        ...state,
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
