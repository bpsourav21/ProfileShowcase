import { ProfileActionType } from "../actions/actionTypes";
import { ProfileDto } from "../dtos/profile";

export interface ProfileState {
  isLoading: boolean;
  errorMsg: string;
  allProfiles: ProfileDto[];
  profile: ProfileDto | null;
}

const initialState: ProfileState = {
  isLoading: false,
  errorMsg: "",
  allProfiles: [],
  profile: null
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: any
): ProfileState => {
  switch (action.type) {
    case ProfileActionType.GET_ALL_PROFILES.PROCESSING:
      return {
        ...state,
        allProfiles: [],
        isLoading: true,
      };
    case ProfileActionType.GET_ALL_PROFILES.SUCCESS:
      return {
        ...state,
        allProfiles: action.payload,
        isLoading: false,
      };
    case ProfileActionType.GET_ALL_PROFILES.FAILED:
      return {
        ...state,
        allProfiles: [],
        isLoading: false,
      };

    case ProfileActionType.GET_PROFILE.PROCESSING:
      return {
        ...state,
        profile: null,
        isLoading: true,
      };
    case ProfileActionType.GET_PROFILE.SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    case ProfileActionType.GET_PROFILE.FAILED:
      return {
        ...state,
        profile: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
