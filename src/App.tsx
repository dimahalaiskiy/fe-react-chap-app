import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from './hoc/error-boundary/ErrorBoundary';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './hoc/private-route/PrivateRoute';

import { NotFound } from './pages/not-found/NotFound';
import { Layout } from './layouts/main-wrapper/WrapperLayout';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/signup/Signup';
import { Chats } from './pages/chats/Chats';
import { ProfileSettings } from './pages/profile-settings/ProfileSettings';

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
      <Toaster />
    </ErrorBoundary>
  );
};
