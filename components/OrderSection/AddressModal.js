import { useStatus } from "@/context/contextStatus";
import { Dialog, Transition } from "@headlessui/react";
import { setCookie } from "nookies";
import { Fragment, useEffect, useState } from "react";

const AddressModal = ({ addressModalOpen, setAddressModalOpen }) => {

   
  const {anotherAddress,setAnotherAddress} = useStatus();

  const [val,setVal] = useState('');


  useEffect(()=>{
    setVal(anotherAddress);
  },[])


  const handleChange = (value) =>{

    setVal(value);

  }

  const handleSave = () =>{
    setAnotherAddress(val);

    setCookie(null, "anotherAddress", val, {
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    setAddressModalOpen(false);

  }

  // console.log("anotherAddress..", anotherAddress);


  return (
    <Transition appear show={addressModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-70 bg-black"
        onClose={() => setAddressModalOpen(false)}
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
            enter="ease-out duration-500 translate-y-0"
            enterFrom="opacity-0 duration-300 scale-95 translate-y-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[800px] min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gray-100 flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px] sm:right-[-125px]"
                        onClick={() => setAddressModalOpen(false)}
                      >
                        <svg
                          className="fill-current text-red-500 cursor-pointer"
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
                  <div className="bg-gray-100 my-5">
                    <div>
                      <p className="text-center font-semibold tracking-wider font-body text-lg dark:text-black">
                        Add address
                      </p>
                    </div>

                    <div className="w-full mx-auto pt-10">
                      <div className="grid gap-6 mb-6">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 font-body dark:text-black">
                            Detail Address
                          </label>
                          <textarea
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black"
                            placeholder="Enter address"
                            defaultValue={val}
                            onChange={(e) => handleChange(e.target.value)}
                          ></textarea>
                        </div>

                        <button
                          onClick={() => handleSave()}
                          className="text-white font-body bg-secondaryColor-500 focus:ring-4 focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center tracking-wider font-semibold"
                        >
                          Save address
                        </button>
                      </div>
                    </div>
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

export default AddressModal;
