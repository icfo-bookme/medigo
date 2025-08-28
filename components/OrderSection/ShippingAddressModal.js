import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import NewAddressModal from "./NewAddressModal";

const ShippingAddressModal = ({
  shippingAddressModalOpen,
  setShippingAddressModalOpen,
  addressList,
  setAddress,
  addressflag,
  setAddressFlag,
}) => {
  const [newAddressModal, setNewAddressModal] = useState(false);

  const handleNewAddress = () => {
    setNewAddressModal(true);
  };

  const [selectAddress, setSelectAddress] = useState({
    label: "",
    information: "",
  });

  const handleClose = () => {
    setShippingAddressModalOpen(false);

    setNewAddressModal(false);
  };

  const handleSave = () => {
    setAddress({
      label: selectAddress.label,
      information: selectAddress.information,
    });
    handleClose();
  };

  useEffect(() => {
    if (addressList) {
      setSelectAddress({
        label: addressList[0]?.label,
        information: addressList[0]?.information,
      });
    }
  }, [addressList]);

  return (
    <div>
      <Transition appear show={shippingAddressModalOpen} as={Fragment}>
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
                      {!newAddressModal ? (
                        <div>
                          <div className="flex justify-between">
                            <p className="capitalize text-black">
                              Shipping Address
                            </p>

                            <p
                              className="capitalize text-sky-500 text-sm font-semibold tracking-wider cursor-pointer"
                              onClick={() => handleNewAddress()}
                            >
                              Add new address
                            </p>
                          </div>

                          <div className="w-full mx-auto pt-3">
                            {addressList?.map((item, index) => (
                              <div
                                className="p-3 border border-gray-300 mb-3"
                                key={index}
                              >
                                <label
                                  htmlFor={item?.label}
                                  className="cursor-pointer  w-full  rounded-md"
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                                      <input
                                        checked={
                                          selectAddress?.label == item?.label
                                        }
                                        type="radio"
                                        id={item?.label}
                                        name={item?.label}
                                        value={item?.label}
                                        className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                                        onChange={() =>
                                          setSelectAddress({
                                            label: item?.label,

                                            information: item?.information,
                                          })
                                        }
                                      />
                                      <div
                                        className={`check-icon ${
                                          selectAddress?.label === item?.label
                                            ? "block"
                                            : "hidden"
                                        } border-4 border-sky-600 rounded-full w-full h-full z-1`}
                                      ></div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <p className="bg-gradient-to-r from-sky-600 to-sky-400 text-white px-1 text-sm rounded-md">
                                        {item?.label}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-black pl-5">
                                    {item?.information}
                                  </p>
                                </label>
                              </div>
                            ))}
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
                              onClick={() => handleSave()}
                            >
                              save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <NewAddressModal
                          handleClose={handleClose}
                          addressflag={addressflag}
                          setAddressFlag={setAddressFlag}
                          setNewAddressModal={setNewAddressModal}
                        />
                      )}
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

export default ShippingAddressModal