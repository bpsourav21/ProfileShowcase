import { Device } from "../actions/actionTypes";
import { DeviceDto } from "../models/device";

export interface DeviceState {
  isLoading: boolean;
  errorMsg: string;
  devices: DeviceDto[];
}

const initialState: DeviceState = {
  isLoading: false,
  errorMsg: "",
  devices: [],
};

export const deviceReducer = (
  state: DeviceState = initialState,
  action: any
): DeviceState => {
  switch (action.type) {
    case Device.GET_DEVICES_DATA_REQUEST:
      return {
        ...state,
        devices: [],
        isLoading: true,
      };
    case Device.GET_DEVICES_DATA_SUCCESS:
      return {
        ...state,
        devices: action.payload,
        isLoading: false,
      };
    case Device.GET_DEVICES_DATA_FAILED:
      return {
        ...state,
        devices: [],
        isLoading: false,
      };

    default:
      return state;
  }
};
