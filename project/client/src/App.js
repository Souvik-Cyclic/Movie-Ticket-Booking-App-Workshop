import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import BookShow from "./pages/BookShow";
import SingleMovie from "./pages/SingleMovie";
import Partner from "./pages/Partner";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import {
  withAdminAuth,
  withPartnerAuth,
  withUserAuth,
} from "./components/roleBasedAuthRoute";
import UnAuthorized from "./pages/UnAuthorized";
import NotFound from "./pages/NotFound";

function App() {
  const AdminRoute = withAdminAuth(Admin);
  const PartnerRoute = withPartnerAuth(Partner);
  const UserRoute = withUserAuth(Profile);
  const UserMovieRoute = withUserAuth(SingleMovie);
  const UserBookShowRoute = withUserAuth(BookShow);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserRoute />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/partner" element={<PartnerRoute />} />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <SingleMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized"  element={<UnAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
