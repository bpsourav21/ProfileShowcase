import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./container/Layout";
import "./App.css";
import NotFound from "./components/NotFound";
import Profiles from "./components/Profiles";
import AddOrEditProfile from "./components/AddOrEditProfile";
import { AuthProvider } from "./helpers/AuthProvider";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Profiles />} />
              <Route path="/add-profile" element={<AddOrEditProfile />} />
              <Route path="/edit-profile/:id" element={<AddOrEditProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
