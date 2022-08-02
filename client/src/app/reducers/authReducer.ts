import _ from "underscore";
import { Auth } from "../actions/actionTypes";
import { getAuthToken } from "../helpers/storage";

export interface AuthState {
  isLoading: boolean;
  loginErrorMsg: string;
  isAuthenticated: boolean;
}

const isAuthPresent = !_.isEmpty(getAuthToken());
const initialState: AuthState = {
  isLoading: false,
  loginErrorMsg: "",
  isAuthenticated: isAuthPresent,
};

export const authReducer = (
  state: AuthState = initialState,
  action: any
): AuthState => {
  switch (action.type) {
    case Auth.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginErrorMsg: "",
      };
    case Auth.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case Auth.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        loginErrorMsg: action.payload,
      };
    case Auth.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
      };
    case Auth.AUTHENTICATION_REQUEST:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};
