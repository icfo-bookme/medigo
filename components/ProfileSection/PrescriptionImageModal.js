import { useStatus } from "@/context/contextStatus";
import hostname, { ImageHostName } from "@/lib/config";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { destroyCookie } from "nookies";
import { Fragment } from "react";
import { toast } from "react-toastify";

const PrescriptionImageModal = ({
  id,
  setId,
  prescriptionImageModalOpen,
  setPrescriptionImageModalOpen,
  image,
  setImage,
}) => {
  const handleClose = () => {
    setId(null);
    setPrescriptionImageModalOpen(false);
    setImage(null);
  };

  return (
    <Transition appear show={prescriptionImageModalOpen} as={Fragment}>
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
            enter="ease-out duration-500 translate-y-96"
            enterFrom="opacity-0 duration-300 scale-95 translate-y-96"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className=" inline-block w-full max-w-[600px] min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div className="mt-14">
                <div className="py-4 bg-gray-100 flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-80px] right-[-5px]"
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
                    <Image
                      height={500}
                      width={500}
                      src={`${ImageHostName}/storage/prescription/${image}`}
                      className="h-auto object-cover"
                      onClick={() => handleImage(item?.id, index)}
                      alt="Prescription Image"
                    />
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

export default PrescriptionImageModal;
