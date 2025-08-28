import { useStatus } from '@/context/contextStatus';
import postRequest from '@/lib/postRequest';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewAddressModal = ({
  handleClose,
  addressflag,
  setAddressFlag,
  setNewAddressModal,
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
      setNewAddressModal(false);
      setAddressFlag(!addressflag);
    } else {
      toast.error(`${res?.message}`);
    }
  };

  return (
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
  );
};

export default NewAddressModal