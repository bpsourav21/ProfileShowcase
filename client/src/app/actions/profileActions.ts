
import { ProfileDto } from "../dtos/profile";
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

export const getOneProfile = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.GET_PROFILE.PROCESSING });
    apiService
      .get(`/profiles`)
      .then((res) => {
        const data: ProfileDto[] = res.data;
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

export const updateProfile = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ProfileActionType.UPDATE_PROFILE.PROCESSING });
    apiService
      .get(`/profiles`)
      .then((res) => {
        const data: ProfileDto[] = res.data;
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
