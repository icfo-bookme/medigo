import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StatusProvider } from '@/context/contextStatus';
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';






export default function App({ Component, pageProps }) {
 

  
  return (
    <StatusProvider>
      <main>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose="1500"
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover
            draggable={true}
          />
        </Layout>
      </main>
    </StatusProvider>
  );
    
}
