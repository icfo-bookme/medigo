import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import OtpInput from "react-otp-input";

const SigninModal = ({ signInModal, setSignInModal }) => {
 
    const [flag,setFlag] = useState(false);

    const [otp, setOtp] = useState("");

    const handleOtp = () =>{
       setFlag(true);
    }

  return (
    <Transition appear show={signInModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black"
        onClose={() => setSignInModal(false)}
      >
        <div className=" min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500 translate-y-96"
            enterFrom="opacity-0 duration-300 scale-95 translate-y-96"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className=" inline-block w-full max-w-[600px] min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gradient-to-r from-lime-600 to-lime-400 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gradient-to-r  flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px]"
                        onClick={() => setSignInModal(false)}
                      >
                        <svg
                          className="fill-current text-white cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="28"
                          height="28"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="my-5 font-body max-w-[26rem] mx-auto">
                    {flag ? (
                      <div>
                        <div className="flex justify-center lg:w-auto lg:flex-1">
                          <Image
                            width={90}
                            height={100}
                            src="/image/logo.png"
                            className="object-contain"
                            alt="logo"
                          />
                        </div>
                        <p className="uppercase py-4 font-bold text-xl text-center text-white">
                          verify otp
                        </p>

                        <div className="flex justify-center">
                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            
                            renderSeparator={<span> - </span>}
                            renderInput={(props) => <input {...props} className="py-2 px-5 rounded-md mr-2 ml-2"/>}
                          />
                        </div>
                        <p className="py-4 px-2 text-sm text-white">
                          By continuing you agree to Terms & Conditions, Privacy
                          Policy & Refund-Return Policy
                        </p>

                        <p className="bg-white py-4 text-center rounded-lg font-semibold text-base tracking-wider text-lime-500">
                          very OTP
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-center lg:w-auto lg:flex-1">
                          <Image
                            width={90}
                            height={100}
                            src="/image/logo.png"
                            className="object-contain"
                            alt="logo"
                          />
                        </div>
                        <p className="uppercase py-4 font-bold text-xl text-center text-white">
                          please log in
                        </p>

                        <div className="flex items-center justify-center">
                          <p className="bg-white rounded-l-lg px-2 py-4 text-lime-500 font-semibold">
                            +88
                          </p>
                          <div>
                            <input
                              type="text"
                              className="rounded-r-lg  w-[350px] px-3 py-4 bg-gray-200 outline-none placeholder:text- placeholder:text-base placeholder:font-semibold placeholder:uppercase"
                              placeholder="Your contact number"
                            />
                          </div>
                        </div>
                        <p className="py-4 px-2 text-sm text-white">
                          By continuing you agree to Terms & Conditions, Privacy
                          Policy & Refund-Return Policy
                        </p>

                        <p
                          className="bg-white py-4 text-center rounded-lg font-semibold text-base tracking-wider text-lime-500 cursor-pointer"
                          onClick={() => handleOtp()}
                        >
                          send OTP
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SigninModal;
