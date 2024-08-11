import React from "react";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Manage from "./pages/admin/Manage";
import Profile from "./pages/Profile";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import DetailChapter from "./pages/DetailChapter";
import DetailManga from "./pages/DetailManga";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/:title/:idManga" element={<DetailManga />} />
            <Route
              path="/:title/:idManga/:chapter/:idChapter"
              element={<DetailChapter />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
