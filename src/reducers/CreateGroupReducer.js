export const initialState = {
    isCreateGroupIntro: true,
    currentStep: 1,
};
export const CreateGroupReducer = (state, action) => {
    switch (action.type) {
        case "START_GROUP_CREATION":
            return { ...state, isCreateGroupIntro: false, currentStep: 1 };
        case "RESTART_GROUP_CREATION":
            return {
                ...state,
                isCreateGroupIntro: true,
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
