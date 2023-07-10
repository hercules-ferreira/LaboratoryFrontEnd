import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import '../../styles/globals.scss'
import { AppProps } from 'next/app';

import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={5000}/>
   </AuthProvider>
  )
}

export default MyApp
