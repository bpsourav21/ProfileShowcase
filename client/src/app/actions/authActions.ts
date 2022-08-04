import { AppDispatch } from "../store";
import { Auth } from "./actionTypes";
import _ from "underscore";
import apiService from "../service/apiService";
import { getAuthToken, setAuthToken } from "../helpers/storage";
import { LoginDto } from "../dtos/auth";

export const login = (
  email: string,
  password: string,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Auth.LOGIN_REQUEST });
    const loginCred: LoginDto = {
      email: email,
      password: password,
    };
    apiService
      .post(`/login`, loginCred)
      .then((res) => {
        const token: string = res.data;
        dispatch({ type: Auth.LOGIN_SUCCESS });
        setAuthToken(token);
        callback();
      })
      .catch((e) => {
        dispatch({ type: Auth.LOGIN_FAILED, payload: e });
        setAuthToken("");
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: Auth.LOGOUT_REQUEST });
    setAuthToken("");
  };
};

export const isUserAuthenticated = () => {
  return (dispatch: AppDispatch) => {
    const isAuthPresent = !_.isEmpty(getAuthToken());
    dispatch({ type: Auth.AUTHENTICATION_REQUEST, payload: isAuthPresent });
  };
};
