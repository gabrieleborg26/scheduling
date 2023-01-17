import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {

  const noAuthRequired = ["/login"];
  const router = useRouter();

  return <AuthContextProvider>
    {noAuthRequired.includes(router.pathname) ? (
      <Component {...pageProps} />
    ) : (
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    )}
  </AuthContextProvider>
}

export default MyApp
