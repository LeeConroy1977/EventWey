export interface Location {
  placename: string;
  address: string;
  city: string;
  lng: number;
  lat: number;
}

export interface CreateGroupState {
  isIntro: boolean;
  currentStep: string;
  currentStepNum: number;
  name: string;
  description: string;
  visibility: "public" | "private";
  location: Location;
  groupAdmin: number | null;
  errors: Partial<Record<string, string>>;
}

export type CreateGroupAction =
  | { type: "START_GROUP_CREATION" }
  | { type: "RESTART_GROUP_CREATION" }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | {
      type: "SET_FIELD";
      payload: { field: keyof CreateGroupState; value: any };
    }
  | {
      type: "SET_LOCATION_FIELD";
      payload: { field: keyof Location; value: any };
    }
  | { type: "SET_ERRORS"; payload: Partial<Record<string, string>> };

const getNextStep = (currentStep: string): string => {
  const steps = [
    "name",
    "description",
    "image",
    "category",
    "access",
    "location",
  ];
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return currentStep;
  }
  return steps[currentIndex + 1];
};

const getPreviousStep = (currentStep: string): string => {
  const steps = [
    "name",
    "description",
    "image",
    "category",
    "access",
    "location",
  ];
  const currentIndex = steps.indexOf(currentStep);
  if (currentIndex <= 0) {
    return currentStep;
  }
  return steps[currentIndex - 1];
};

export const initialState: CreateGroupState = {
  isIntro: true,
  currentStep: "name",
  currentStepNum: 1,
  name: "",
  description: "",
  visibility: "public",
  location: {
    placename: "",
    address: "",
    city: "",
    lng: 0,
    lat: 0,
  },
  groupAdmin: null,
  errors: {},
};

export const CreateGroupReducer = (
  state: CreateGroupState,
  action: CreateGroupAction
): CreateGroupState => {
  switch (action.type) {
    case "START_GROUP_CREATION":
      return { ...state, isIntro: false };
    case "RESTART_GROUP_CREATION":
      return {
        ...state,
        isIntro: true,
        currentStep: "name",
        currentStepNum: 1,
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: getNextStep(state.currentStep),
        currentStepNum: state.currentStepNum + 1,
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: getPreviousStep(state.currentStep),
        currentStepNum: state.currentStepNum - 1,
      };
    case "SET_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_LOCATION_FIELD":
      return {
        ...state,
        location: {
          ...state.location,
          [action.payload.field]: action.payload.value,
        },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
