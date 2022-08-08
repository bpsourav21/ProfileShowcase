import { Outlet } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";
import LoadingOverlay from "../components/LoadingOverlay";
import { useAppSelector } from "../hooks";


const Layout = () => {
  const isLoading = useAppSelector((state) => state.profile.isLoading);
  const alert = useAppSelector((state) => state.profile.alert);
  return (
    <div className="mainWrapper">
      <Outlet />
      {isLoading && <LoadingOverlay />}
      {alert != null && <AlertComponent alert={alert} />}
    </div>
  );
};

export default Layout;
