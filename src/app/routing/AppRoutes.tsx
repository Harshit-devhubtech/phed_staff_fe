/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC, useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage, useAuth, getAuthb } from '../modules/auth'
import { App } from '../App'
import { toast } from 'react-toastify'
import { getUserByToken, login } from '../modules/auth/core/_requests'
const { PUBLIC_URL } = process.env



const AppRoutes: FC = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const { saveAuth, setCurrentUser, currentUser } = useAuth();

  const user_name = urlParams.get('user_name') || undefined;
  const role_id = urlParams.get('role_id') || undefined;
  const password = urlParams.get('password') || undefined;

  const handleLogin = async () => {
    if (!user_name || !password || !role_id) {
      toast.error("Missing login credentials");
      return;
    }
    try {
      const { data: auth } = await login(user_name, password, role_id);

      saveAuth(auth);
      const { data: user } = await getUserByToken(auth.api_token);

      setCurrentUser(user);
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'An error occurred during login');
    }
  };



  useEffect(() => {
    if (user_name && password && role_id) {
      handleLogin();
    }

  }, [user_name, password, role_id]);




  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
