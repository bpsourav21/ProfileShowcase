import { ProfileActionType } from "../actions/actionTypes";
import { ProfileDto } from "../dtos/profile";

export interface ProfileState {
  isLoading: boolean;
  errorMsg: string;
  profiles: ProfileDto[];
}

const initialState: ProfileState = {
  isLoading: false,
  errorMsg: "",
  profiles: [],
};

export const profileReducer = (
  state: ProfileState = initialState,
  action: any
): ProfileState => {
  switch (action.type) {
    case ProfileActionType.GET_ALL_PROFILES.PROCESSING:
      return {
        ...state,
        profiles: [],
        isLoading: true,
      };
    case ProfileActionType.GET_ALL_PROFILES.SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false,
      };
    case ProfileActionType.GET_ALL_PROFILES.FAILED:
      return {
        ...state,
        profiles: [],
        isLoading: false,
      };

    default:
      return state;
  }
};
