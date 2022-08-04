
import { ProfileDto } from "../dtos/profile";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { Profile } from "./actionTypes";

export const getProfiles = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Profile.GET_PROFILES_DATA_REQUEST });
    apiService
      .get(`/profiles`)
      .then((res) => {
        const data: ProfileDto[] = res.data;
        dispatch({
          type: Profile.GET_PROFILES_DATA_SUCCESS,
          payload: data
        });
      })
      .catch((e) => {
        dispatch({
          type: Profile.GET_PROFILES_DATA_FAILED,
          payload: e,
        });
      });
  };
};
