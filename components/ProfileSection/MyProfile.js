import { useStatus } from '@/context/contextStatus';
import { ImageHostName } from '@/lib/config';
import postRequest from '@/lib/postRequest';
import dayjs from 'dayjs';
import Image from 'next/image';
import { setCookie } from 'nookies';
import { useEffect } from 'react';
import { ThreeDots } from "react-loader-spinner";
import { toast } from 'react-toastify';

const MyProfile = ({
  address,
  imageUrl,
  isAlive,
  setIsAlive,
  userProfileData,
  gender,
  avatarName,
  loading,
  setAvatarName,
  setimageUrl,
  setAddress,
  date,
}) => {
  const { setImage, name, setName, email, setEmail } = useStatus();

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePicChange = async (data) => {
    let file = data[0];
    const base64 = await convertBase64(file);
    setimageUrl(base64);
  };

  useEffect(() => {
    if (Object.keys(userProfileData?.length > 0)) {
      setImage(userProfileData?.image);

      setCookie(null, "avatar", userProfileData?.image, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
      setName(userProfileData?.name);
    }
  }, [userProfileData]);

  const handleSubmit = async () => {
    let res = await postRequest(`update-profile`, {
      name: avatarName ? avatarName : "",

      information: address,

      email: email,

      avatar: imageUrl ? imageUrl : "",
      gender: gender,
    });
    if (res?.success) {
      toast.success(`${res?.message}`);
      setIsAlive(!isAlive);
    } else {
      toast.error(`${res?.message}`);
    }
  };


  

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex space-x-2 items-center">
        <svg
          className="fill-current text-myColor-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        </svg>
        <h1 className="font-semibold text-2xl">
          <span className="text-myColor-500">Profile</span>{" "}
        </h1>
      </div>
      <div className="p-3 rounded-md">
        <div>
          <div>
            <div className="py-4 w-full">
              <label className="text-black">Your Profile Image</label>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => handlePicChange(e.target.files)}
              />
              {imageUrl ? (
                <div className="py-2">
                  <Image alt="image" width={100} height={100} src={imageUrl} />
                </div>
              ) : loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "170px",
                  }}
                >
                  {" "}
                  <ThreeDots
                    height="30"
                    width="80"
                    radius="9"
                    color="#1F2937"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                </div>
              ) : userProfileData == undefined ? null : (
                <div className="mt-2">
                  <Image
                   alt="image"
                    width={150}
                    height={150}
                    src={`${ImageHostName}/${userProfileData?.image_path}${userProfileData?.image}`}
                    className="h-[150px] w-[150px]"
                    onError={(e) => {
                      e.target.src = "/image/placeholder_600x.webp";
                    }}
                  />
                </div>
              )}
            </div>

            <button className="text-white text-sm py-1 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 rounded-full px-2 ">
              You signed up with Medigo on{" "}
              <span className="font-semibold">
                {dayjs(date).format("YYYY-MM-DD")}
              </span>
            </button>

            <div className="w-full">
              <p className="text-lg font-normal  py-2 text-black">
                Name <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black"
                placeholder="Enter name..."
                value={avatarName}
                onChange={(event) => setAvatarName(event.target.value)}
              />
            </div>

            <div className="w-full">
              <p className="text-lg font-normal  py-2 text-black">Email</p>
              <input
                className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black"
                placeholder="Enter email..."
                value={email ? email : ""}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="w-full">
              <p className="text-lg font-normal  py-2 text-black">
                Address <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black"
                placeholder="Enter address..."
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          </div>
          <div className="mt-2 flex justify-end" onClick={() => handleSubmit()}>
            <button className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800  text-white   px-8 py-1 rounded-md cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile