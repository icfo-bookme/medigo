/* eslint-disable @next/next/no-html-link-for-pages */

import { useStatus } from "@/context/contextStatus";
import Link from "next/link";
import { useRouter } from "next/router";
import { CiShoppingCart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GrHomeRounded } from 'react-icons/gr';
import styles from "./BottomNavbar.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineFeedback } from "react-icons/md";


export default function BottomNavbar({ setFeedbackModalOpen }) {
  const router = useRouter();

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    token,
    setProfileMenu,
    setSideCategory,
    setNotification,
  } = useStatus();

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleProfileRoute = () => {
    if (!token) {
      router.push(`/auth`);
    } else {
      setProfileMenu(true);
    }
  };

  return (
    <div className={styles.bottomNavbar}>
      <div className={` ${!token ? styles.icons : styles.icon} `}>
        <div onClick={() => setSideCategory(true)}>
          <svg
            className="h-6 w-6 fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </div>

        {/* <div className="relative" onClick={() => setNotification(true)}>
          <IoMdNotificationsOutline
            size={30}
            className="text-black animate-ring"
          />
          <div
            className={`bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-[-6px]  ${
              token ? "right-[20px]" : "right-[-5px]"
            }`}
          >
            <p className="text-white text-xs">{1}</p>
          </div>
        </div> */}

        {!token ? (
          <div
            className="cursor-pointer"
            title="customer feedback"
            onClick={() => setFeedbackModalOpen(true)}
          >
            <MdOutlineFeedback className=" text-black" size={30} />
          </div>
        ) : null}

        <Link href="/">
          <span>
            <GrHomeRounded size={20} color="#000" />
          </span>
        </Link>
        <div
          className=" relative cursor-pointer border-r-2 border-white"
          onClick={() => handleCart()}
        >
          <>
            {cartItems?.length > 0 ? (
              <>
                <BsCart3 color="#000" size={25} />
                <div
                  className={`bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-[-8px] ${
                    token ? "right-[20px]" : "right-[-5px]"
                  } `}
                >
                  <p className="text-white text-xs">{cartItems?.length}</p>
                </div>
              </>
            ) : (
              <CiShoppingCart color="#000" size={30} />
            )}
          </>
        </div>

        <div className="flex justify-end" onClick={() => handleProfileRoute()}>
          <span>
            <FiUser size={25} color="#000" />
          </span>
        </div>
      </div>
    </div>
  );
}
