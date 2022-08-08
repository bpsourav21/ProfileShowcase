
import { ProfileDto, WorkExperience } from "../dtos/profile";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { Alert, ProfileActionType } from "./actionTypes";

export const getProfiles = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.GET_ALL_PROFILES.PROCESSING });
    apiService
      .get(`/profiles`)
      .then((res) => {
        const data: ProfileDto[] = res.data;
        dispatch({
          type: ProfileActionType.GET_ALL_PROFILES.SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.GET_ALL_PROFILES.FAILED,
          payload: e,
        });
      });
  };
};

export const addProfileExperience = (workExperience: WorkExperience) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ProfileActionType.ADD_PROFILE_EXPERIENCE,
      payload: workExperience
    });
  };
}

export const getOneProfile = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.GET_PROFILE.PROCESSING });
    apiService
      .get(`/profiles/` + id)
      .then((res) => {
        const data: ProfileDto = res.data;
        dispatch({
          type: ProfileActionType.GET_PROFILE.SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.GET_PROFILE.FAILED,
          payload: e,
        });
      });
  };
};

export const addProfile = (profile: ProfileDto, cb?: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.ADD_NEW_PROFILE.PROCESSING });
    apiService
      .post(`/profiles/`, profile)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: ProfileActionType.ADD_NEW_PROFILE.SUCCESS,
          payload: data
        });
        dispatch(onHandleAlert("Profile Added successfully", true));
        if (cb) {
          cb();
        }
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.ADD_NEW_PROFILE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("Profile Added failed", false));
      });
  };
};

export const updateProfile = (id: number, profile: ProfileDto, cb?: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.UPDATE_PROFILE.PROCESSING });
    apiService
      .put(`/profiles/` + id, profile)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.SUCCESS,
          payload: data
        });
        dispatch(onHandleAlert("Profile updated successfully", true));
        if (cb) {
          cb();
        }
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("Profile updated failed", false));
      });
  };
};

export const deleteProfile = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.UPDATE_PROFILE.PROCESSING });
    apiService
      .delete(`/profiles/` + id)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.SUCCESS,
          payload: data
        });
        dispatch(onHandleAlert("Profile deleted successfully", true));
        dispatch(getProfiles());
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.FAILED,
          payload: e,
        });
        dispatch(onHandleAlert("Profile deleted failed", false));
      });
  };
};

export const onHandleAlert = (msg: string, isSuccess: boolean = true) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: isSuccess ? Alert.SUCCESS : Alert.FAILED,
      payload: msg
    });
    setTimeout(() => {
      dispatch({ type: Alert.NONE });
    }, 3000)
  };
};
