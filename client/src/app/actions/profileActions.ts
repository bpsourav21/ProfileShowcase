
import { ProfileDto, WorkExperience } from "../dtos/profile";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { ProfileActionType } from "./actionTypes";

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

export const addProfile = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.ADD_NEW_PROFILE.PROCESSING });
    const profile = {
      "name": "mahadi hasan",
      "age": 30,
      "experience": [{
        "jobTitle": "engineer"
      }]
    };

    apiService
      .post(`/profiles/`, profile)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: ProfileActionType.ADD_NEW_PROFILE.SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.ADD_NEW_PROFILE.FAILED,
          payload: e,
        });
      });
  };
};

export const updateProfile = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.UPDATE_PROFILE.PROCESSING });
    apiService
      .put(`/profiles/` + id)
      .then((res) => {
        const data = res.data;
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.FAILED,
          payload: e,
        });
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
        dispatch(getProfiles());
      })
      .catch((e) => {
        dispatch({
          type: ProfileActionType.UPDATE_PROFILE.FAILED,
          payload: e,
        });
      });
  };
};
