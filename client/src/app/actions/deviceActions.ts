import {
  DeviceDto,
  DevicesResultDto,
  NotificationData,
} from "../models/device";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { Device } from "./actionTypes";

export const getDevices = () => {
  return (dispatch: AppDispatch) => {
    apiService
      .get(`/devices`)
      .then((res) => {
        const data: DeviceDto[] = (res.data as DevicesResultDto).devices;
        dispatch({ type: Device.GET_DEVICES_DATA_SUCCESS, payload: data });
      })
      .catch((e) => {
        dispatch({
          type: Device.GET_DEVICES_DATA_FAILED,
          payload: e,
        });
      });
  };
};

export const notify = () => {
  let payload: NotificationData = {
    name: "Mahadi Hasan Sourav",
    email: "bpsourav21@gmail.com",
    repoUrl: "https://github.com/bpsourav21/frontend-developer-test",
    message: "Finally project is being done.... Hurrah!!!!",
  };

  return (dispatch: AppDispatch) => {
    apiService
      .post(`/notify`, payload)
      .then((res) => {
        alert("Notification sent successfully");
      })
      .catch((e) => {
        alert("Notification sent failed");
      });
  };
};
