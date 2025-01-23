export const initialState = {
    isCreateEventIntro: false,
    currentStep: 5,
};
export const CreateEventReducer = (state, action) => {
    switch (action.type) {
        case "START_EVENT_CREATION":
            return { ...state, isCreateEventIntro: false, currentStep: 1 };
        case "RESTART_EVENT_CREATION":
            return {
                ...state,
                isCreateEventIntro: true,
                currentStep: 1,
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
    }
};
