import { BrowserRouter, Routes, Route } from "react-router-dom";

import ErrorBoundary from "./hoc/error-boundary/ErrorBoundary";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./hoc/private-route/PrivateRoute";

import { NotFound } from "./pages/not-found/NotFound";
import { Layout } from "./layout/Layout";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/singup/Signup";
import { Chats } from "./pages/chats/Chats";
import { ProfileSettings } from "./pages/profile-settings/ProfileSettings";

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Chats />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <ProfileSettings />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
