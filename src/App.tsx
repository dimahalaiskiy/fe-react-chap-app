import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ErrorBoundary from './hoc/ErrorBoundary';
import { UserProfileProvider } from './context/UserProfileProvider';

import { Login } from './pages/login/Login';
import { SignUp } from './pages/singup/Signup';
import { Home } from './pages/home/Home';

export const App = () => {
  return (
    <ErrorBoundary>
      <UserProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProfileProvider>
    </ErrorBoundary>
  );
};

export default App;
