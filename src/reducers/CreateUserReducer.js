export const initialState = {
    isSignUp: true,
    currentStep: 1,
    isGoogleUser: false,
    errors: {},
    userExists: false,
    isFormValid: false,
};
export const CreateUserReducer = (state, action) => {
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
