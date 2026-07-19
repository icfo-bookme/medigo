import { useStatus } from '@/context/contextStatus'
import request from '@/lib/request'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'

import Cart from '../Cart'
import FeedbackModal from '../OrderSection/FeedbackModal'
import Sidebar from '../Sidebar'
import BottomNavbar from './BottomNavbar/BottomNavbar'
import Footer from './Footer'
import Loading from './Loading'
import Navbar from './Navbar/Navbar'
import Notification from './Notification/Notification'
import ResLeftMenu from './RsLeftMenu/RsLeftMenu'
import SideProfileMenu from './SideProfileMenu/SideProfileMenu'

const Layout = ({ children }) => {
  const router = useRouter();

  const { isCartOpen, setIsCartOpen, words, setWords, userId } = useStatus();

  const [data, setData] = useState([]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState("");

  useEffect(() => {
    const getCat = async () => {
      const [res, searchTextRes, companyRes] = await Promise.all([
        request(`get-categories`),
        request(`get-search-text`),
        request(`get-company-info`),
      ]);

      setData(res?.data);
      setWords(
        searchTextRes?.data?.search_text?.split(",").map((text) => text.trim())
      );
      setCompanyInfo(companyRes?.data?.company_info);
    };
    getCat();
  }, []);

  useEffect(() => {
    const setupOneSignal = async () => {
      try {
        if (typeof window !== "undefined") {
          const OneSignal = (await import("react-onesignal")).default;

          await OneSignal.init({
            appId: "04644f3f-4090-474f-a798-0f19659dbf71", // Replace with your App ID
            promptOptions: {
              slidedown: {
                prompts: [
                  {
                    text: {
                      actionMessage:
                        "Would you like to receive notifications? Stay updated with our latest news!",
                      acceptButton: "Yes, Notify Me",
                      cancelButton: "No, Thanks",
                    },
                  },
                ],
              },
            },
          });

          if (userId) {
            await OneSignal.login(userId);
          }
        }
      } catch (error) {
        console.error("OneSignal initialization failed:", error);
      }
    };

    setupOneSignal();
  }, [userId]);

  return (
    <>
      <Head>
        <title>Medigo</title>
        <meta
          name="description"
          content="Medigo is a one-stop destination for all healthcare needs. It offers various services such as medicine delivery, doctor consultations, lab tests, and more"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/image/logo.png" />
        <link rel="canonical" href="https://medigo.com.bd" />
        <meta name="robots" content="all" />
        <meta
          name="keywords"
          content="medigo,medicine delivery, online pharmacy, healthcare products, lab tests, doctor consultations, beauty items, Medigo Bangladesh, health services, online healthcare, fast delivery"
        />
        <meta
          property="og:title"
          content="Medigo - Order Medicine, Healthcare Products, Lab Tests &amp; Beauty Items Online in Bangladesh"
        />
        <meta
          property="og:description"
          content="Medigo offers a wide range of healthcare products including medicine, healthcare products, lab tests &amp; beauty items. Order online for fast delivery across Bangladesh."
        />
        <meta property="og:url" content="https://medigo.com.bd" />
        <meta property="og:image" content="/image/logo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Medigo - Order Medicine, Healthcare Products, Lab Tests &amp; Beauty Items Online in Bangladesh"
        />
        <meta
          name="twitter:description"
          content="Medigo offers a wide range of healthcare products including medicine, healthcare products, lab tests &amp; beauty items. Order online for fast delivery across Bangladesh."
        />
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></script>
      </Head>
      <div className="font-body">
        <Navbar
          data={data}
          setFeedbackModalOpen={setFeedbackModalOpen}
          words={words}
        />
        <div className="flex">
          {["/auth", "/otp", "/forgot-password"].includes(router.pathname) ? null : (
            <Sidebar data={data} />
          )}
          <div className="flex-1 border-l border-gray-300 overflow-y-auto sm:overflow-hidden xls:overflow-hidden xms:overflow-hidden xs:overflow-hidden">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer companyInfo={companyInfo} />
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          </div>
        </div>
        <ResLeftMenu data={data} />
        <Notification />
        <SideProfileMenu />
        <BottomNavbar setFeedbackModalOpen={setFeedbackModalOpen} />
        <FeedbackModal
          feedbackModalOpen={feedbackModalOpen}
          setFeedbackModalOpen={setFeedbackModalOpen}
        />
      </div>
    </>
  );
};

export default Layout;
