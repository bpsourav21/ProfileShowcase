import { useEffect } from "react";
import { logout } from "../actions/authActions";
import { getDevices, notify } from "../actions/deviceActions";
import { useAppDispatch, useAppSelector } from "../hooks";

const Devices = () => {
  const devices = useAppSelector((state) => state.device.devices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    startDevicesPolling();
  }, []);

  const startDevicesPolling = () => {
    dispatch(getDevices());
    setTimeout(() => startDevicesPolling(), 5000);
  };
  const totalDeviceOnline = devices.length;
  const centerBoxWidth = 150;
  const distance = 100;
  const calculateMovement = (length: number): string => {
    return `calc(50% - ${length / 2}px)`;
  };

  const renderDeviceCircle = (index: number) => {
    const length = centerBoxWidth + (index + 1) * distance;
    const calc = calculateMovement(length);
    const animationDelay = Math.abs(50 - index * 5);
    const animationType = index % 2 === 0 ? "" : "reverse";
    const lastIndex = totalDeviceOnline - 1 - index;
    return (
      <div
        key={"orbit_" + index}
        className="outer orbit"
        style={{
          left: calc,
          top: calc,
          width: length,
          height: length,
          animation: `rotate ${animationDelay}s ${animationType} linear infinite`,
        }}
      >
        <div className="circle"></div>
        {index !== lastIndex && <div className="circle"></div>}
      </div>
    );
  };

  let deviceCircleBlock = [];
  for (let i = 0; i < totalDeviceOnline / 2; i++) {
    deviceCircleBlock.push(renderDeviceCircle(i));
  }

  return (
    <div className="page">
      <div>
        <div
          className="centerBlock"
          style={{
            width: centerBoxWidth,
            height: centerBoxWidth,
            left: calculateMovement(centerBoxWidth),
            top: calculateMovement(centerBoxWidth),
          }}
        >
          <div style={{ color: "#fff" }}>
            <h1 className="text-center text-bold">{totalDeviceOnline}</h1>
            <h5 className="text-center">
              {`DEVICE${totalDeviceOnline > 1 ? "S" : ""}`}
            </h5>
            <h5 className="text-center">{`ONLINE`}</h5>
          </div>
        </div>
        {deviceCircleBlock}
      </div>
      <div className="bottom-block">
        <button
          className="btn btn-md btn-light mx-2"
          onClick={() => dispatch(notify())}
        >
          Notify
        </button>
        <button
          className="btn btn-md btn-dark mx-2"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Devices;
