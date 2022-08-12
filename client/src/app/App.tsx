import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./container/Layout";
import "./App.css";
import NotFound from "./components/NotFound";
import Profiles from "./components/Profiles";
import AddOrEditProfile from "./components/AddOrEditProfile";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Profiles />} />
            <Route path="/add-profile" element={<AddOrEditProfile />} />
            <Route path="/edit-profile/:id" element={<AddOrEditProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
