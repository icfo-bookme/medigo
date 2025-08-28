import MyOrder from '@/components/OrderSection/MyOrder';
import AddressBook from '@/components/ProfileSection/AddressBook';
import CreatePackage from '@/components/ProfileSection/CreatePackage';
import MyPrescriptionOrder from '@/components/ProfileSection/MyPrescriptionOrder';
import MyProfile from '@/components/ProfileSection/MyProfile';
import PackageList from '@/components/ProfileSection/PackageList';
import { useStatus } from '@/context/contextStatus';
import request from '@/lib/request';

import { setCookie } from 'nookies';
import { useEffect, useState } from 'react';



const Orders = () => {
 
    const { step, setStep, token,  setPhone,setEmail } = useStatus();

      const [address, setAddress] = useState("");

       const [imageUrl, setimageUrl] = useState("");

         const [isAlive, setIsAlive] = useState(false);

           const [userProfileData, setUserProfileData] = useState({});

            const [gender, setGender] = useState(null);

              const [avatarName, setAvatarName] = useState("");

                const [loading, setLoading] = useState(true);

                const [availablePoint,setAVailablePoint] = useState("");

                const [date,setDate] = useState('');

    const handleClick = (value) => {
      setStep(value);
    };

    useEffect(() => {
      if (token) {
        const profileData = async () => {
          let res = await request(`my-profile`);

       
          

         setDate(res?.data?.created_at);
          
          setAVailablePoint(res?.data?.customer_point?.available_point ?? 0)
          

          setAddress(res?.data?.information);
          setAvatarName(res?.data?.name);
          setGender(res?.data?.gender);
          setPhone(res?.data?.phone);
          setEmail(res?.data?.email);

          setUserProfileData(res?.data);

          setCookie(null, "email", userProfileData?.email, {
            maxAge: 24 * 60 * 60,
            path: "/",
          });
          setLoading(false);
        };
        profileData();
      }
    }, [token, isAlive]);


    


  return (
    <>
    
      <div className="bg-gray-100 min-h-[700px]">
        <div className="max-w-[85rem] lg:max-w-[64rem] md:max-w-[44rem] sm:max-w-[46rem] xls:max-w-[24rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto  pt-5">
          <div className="grid grid-cols-12 xs:block gap-8 md:gap-3 sm:gap-3  pb-5">
            <div className="col-span-3 lg:col-span-3 md:col-span-full sm:col-span-full xls:col-span-full xms:col-span-full xs:mb-4">
              <div className="bg-white rounded-md shadow-md">
                <div className="px-3 md:px-2 sm:px-2 sm:py-2 md:py-1 py-4 space-y-5">
                  <div
                    onClick={() => handleClick("profile")}
                    className={`${
                      step == "profile" ? "bg-deepBlue-800 text-white" : null
                    } group flex space-x-4  items-center  py-2 px-2 rounded-md  hover:bg-deepBlue-800 cursor-pointer hover:duration-500`}
                  >
                    <div>
                      <svg
                        className={`fill-current ${
                          step == "profile" ? "text-white" : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      </svg>
                    </div>
                    <p
                      className={`${
                        step == "profile"
                          ? "text-white md:text-sm font-semibold"
                          : "text-black md:text-sm"
                      }  group-hover:text-white`}
                    >
                      My profile
                    </p>
                  </div>

                  <div
                    onClick={() => handleClick("address")}
                    className={`${
                      step == "address" ? "bg-deepBlue-800 text-white" : null
                    } group flex space-x-4  items-center  py-2 px-2 rounded-md  hover:bg-deepBlue-800 cursor-pointer hover:duration-500`}
                  >
                    <div>
                      {/* <FaAddressBook
                        size={22}
                        className={`fill-current ${
                          step == "address" ? "text-white" : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                      /> */}

                      <svg
                        className={`fill-current ${
                          step == "address" ? "text-white" : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z"></path>
                      </svg>
                    </div>
                    <p
                      className={`${
                        step == "address"
                          ? "text-white md:text-sm font-semibold"
                          : "text-black md:text-sm"
                      }  group-hover:text-white`}
                    >
                      Address book
                    </p>
                  </div>

                  <div
                    className={`${
                      step == "order" ? "bg-deepBlue-800  text-white" : null
                    } group flex space-x-4  items-center rounded-md  py-2 px-2 hover:bg-deepBlue-800 cursor-pointer hover:duration-500`}
                    onClick={() => handleClick("order")}
                  >
                    <div>
                      <svg
                        className={`fill-current ${
                          step == "order" ? "text-white" : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M7.83 20A3.001 3.001 0 1 1 4 16.17V7.83A3.001 3.001 0 1 1 7.83 4h8.34A3.001 3.001 0 1 1 20 7.83v8.34A3.001 3.001 0 1 1 16.17 20H7.83zm0-2h8.34A3.008 3.008 0 0 1 18 16.17V7.83A3.008 3.008 0 0 1 16.17 6H7.83A3.008 3.008 0 0 1 6 7.83v8.34A3.008 3.008 0 0 1 7.83 18zM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm14 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </div>
                    <p
                      className={`${
                        step == "order"
                          ? "text-white md:text-sm font-semibold"
                          : "text-black md:text-sm"
                      } group-hover:text-white`}
                    >
                      My order
                    </p>
                  </div>
                  <div
                    className={`${
                      step == "prescription_order"
                        ? "bg-deepBlue-800  text-white"
                        : null
                    } group flex space-x-4  items-center rounded-md  py-2 px-2 hover:bg-deepBlue-800 cursor-pointer hover:duration-500`}
                    onClick={() => handleClick("prescription_order")}
                  >
                    <div>
                      <svg
                        className={`fill-current ${
                          step == "prescription_order"
                            ? "text-white"
                            : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H16V15H8Z"></path>
                      </svg>
                    </div>
                    <p
                      className={`${
                        step == "prescription_order"
                          ? "text-white md:text-sm font-semibold"
                          : "text-black md:text-sm"
                      } group-hover:text-white`}
                    >
                      My prescription order
                    </p>
                  </div>
                  <div
                    className={`${
                      step == "package" ? "bg-deepBlue-800  text-white" : null
                    } group flex space-x-4  items-center rounded-md  py-2 px-2 hover:bg-deepBlue-800 cursor-pointer hover:duration-500`}
                    onClick={() => handleClick("package")}
                  >
                    <div>
                      <svg
                        className={`fill-current ${
                          step == "package" ? "text-white" : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                      </svg>
                    </div>
                    <p
                      className={`${
                        step == "package"
                          ? "text-white md:text-sm font-semibold"
                          : "text-black md:text-sm"
                      } group-hover:text-white`}
                    >
                      Create package
                    </p>
                  </div>
                  <div
                    className={`${
                      step == "packageList"
                        ? "bg-deepBlue-800  text-white"
                        : null
                    } group flex space-x-4  items-center rounded-md  py-2 px-2 hover:bg-deepBlue-800 cursor-pointer hover:duration-500`}
                    onClick={() => handleClick("packageList")}
                  >
                    <div>
                      <svg
                        className={`fill-current ${
                          step == "packageList" ? "text-white" : "text-black"
                        } h-6 w-6  group-hover:text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 2.9918C3 2.44405 3.44495 2 3.9934 2H20.0066C20.5552 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM19 11V4H5V11H19ZM19 13H5V20H19V13ZM9 6H15V8H9V6ZM9 15H15V17H9V15Z"></path>
                      </svg>
                    </div>
                    <p
                      className={`${
                        step == "packageList"
                          ? "text-white md:text-sm font-semibold"
                          : "text-black md:text-sm"
                      } group-hover:text-white`}
                    >
                      Package list
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-9 lg:col-span-9 md:col-span-full sm:col-span-full xls:col-span-full xms:col-span-full ">
              {step == "profile" ? (
                <MyProfile
                  address={address}
                  setAddress={setAddress}
                  imageUrl={imageUrl}
                  setimageUrl={setimageUrl}
                  isAlive={isAlive}
                  setIsAlive={setIsAlive}
                  userProfileData={userProfileData}
                  gender={gender}
                  avatarName={avatarName}
                  setAvatarName={setAvatarName}
                  loading={loading}
                  date={date}
                />
              ) : step == "address" ? (
                <AddressBook
                  userProfileData={userProfileData}
                  loading={loading}
                  isAlive={isAlive}
                  setIsAlive={setIsAlive}
                />
              ) : step == "order" ? (
                <MyOrder availablePoint={availablePoint} />
              ) : step == "prescription_order" ? (
                <MyPrescriptionOrder />
              ) : step == "package" ? (
                <CreatePackage />
              ) : step == "packageList" ? (
                <PackageList />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders


export async function getServerSideProps(context) {
  // console.log(context.params.id);

  if (!context.req.cookies.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
 

   return {
     props: {}
   };

 
}

