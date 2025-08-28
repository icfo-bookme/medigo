


import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";

import * as yup from "yup";

import Link from "next/link";
import { useForm } from "react-hook-form";
import postRequest from "@/lib/postRequest";
import { toast } from "react-toastify";
import { useStatus } from "@/context/contextStatus";
import { setCookie } from "nookies";

const Login = () => {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  
  const {setToken,setName,setPhone, setImage,setUserId} = useStatus();


  const toggleBtn = () => {
    setVisible(!visible);
  };

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required("The field is required")
      .min(11, "Phone number should be  11 characters")
      .max(11, "Phone number should be  11 characters"),

    password: yup
      .string()
      .min(6, "Password should be at least 6 characters")
      .required("This field is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



  const handleLogin = async (data) => {
      
    let res = await postRequest(`login`,data);


    
   

    if(res?.success){
        
        toast.success(`${res?.message}`)
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
       
          router.push(`/${router?.pathname}`);

          //  router.back();
       
    } else  {
        toast.error(`${res?.message}`);
    }
  };

  
  return (
    <div className="mt-4 pb-2">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="relative pb-6">
          <div>
            <input
              type="text"
              className="bg-white border-2 border-deepBlue-800 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none dark:bg-white focus:border-deepBlue-800"
              placeholder="Phone number"
              {...register("phone")}
            />
          </div>
          <p className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.phone?.message}
          </p>
        </div>

        <div className="relative pb-2">
          <div>
            <input
              type={visible ? "text" : "password"}
              className="bg-white border-2 border-deepBlue-800  text-sm rounded-lg  block w-full p-2.5 text-black outline-none"
              placeholder="Enter password"
              {...register("password")}
            />
            <div onClick={toggleBtn}>
              {visible ? (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
              ) : (
                <svg
                  className="absolute top-2 right-2 text-gray-400 fill-current h-5 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" />
                </svg>
              )}
            </div>
          </div>

          <p className="absolute top-11 md:left-0 left-0 text-red-600 text-sm">
            {errors.password?.message}
          </p>
        </div>

        {/* <Link href="/forgot-password">
          <p className="font-semibold text-blue-500 pt-3">Forgot password?</p>
        </Link> */}

        <button className="flex justify-center bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 py-3 rounded-full w-full text-white font-semibold tracking-wide mt-3">
          Sign in
        </button>

        
      </form>
    </div>
  );
};

export default Login;
