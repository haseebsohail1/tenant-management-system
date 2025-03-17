// src/pages/_app.tsx
"use client";

import React from "react";
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import store, { persistor }  from '@/redux/store';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { login, logout } from '@/redux/authSlice';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>

<Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <AuthHandler>
          <Component {...pageProps} />
        </AuthHandler>
          </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export function AuthHandler({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user=session?.user
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (session?.user) {
      dispatch(
        login({
          id: session.user.id,
          _id: session.user?.id,
          role: session.user.role,
          email: session.user.email,
          token: session.user.token,
          user: session.user,
        })
      );
    } else {
      dispatch(logout());
    }
  }, [user, dispatch]);

  return <>{children}</>;
}
