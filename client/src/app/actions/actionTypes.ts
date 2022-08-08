interface RequestState {
  PROCESSING: string;
  SUCCESS: string;
  FAILED: string;
}

const actionGenerator = (action: string): RequestState => {
  const processedAction = action.toUpperCase() + "_";
  return {
    PROCESSING: processedAction + "PROCESSING",
    SUCCESS: processedAction + "SUCCESS",
    FAILED: processedAction + "FAILED"
  }
}

export const ProfileActionType = {
  GET_ALL_PROFILES: actionGenerator("GET_ALL_PROFILES"),
  GET_PROFILE: actionGenerator("GET_PROFILE"),
  ADD_NEW_PROFILE: actionGenerator("ADD_NEW_PROFILE"),
  UPDATE_PROFILE: actionGenerator("UPDATE_PROFILE"),
  DELETE_PROFILE: actionGenerator("DELETE_PROFILE"),
  ADD_PROFILE_EXPERIENCE: "ADD_PROFILE_EXPERIENCE"
};

export const Alert = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  NONE: "NONE",
};
