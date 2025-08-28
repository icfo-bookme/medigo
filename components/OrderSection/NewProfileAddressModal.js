import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useStatus } from "@/context/contextStatus";
import { toast } from "react-toastify";
import postRequest from "@/lib/postRequest";

const NewProfileAddressModal = ({
  newAddressModal,

  handleClose,
  isAlive,
  setIsAlive,
}) => {
  const { userId } = useStatus();

  const [address, setAddress] = useState("");

  const [label, setLabel] = useState("");

  const postAddress = async () => {
    if (label == "") {
      toast.error("label is required");
      return;
    }

    if (address == "") {
      toast.error("address is required");
      return;
    }

    const res = await postRequest(`store-address`, {
      customer_id: userId,
      label: label,
      information: address,
    });

    if (res?.success) {
      toast.success(`${res?.message}`);
      handleClose();
       setIsAlive(!isAlive);
    } else {
      toast.error(`${res?.message}`);
    }
  };

  return (
    <Transition appear show={newAddressModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-70 bg-black"
        onClose={() => handleClose()}
      >
        <div className=" min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in "
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
            enter="ease-out translate-y-0"
            enterFrom="opacity-0  scale-95 translate-y-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in "
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-[500px] min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="font-body">
                <div className="py-4 bg-white flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px] sm:right-[-125px]"
                        onClick={() => handleClose()}
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
                  <div className="bg-white my-5">
                    <div>
                      <p className="capitalize text-black  text-lg font-semibold tracking-wider cursor-pointer">
                        Add new shipping address
                      </p>

                      <div className="w-full">
                        <p className="text-lg font-normal  py-2 text-black">
                          Label <span style={{ color: "red" }}>*</span>
                        </p>
                        <input
                          className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black placeholder:text-sm"
                          placeholder="Enter label..."
                          defaultValue={label}
                          onChange={(event) => setLabel(event.target.value)}
                        />
                      </div>

                      <div className="pt-3">
                        <p className="text-lg font-normal  py-2 text-black">
                          Address <span style={{ color: "red" }}>*</span>
                        </p>
                        <textarea
                          type="text"
                          defaultValue={address}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black"
                          placeholder="Enter address"
                          onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="flex justify-end items-center space-x-3 mt-3">
                        <button
                          className="bg-gray-300 px-4 py-2 rounded-md text-sm text-black"
                          onClick={() => handleClose()}
                        >
                          cancel
                        </button>

                        <button
                          className="bg-indigo-700 px-4 py-2 rounded-md text-sm text-white"
                          onClick={() => postAddress()}
                        >
                          save
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

export default NewProfileAddressModal;
