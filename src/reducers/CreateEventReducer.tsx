export interface CreateEventState {
  isCreateEventIntro: boolean;
  currentStep: number;
}

export type CreateEventAction =
  | { type: "START_EVENT_CREATION" }
  | { type: "RESTART_EVENT_CREATION" }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" };

export const initialState: CreateEventState = {
  isCreateEventIntro: false,
  currentStep: 5,
};

export const CreateEventReducer = (
  state: CreateEventState,
  action: CreateEventAction
): CreateEventState => {
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
