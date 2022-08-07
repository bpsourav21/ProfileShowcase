import { ProfileActionType } from "../actions/actionTypes";
import { ProfileDto, WorkExperience } from "../dtos/profile";

export interface ProfileState {
  isLoading: boolean;
  errorMsg: string;
  allProfiles: ProfileDto[];
  profile: ProfileDto;
  workExperiences: WorkExperience[];
}

const emptyProfile = {} as ProfileDto;

const initialState: ProfileState = {
  isLoading: false,
  errorMsg: "",
  allProfiles: [],
  profile: emptyProfile,
  workExperiences: []
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
        profile: emptyProfile,
        workExperiences: [],
        isLoading: true,
      };
    case ProfileActionType.GET_PROFILE.SUCCESS: {
      const currentProfile = action.payload as ProfileDto;
      return {
        ...state,
        profile: currentProfile,
        workExperiences: currentProfile.workExperiences,
        isLoading: false,
      };
    }
    case ProfileActionType.GET_PROFILE.FAILED:
      return {
        ...state,
        profile: emptyProfile,
        workExperiences: [],
        isLoading: false,
      };

    case ProfileActionType.ADD_PROFILE_EXPERIENCE:
      return {
        ...state,
        workExperiences: state.workExperiences.concat(action.payload)
      }
    default:
      return state;
  }
};
