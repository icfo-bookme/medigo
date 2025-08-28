import { useRouter } from "next/router";
import { useState } from "react";

const ForgotPassword = () => {
  const router = useRouter();

  const [num, setNum] = useState("");

  const handleChange = (value) => {
    setNum(value);
  };


  return (
    <div className="bg-gray-100 ">
      <div className="max-w-[50rem] md:max-w-[62rem] sm:max-w-[47rem] xxl:max-w-[110rem]  mx-auto min-h-[722px] pt-5">
        <div className="mt-4 min-h-[500px] bg-gray-100 pb-16">
          <p className="text-center text-xl font-semibold tracking-wider mb-4 dark:text-black">
            Forgot password
          </p>
          <div className=" bg-gray-200 w-[350px] xs:w-[290px] h-[150px] mx-auto rounded-md pl-3 pt-3">
            <label className="font-semibold dark:text-black">
              Phone number
            </label>
            <div className="flex justify-center items-center my-3">
              <input
                type="text"
                className="w-full mr-4 py-2 px-4 rounded-md dark:bg-white"
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="px-3 py-1 bg-primary text-white rounded-md"
                // onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
