import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './hoc/error-boundary/ErrorBoundary';
import { AuthProvider } from './context/AuthProvider';
import { UserProfileProvider } from './context/UserProfileProvider';

import { NotFound } from './pages/not-found/NotFound';
import { Layout } from './layout/Layout';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/singup/Signup';
import { Chats } from './pages/chats/Chats';
import { Profile } from './pages/profile/Profile';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <UserProfileProvider>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<SignUp />}></Route>
              <Route
                path='/'
                element={
                  <Layout>
                    <Chats />
                  </Layout>
                }
              ></Route>
              <Route
                path='/profile'
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              ></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </UserProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
