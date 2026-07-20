
import { useStatus } from "@/context/contextStatus";

import { ImageHostName } from "@/lib/config";
import request from "@/lib/request";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { Fragment, useEffect, useRef, useState } from 'react';
import { BsCart3, BsPhone } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { GoSearch } from 'react-icons/go';
import { MdLocationOn, MdOutlineFeedback } from 'react-icons/md';
import { toast } from "react-toastify";

import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// google map



const Navbar = ({ data, setFeedbackModalOpen, words }) => {
  const wrapperRef = useRef(null);

  const mobileWrapppedRef = useRef(null);

  const {
    isCartOpen,
    setIsCartOpen,
    setTabIndex,
    token,
    name,
    setName,
    setToken,
    image,
    cartItems,
    fullAddress,
    setFullAddress,
    city,
    setCity,
    quarter,
    setQuarter,
    suburb,
    setSuburb,
    isAlive,
    setIsAlive,
    setPromoValue,
    setCouponId,
    setUserId,
    setPhone,
    tabIndex,
    setIsFixed,
    open,
    setOpen,

  } = useStatus();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [flag, setFlag] = useState(false);
  const [mobileFlag, setMobileFlag] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [userProfileData, setUserProfileData] = useState({});
  const router = useRouter();


  const menuRef = useRef();
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [word, setWord] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const displayDuration = 3000;
  const idleDuration = 250; // 1 second

  // type write effect in search bar
  useEffect(() => {
    if (words?.length > 0) {
      if (subIndex < words[index].length) {
        const timeout = setTimeout(() => {
          setWord((prevWord) => prevWord + words[index][subIndex]);
          setSubIndex((prevSubIndex) => prevSubIndex + 1);
        }, 150);
        return () => clearTimeout(timeout);
      } else if (word.length > 0 && isVisible) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, displayDuration);
        return () => clearTimeout(timeout);
      } else if (!isVisible && word.length > 0) {
        const timeout = setTimeout(() => {
          setWord((prevWord) => prevWord.slice(0, -1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setSubIndex(0);
          setWord("");
          setIsVisible(true);
          setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, idleDuration);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, index, word, isVisible, words]);

  useEffect(() => {
    function handleClickOutside() {
      if (
        mobileWrapppedRef.current &&
        !mobileWrapppedRef.current.contains(event.target)
      ) {
        setMobileFlag(false);
        mobileWrapppedRef.current.value = "";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileWrapppedRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);

      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    function handleClickOutside() {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFlag(false);
        wrapperRef.current.value = "";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const search = async (val) => {
    if (val !== "") {
      router.push(`/search/${val}`);
    } else {
      router.push(`/`);
    }
  };

  const handleCart = () => {
    // console.log("true..");
    setIsCartOpen(!isCartOpen);
  };

  const handleOrder = () => {
    router.replace(`/account/orders`);
  };

  const handleSignIn = () => {
    router.push(`/auth`);
    setTabIndex(1);
  };

  const handleLogOut = () => {
    toast.success("Successfully logged out!");
    setToken(null);
    setName('');
    setPhone('');
    setUserId(null);
    destroyCookie({}, "token", {
      path: "/",
    });
    destroyCookie({}, "name", {
      path: "/",
    });
    destroyCookie({}, "phone", {
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

    router.push(`/${router?.pathname}`);
  };

  useEffect(() => {
    if (isAlive == true) {
      setFullAddress("");
      setCity("");
      setQuarter("");
      setSuburb("");
    }
  }, [isAlive]);

  useEffect(() => {
    if (token) {
      const profileData = async () => {
        let res = await request(`my-profile`);

        setUserProfileData(res?.data);
      };
      profileData();
    }
  }, [token, isAlive]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          convertToAddress(latitude, longitude);
          setIsAlive(!isAlive);
        },
        (error) => {
          console.log(error);
          destroyCookie({}, "quarter", {
            path: "/",
          });
          destroyCookie({}, "suburb", {
            path: "/",
          });

          destroyCookie({}, "city", {
            path: "/",
          });
          destroyCookie({}, "fullAddress", {
            path: "/",
          });
          setIsAlive(!isAlive);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const convertToAddress = async (latitude, longitude) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      .then((response) => {
        setFullAddress(response?.data?.display_name);
        setCookie(null, "fullAddress", response?.data?.display_name, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setCity(response?.data?.address?.city);
        setCookie(null, "city", response?.data?.address?.city, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setQuarter(response?.data?.address?.quarter);
        setCookie(null, "quarter", response?.data?.address?.quarter, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setSuburb(response?.data?.address?.suburb);
        setCookie(null, "suburb", response?.data?.address?.suburb, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const keywords = ["Medicine...", "Generic name..."];
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [keywords]);





  const handleSearchClick = () => {
    if (searchVal !== "") {
      router.push(`/search/${searchVal}`);
    } else {
      router.push(`/`);
    }
  };

  const handleLoginModalOpen = () => {
    setOpen(!open);
    setIsFixed(false);
  };

  return (
    <>
      <div className="sticky left-0 right-0  top-0 z-10 bg-white shadow ">
        <div className=" sm:py-2 xls:py-2 xms:py-2 xs:py-2 ">
          <div className="flex items-center justify-evenly sm:hidden xls:hidden xms:hidden xs:hidden">
            <Link href={`/`}>
              <div className="flex justify-center lg:w-auto lg:flex-1">
                <Image
                  src="/image/logo3.png"
                  alt="logo"
                  width={100}
                  height={70}
                  className="object-contain h-20"
                  priority
                />
              </div>
            </Link>
            <div className="relative cursor-pointer md:hidden">
              <div className="flex space-x-2 ">
                <div>
                  <MdLocationOn size={30} className="text-black" />{" "}
                </div>
                <div>
                  <div
                    className="flex items-center space-x-2 "
                    onClick={handleGetLocation}
                  >
                    {!fullAddress ? (
                      <p className="text-black mt-1 lg:text-sm md:text-sm">
                        Select your location
                      </p>
                    ) : (
                      <div className="flex space-x-2 items-center lg:text-sm  md:text-xs text-black">
                        {/* <p>Deliver to:</p> */}
                        <p className="font-bold mt-1 text-sm">
                          {city}
                        </p>
                      </div>
                    )}

                    <div>
                      <svg
                        className="fill-current text-white h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13 1L13.001 4.06201C16.6192 4.51365 19.4869 7.38163 19.9381 11L23 11V13L19.938 13.001C19.4864 16.6189 16.6189 19.4864 13.001 19.938L13 23H11L11 19.9381C7.38163 19.4869 4.51365 16.6192 4.06201 13.001L1 13V11L4.06189 11C4.51312 7.38129 7.38129 4.51312 11 4.06189L11 1H13ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="absolute left-[12px]">
                      <GoSearch size={20} className="text-black " />{" "}
                    </div>

                    <input
                      className={`h-10 w-[600px] lg:w-[470px] md:w-[400px] text-black border border-gray-300 pl-12 bg-white placeholder:text-sm outline-none rounded-full placeholder-gray-400 transition-transform duration-500`}
                      type="text"
                      placeholder={`Search by ${word}`}
                      onChange={(e) => search(e.target.value)}
                    />
                  </div>
                  <button
                    className="absolute top-[4px] right-[5px] bg-gradient-to-r from-lightBlue-400 to-deepBlue-800  py-1 px-4 cursor-pointer z-30 rounded-full"
                    onClick={() => handleSearchClick()}
                  >
                    <span className="font-bold text-white tracking-wide text-sm">
                      Search
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative cursor-pointer hidden md:block">
                <div className="flex space-x-2 ">
                  <div>
                    <MdLocationOn size={30} className="text-black" />{" "}
                  </div>
                  <div>
                    <div
                      className="flex items-center space-x-2 "
                      onClick={handleGetLocation}
                    >
                      {!fullAddress ? (
                        <p className="text-black lg:text-sm ">
                          Select your location
                        </p>
                      ) : (
                        <div className="flex space-x-2 items-center lg:text-sm  text-black">
                          <p>Deliver to:</p>
                          <p>
                            {quarter},{suburb},{city}
                          </p>
                        </div>
                      )}

                      <div>
                        <svg
                          className="fill-current text-black h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13 1L13.001 4.06201C16.6192 4.51365 19.4869 7.38163 19.9381 11L23 11V13L19.938 13.001C19.4864 16.6189 16.6189 19.4864 13.001 19.938L13 23H11L11 19.9381C7.38163 19.4869 4.51365 16.6192 4.06201 13.001L1 13V11L4.06189 11C4.51312 7.38129 7.38129 4.51312 11 4.06189L11 1H13ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 justify-between sm:hidden">
              <Menu as="div" className="ml-5 relative ">
                {({ open }) => (
                  <Fragment>
                    <div className="flex space-x-2 items-center">
                      <Menu.Button>
                        <div className="flex items-center space-x-2 bg-slate-500 px-2 py-2 rounded-md cursor-pointer">
                          <div>
                            <BsPhone size={20} className="text-white" />
                          </div>
                          <div className="text-white ">Download App</div>
                        </div>
                      </Menu.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute z-9999 static right-11 w-40 h-[100px] rounded-md shadow-lg mt-4 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <ul className="text-black">
                          <li className="py-2 px-2 border-b border-gray-300 text-center cursor-pointer hover:bg-deepBlue-800 hover:text-white list-none">
                            <Link
                              href={`https://play.google.com/`}
                              className="flex items-center"
                              target="_blank"
                            >
                              <div>
                                <Image
                                  width={30}
                                  height={30}
                                  alt="google play store"
                                  src="/image/google_play.png"
                                  className="h-[30px] w-[30px] object-cover"
                                />
                              </div>
                              <div className="text-sm">google play store </div>
                            </Link>
                          </li>
                          <li className="py-2 px-2  text-center cursor-pointer hover:bg-deepBlue-800 hover:text-white list-none">
                            <Link
                              href={`https://www.apple.com/store`}
                              className="flex items-center space-x-2"
                              target="_blank"
                            >
                              <div>
                                <Image
                                  width={30}
                                  height={30}
                                  alt="apple store"
                                  src="/image/apple_store.png"
                                  className="h-[30px] w-[30px] object-cover"
                                />
                              </div>
                              <div className="text-sm">apple store </div>
                            </Link>
                          </li>
                        </ul>
                      </Menu.Items>
                    </Transition>
                  </Fragment>
                )}
              </Menu>

              {/* <Menu as="div" className="ml-5 relative ">
                {({ open }) => (
                  <Fragment>
                    <div className="flex space-x-2 items-center">
                      <Menu.Button>
                        <IoMdNotificationsOutline
                          size={30}
                          className="text-white animate-ring"
                        />
                        <div className="bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-[-8px] right-[-6px]">
                          <p className="text-white text-xs">{1}</p>
                        </div>
                      </Menu.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute z-40 static right-0 w-72 h-[150px] rounded-md shadow-lg mt-4 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 py-2 text-white font-semibold tracking-wider text-center rounded-t-md">
                          Notification
                        </div>
                        <ul className="text-black">
                          <li className="py-2 px-2 border-b border-gray-300 text-center list-none">
                            monthly package
                          </li>
                          <li className="py-2 px-2 border-b border-gray-300 text-center list-none">
                            Yearly package
                          </li>
                        </ul>
                      </Menu.Items>
                    </Transition>
                  </Fragment>
                )}
              </Menu> */}

              {!token ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setFeedbackModalOpen(true)}
                >
                  <div className="flex justify-center">
                    <MdOutlineFeedback className=" text-black" size={30} />
                  </div>

                  <p className="text-black text-xs capitalize">
                    customer feedback
                  </p>
                </div>
              ) : null}

              <div
                className=" relative cursor-pointer border-r-2 pr-5 border-black"
                onClick={() => handleCart()}
              >
                <>
                  {cartItems?.length > 0 ? (
                    <>
                      {" "}
                      <BsCart3 color="#000" size={25} />
                      <div className="bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-[-8px] right-[10px]">
                        <p className="text-black text-xs">
                          {cartItems?.length}
                        </p>
                      </div>
                    </>
                  ) : (
                    <CiShoppingCart color="#000" size={30} />
                  )}
                </>
              </div>

              {!token ? (
                <div ref={menuRef}>
                  <Menu as="div" className="ml-5 relative">
                    <div className="flex space-x-2 items-center">
                      <Menu.Button
                        className="max-w-xs bg-white flex items-center border-2 border-black p-1 text-sm rounded-full focus:outline-none"
                        onClick={() => handleLoginModalOpen()}
                      >
                        <svg
                          className="fill-current text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                        </svg>
                      </Menu.Button>
                    </div>

                    <Transition show={open} as={Fragment}>
                      <Menu.Items
                        static // Prevent automatic closing on tab change
                        open={open} // Use custom open state
                        className="origin-top-right absolute z-40 right-0 mt-[10px] w-[400px] rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <div className="bg-white mx-auto rounded-md text-black">
                              {tabIndex === 0 ? (
                                <p className="text-center py-2 text-sm tracking-wide">
                                  Create your{" "}
                                  <span className="text-black font-semibold">
                                    Medigo
                                  </span>{" "}
                                  account
                                </p>
                              ) : (
                                <p className="text-center py-2 text-sm">
                                  <span className="text-gray-400">
                                    Login to
                                  </span>{" "}
                                  <span className="font-bold pl-3 tracking-wider">
                                    Medigo
                                  </span>
                                </p>
                              )}

                              <Tabs
                                selectedIndex={tabIndex}
                                onSelect={(index) => setTabIndex(index)}
                              >
                                <TabList className="py-1 px-10 grid grid-cols-2 w-full">
                                  <Tab selectedClassName="react-tabs__tab--selected">
                                    <span className="flex justify-center tracking-wide text-sm cursor-pointer">
                                      Register
                                    </span>
                                  </Tab>
                                  <Tab selectedClassName="react-tabs__tab--selected">
                                    <span className="flex justify-center tracking-wide text-sm cursor-pointer">
                                      Login
                                    </span>
                                  </Tab>
                                </TabList>
                                <div className="px-4">
                                  <TabPanel>
                                    <Register />
                                  </TabPanel>
                                  <TabPanel>
                                    <Login />
                                  </TabPanel>
                                </div>
                              </Tabs>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div ref={menuRef}>
                  <Menu as="div" className="ml-5 relative ">
                    <Fragment>
                      <div className="flex space-x-2 items-center">
                        <Menu.Button
                          className="max-w-xs bg-white flex items-center  p-1 text-sm rounded-full focus:outline-none"
                          onClick={() => handleLoginModalOpen()}
                        >
                          <span className="sr-only  text-black">
                            Open user menu
                          </span>

                          {token ? (
                            <div className="flex space-x-2 items-center ">
                              {image ? (
                                <Image
                                  height={40}
                                  width={40}
                                  alt="user profile"
                                  src={`${ImageHostName}/${userProfileData?.image_path}${image}`}
                                  className="object-cover h-10 w-10 rounded-full border border-black p-0.5"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    ("/image/placeholder_600x.webp");
                                  }}
                                />
                              ) : (
                                <svg
                                  className="fill-current text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                </svg>
                              )}
                              <p className="cursor-pointer text-black">
                                {(name ?? "").split(" ")[0]}
                              </p>
                            </div>
                          ) : (
                            <div onClick={() => handleSignIn()}>
                              <svg
                                className="fill-current text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                              </svg>
                            </div>
                          )}
                        </Menu.Button>
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-40 static right-0 mt-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className="hover:bg-gradient-to-r hover:from-lightBlue-400 hover:to-deepBlue-800 hover:text-white font-semibold tracking-wider flex space-x-2 px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                onClick={() => handleOrder()}
                              >
                                <div>
                                  <svg
                                    className="fill-current text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                  >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                                  </svg>
                                </div>
                                <p>Profile</p>
                              </div>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => handleLogOut()}
                                className="hover:bg-gradient-to-r hover:from-lightBlue-400 hover:to-deepBlue-800 hover:text-white flex space-x-2 px-4 py-2 font-semibold tracking-wider text-sm text-gray-700 cursor-pointer"
                              >
                                <div>
                                  <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                  >
                                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
                                  </svg>
                                </div>
                                <p>Sign Out</p>
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Fragment>
                  </Menu>
                </div>
              )}
            </div>
          </div>
          <div className="xxl:hidden xl:hidden lg:hidden md:hidden block">
            <div className="flex items-center justify-between px-3 xms:px-2 xs:px-1">
              <Link href={`/`}>
                <div className="flex justify-center lg:w-auto lg:flex-1">
                  <Image
                    width={90}
                    height={10}
                    src="/image/logo.png"
                    className="object-contain h-14 xls:h-12 xms:h-12 xs:h-12 xs:w-12"
                    alt="logo"
                  />
                </div>
              </Link>
              <div className="relative cursor-pointer">
                <div className="flex space-x-2 xs:space-x-1">
                  <div>
                    <MdLocationOn className="h-6 w-6 text-black" />{" "}
                  </div>
                  <div>
                    <div
                      className="flex items-center space-x-2"
                      onClick={handleGetLocation}
                    >
                      {!fullAddress ? (
                        <p className="text-black xms:text-sm xs:text-sm">
                          Select your location
                        </p>
                      ) : (
                        <div className="flex space-x-2 items-center text-black xms:text-sm xs:text-xs">
                          <p>Deliver to:</p>
                          <p>
                            {city}
                          </p>
                        </div>
                      )}

                      <div>
                        <svg
                          className="fill-current text-black h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13 1L13.001 4.06201C16.6192 4.51365 19.4869 7.38163 19.9381 11L23 11V13L19.938 13.001C19.4864 16.6189 16.6189 19.4864 13.001 19.938L13 23H11L11 19.9381C7.38163 19.4869 4.51365 16.6192 4.06201 13.001L1 13V11L4.06189 11C4.51312 7.38129 7.38129 4.51312 11 4.06189L11 1H13ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full px-3 border border-gray-300">
              <div className="flex items-center">
                <div className="absolute left-[18px] ">
                  <GoSearch size={20} className="text-gray-400 " />{" "}
                </div>

                <input
                  className={`h-10 w-full text-black pl-12 bg-white placeholder:text-sm outline-none rounded-full placeholder-gray-400 transition-transform duration-500`}
                  type="text"
                  placeholder={`Search by ${word}`}
                  onChange={(e) => search(e.target.value)}
                />
              </div>
              <div
                className="absolute top-[4px] right-[15px] bg-gradient-to-r from-lightBlue-400 to-deepBlue-800  py-1 px-4 cursor-pointer z-30 rounded-full"
                onClick={() => handleSearchClick()}
              >
                <span className="font-bold text-white tracking-wide text-sm">
                  Search
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;


