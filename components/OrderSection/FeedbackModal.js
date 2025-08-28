
import { useStatus } from "@/context/contextStatus";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import { Fragment, useState } from "react";
import LoadingSubmit from "../common/LoadingSubmit";
import { toast } from "react-toastify";
import postRequest from "@/lib/postRequest";


const FeedbackModal = ({
  feedbackModalOpen,
  setFeedbackModalOpen,
  orderId,
}) => {
  const router = useRouter();

  const { name, token, phone, setName, setPhone, userId ,email,setEmail} = useStatus();

  const [loading, setLoading] = useState(false);

  const [invoice, setInvoice] = useState("");

  const [type, setType] = useState("");

  const [comments, setComments] = useState("");


  

  const handleSubmit = async () => {
    if (!token && invoice == "") {
      toast.error(" Invoice no. is required");
      return;
    }

    if (name == "") {
      toast.error(" Name is required");
      return;
    }

    if (phone == "") {
      toast.error(" Phone is required");
      return;
    }

    if (phone) {
      var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
      if (bdMobilePattern.test(phone)) {
      } else {
        toast.error("Not a valid phone number");

        return;
      }
    }

    if (type == "") {
      toast.error("Type is required");
      return;
    }

    if (comments == "") {
      toast.error("Feedback is required");
      return;
    }

    setLoading(true);

    const res = await postRequest(`order-feedback`, {
      customer_id: userId,
      invoice_no: !token ? invoice : orderId,
      email: email,
      name: name,
      phone: phone,
      type: type,
      feedback: comments,
    });

    if(res?.success){
        setLoading(false);
        toast.success(`${res?.message}`);
        setType("");
        setComments("");
    } else {
        toast.error(`${res?.message}`);
        setLoading(false);
    }
  };

  return (
    <Transition appear show={feedbackModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-9999 overflow-y-auto bg-opacity-60 bg-black dark:text-black"
        onClose={() => setFeedbackModalOpen(false)}
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
            <div className="inline-block w-full max-w-[600px] min-h-[300px] p-4 xls:p-2 xms:p-2 xs:p-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gray-100 flex flex-col justify-center max-w-[45rem] mx-auto">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px]"
                        onClick={() => setFeedbackModalOpen(false)}
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

                    <div className="mt-4 text-black space-y-3">
                      {!token ? (
                        <div>
                          <label className="text-sm">Invoice No</label>
                          <input
                            type="text"
                            className=" w-full border border-gray-300 pl-2 py-2 rounded-md dark:bg-white text-black text-sm  focus:outline-none"
                            placeholder="Enter invoice no"
                            value={invoice}
                            onChange={(e) => setInvoice(e.target.value)}
                          />
                        </div>
                      ) : null}

                      <div>
                        <label className="text-sm">Name</label>
                        <input
                          type="text"
                          value={name}
                          readOnly={token ? true : false}
                          className=" w-full border border-gray-300 pl-2 py-2 rounded-md dark:bg-white text-black text-sm  focus:outline-none"
                          placeholder="Enter name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm">Phone number</label>
                        <input
                          type="text"
                          className=" w-full border border-gray-300 pl-2 py-2 rounded-md dark:bg-white text-black text-sm  focus:outline-none"
                          placeholder="Enter phone"
                          value={phone}
                          readOnly={token ? true : false}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="w-full">
                        <p className="text-lg font-normal  py-2 text-black">
                          Email
                        </p>
                        <input
                          className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black"
                          placeholder="Enter name..."
                          defaultValue={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm">Type</label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg block w-full xls:w-full xms:w-full xs:w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option disabled>Select type</option>
                          <option value="1">Delivery</option>

                          <option value="2">Communication</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm">Comments</label>
                        <textarea
                          rows="4"
                          className="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-deepBlue-800 outline-none  dark:bg-white  dark:text-black"
                          placeholder="Write your thoughts here..."
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                      </div>

                      {loading ? (
                        <div className="flex justify-start mt-4">
                          <LoadingSubmit />
                        </div>
                      ) : (
                        <div className="mt-4 flex justify-start">
                          <button
                            className="px-4 py-1  rounded-md text-white bg-deepBlue-800 "
                            onClick={() => handleSubmit()}
                          >
                            Submit
                          </button>
                        </div>
                      )}
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

export default FeedbackModal;
