import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useEffect, useRef } from "react";
import styles from "./SideProfileMenu.module.css";

import { useStatus } from "@/context/contextStatus";
import { toast } from "react-toastify";

export default function SideProfileMenu() {
  const {
    profileMenu,
    setProfileMenu,
    token,
    setToken,
    setUserData,
    setTabIndex,
  } = useStatus();
  const router = useRouter();

  const handleLogout = () => {
    toast.success("Successfully logged out!");
    setToken(null);
    setName(null);

    destroyCookie({}, "token", {
      path: "/",
    });
    destroyCookie({}, "name", {
      path: "/",
    });

    destroyCookie({}, "userId", {
      path: "/",
    });

    destroyCookie({}, "avatar", {
      path: "/",
    });
    setPromoValue(null);
    destroyCookie(null, "promovalue", {
      path: "/",
    });
    setCouponId("");
    destroyCookie(null, "couponid", {
      path: "/",
    });

    router.push("/");
    setProfileMenu(false);
  };
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, profileMenu]);

  const handleLogin = () => {
    router.push("/auth");
    setProfileMenu(false);
  };

  const handleSignUp = () => {
    router.push("/auth");
    setTabIndex(0);
    setProfileMenu(false);
  };



  return (
    <div className={`${profileMenu ? styles.main__wrapper : ``}`}>
      <div
        ref={wrapperRef}
        className={`${styles.main}  ${profileMenu ? styles.show : styles.hide}`}
      >
        <div className="flex items-center justify-between px-2 py-2 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800">
          <h4 className="text-white tracking-wider font-semibold">Profile</h4>
          <svg
            className="fill-current h-6 w-6 text-white"
            onClick={() => setProfileMenu(false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>
        </div>
        <div className="p-3">
          <ul>
            {/* <li>shahidul</li> */}
            {token ? (
              <div className="space-y-2">
                <Link
                  prefetch={false}
                  href="/"
                  onClick={() => setProfileMenu(false)}
                >
                  <li className="text-black">Home</li>
                </Link>
                <hr />
                <Link
                  prefetch={false}
                  href="/account/orders"
                  onClick={() => setProfileMenu(false)}
                >
                  <li className="text-black">My Profile </li>
                </Link>
                <hr />
                <ul
                  onClick={handleLogout}
                  
                >
                  <li className="text-black">Log out</li>
                </ul>
                <hr />
              </div>
            ) : (
              <div className="space-y-2">
                <ul onClick={handleLogin}>
                  <li className="text-black">Login</li>
                </ul>
                <hr />
                <ul onClick={handleSignUp}>
                  <li className="text-black">Sign up</li>
                </ul>
                <hr />
              </div>
            )}

            {/* {
                        categoryItems?.map((categoryItem) =>
                            <li key={categoryItem?._id}>
                                <a>
                                    {categoryItem.name}
                                </a>
                                <hr />
                            </li>
                        )
                    } */}
          </ul>
        </div>
      </div>
    </div>
  );
}
