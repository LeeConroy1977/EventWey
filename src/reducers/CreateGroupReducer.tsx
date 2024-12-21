export interface CreateGroupState {
  isCreateGroupIntro: boolean;
  currentStep: number;
}

export type CreateGroupAction =
  | { type: "START_GROUP_CREATION" }
  | { type: "RESTART_GROUP_CREATION" }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" };

export const initialState: CreateGroupState = {
  isCreateGroupIntro: true,
  currentStep: 1,
};

export const CreateGroupReducer = (
  state: CreateGroupState,
  action: CreateGroupAction
): CreateGroupState => {
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
