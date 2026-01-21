
import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";

const Otp = () => {
  const router = useRouter();

  const { setToken, setName, setPhone, setUserId, setImage } = useStatus();

  const [otp, setOTP] = useState("");

  const handleOTPChange = (otp) => {
    setOTP(otp);
  };

  const handleSubmit = async () => {



    

    let res = await postRequest(`otp/verify`, {
      otp: otp
    })

    

    if(res?.success){
        setToken(res?.token);
        setCookie(null, "token", res?.token, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setName(res?.user?.name);
        setCookie(null, "name", res?.user?.name, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setPhone(res?.user?.phone);
        setCookie(null, "phone", res?.user?.phone, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setUserId(res?.user?.id);
        setCookie(null, "userId", res?.user?.id, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setImage(res?.user?.image);
        setCookie(null, "avatar", res?.user?.image, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

       toast.success(`${res?.message}`);
        router.push(`/`);
     
      
    } else {
         toast.error(`${res?.message}`);
    }
      
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl md:max-w-[62rem] sm:max-w-[47rem] xxl:max-w-[110rem]  mx-auto min-h-[722px] xms:min-h-[500px] xs:min-h-[500px] xs pt-5">
        <div className="mt-4 min-h-[550px] bg-gray-100 pt-14">
          <div className="flex justify-center">
            <Image width={100} height={100} src={`/image/password.png`} alt="passwordImage" />
          </div>
          <p className="text-center text-xl font-semibold tracking-wider mb-4 pt-3 text-black">
            Please enter your OTP
          </p>
          <div
            className="space-y-6 bg-gray-200 w-[450px] xls:w-[400px] xms:w-[350px] xs:w-[290px] h-[150px] mx-auto rounded-md"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(); // Call the function when Enter is pressed
              }
            }}
          >
            <div className="flex justify-center items-center h-full">
              <OTPInput
                value={otp}
                onChange={handleOTPChange}
                numInputs={4}
                separator={<span>-</span>}
                inputStyle="my-otp-input"
                renderInput={(props) => <input type="text" {...props} />}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white rounded-md text-sm font-semibold"
                onClick={() => handleSubmit()}
              >
                Submit OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
