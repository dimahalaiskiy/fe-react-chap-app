import { BrowserRouter, Routes, Route } from "react-router-dom";

import ErrorBoundary from "./hoc/error-boundary/ErrorBoundary";
import { AuthProvider } from "./context/AuthProvider";
import { UserProfileProvider } from "./context/UserProfileProvider";
import { PrivateRoute } from "./hoc/private-route/PrivateRoute";

import { NotFound } from "./pages/not-found/NotFound";
import { Layout } from "./layout/Layout";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/singup/Signup";
import { Chats } from "./pages/chats/Chats";
import { Profile } from "./pages/profile/Profile";

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <UserProfileProvider>
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
                      <Profile />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
