import { Profile } from "../actions/actionTypes";
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
    case Profile.GET_PROFILES_DATA_REQUEST:
      return {
        ...state,
        profiles: [],
        isLoading: true,
      };
    case Profile.GET_PROFILES_DATA_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false,
      };
    case Profile.GET_PROFILES_DATA_FAILED:
      return {
        ...state,
        profiles: [],
        isLoading: false,
      };

    default:
      return state;
  }
};
