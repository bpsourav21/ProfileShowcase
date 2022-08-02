import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./container/Layout";
import "./App.css";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Devices from "./components/Devices";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import { AuthProvider } from "./helpers/AuthProvider";

const App = () => {
  return (
    <div className="fluid-container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<ProtectedRoute redirectPath="/login" />}>
                <Route index element={<Devices />} />
                <Route path="devices" element={<Devices />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
