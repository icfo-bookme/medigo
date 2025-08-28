import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import postRequest from "@/lib/postRequest";
import { useStatus } from "@/context/contextStatus";

const EditAddressModal = ({
  editAddressModal,
  setEditAddressModal,
  addressData,
  isAlive,
  setIsAlive,
}) => {
  const { userId } = useStatus();

  const handleClose = () => {
    setEditAddressModal(false);
  };

  const [label, setLabel] = useState("");

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (addressData) {
      setLabel(addressData?.label);

      setAddress(addressData?.information);
    }
  }, [addressData]);

  //  console.log("addressData", addressData);

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
      update_id: addressData?.id,
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
    <div>
      <Transition appear show={editAddressModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black"
          onClose={() => handleClose()}
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
              <div className=" inline-block w-full max-w-[600px] min-h-[300px] p-4  overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
                <div className="mt-2">
                  <div className="py-4 bg-gray-100 flex flex-col justify-center">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                        <div
                          className="absolute top-[-30px] right-[-5px]"
                          onClick={() => handleClose()}
                        >
                          <svg
                            className="fill-current text-secondaryColor-500 h-7 w-7 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 my-5">
                      <div>
                        <p className="capitalize text-black  text-lg font-semibold tracking-wider cursor-pointer">
                          Edit shipping address
                        </p>

                        <div className="w-full">
                          <p className="text-lg font-normal  py-2 text-black">
                            Label <span style={{ color: "red" }}>*</span>
                          </p>
                          <input
                            className="border-[1px] h-[40px] w-full pl-2 rounded-md text-sm outline-none bg-white text-black placeholder:text-sm"
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
    </div>
  );
};

export default EditAddressModal