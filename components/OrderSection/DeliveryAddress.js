import { useStatus } from '@/context/contextStatus';
import axios from 'axios';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import AddressModal from './AddressModal';
import ShippingAddressModal from './ShippingAddressModal';

const DeliveryAddress = ({
  handleSelectAddress,
  addressValueSelect,
  address,
  addressList,
  setAddress,
  addressflag,
  setAddressFlag,
  setOptionalAddress,
}) => {
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const [shippingAddressModalOpen, setShippingAddressModalOpen] =
    useState(false);

  const {
    fullAddress,
    editableAddress,
    setEditableAddress,
    isAlive,
    setIsAlive,
    setFullAddress,
    setCity,
    setQuarter,
    setSuburb,
    anotherAddress,

    name,
    phone,
    setPhone,
    setName,
    token,
  } = useStatus();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [flag, setFlag] = useState(false);

  const [val, setVal] = useState("");

  useEffect(() => {
    setEditableAddress(fullAddress);
  }, [fullAddress]);

  const handleAddAddress = () => {
    setAddressModalOpen(true);
  };

  const handleCancel = () => {
    setFlag(false);
    setEditableAddress(editableAddress);
  };

  const handleChange = (value) => {
    setVal(value);
  };

  const handleSave = () => {
    if (val == "") {
      setEditableAddress(fullAddress);
    } else {
      setEditableAddress(`${val}`);
    }

    setCookie(null, "editableaddress", `${val}`, {
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    setFlag(false);
  };

  useEffect(() => {
    if (isAlive == true) {
      setFullAddress("");
      setCity("");
      setQuarter("");
      setSuburb("");
    }
  }, [isAlive]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          convertToAddress(latitude, longitude);
          setIsAlive(!isAlive);
        },
        (error) => {
          console.log(error);
          destroyCookie({}, "quarter", {
            path: "/",
          });
          destroyCookie({}, "suburb", {
            path: "/",
          });

          destroyCookie({}, "city", {
            path: "/",
          });
          destroyCookie({}, "fullAddress", {
            path: "/",
          });
          setIsAlive(!isAlive);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const convertToAddress = async (latitude, longitude) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      .then((response) => {
        // console.log("res.....",response);
        setFullAddress(response?.data?.display_name);
        setCookie(null, "fullAddress", response?.data?.display_name, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
        setCity(response?.data?.address?.city);
        setCookie(null, "city", response?.data?.address?.city, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setQuarter(response?.data?.address?.quarter);
        setCookie(null, "quarter", response?.data?.address?.quarter, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        setSuburb(response?.data?.address?.suburb);
        setCookie(null, "suburb", response?.data?.address?.suburb, {
          maxAge: 24 * 60 * 60,
          path: "/",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShippingAddress = () => {
    setShippingAddressModalOpen(!shippingAddressModalOpen);
  };

  return (
    <div className="col-span-7 md:col-span-full sm:col-span-full xls:col-span-full xms:col-span-full xs:col-span-full p-5 xls:p-2 xms:p-2 xs:p-1 border-2 md:mb-4 sm:mb-4 border-gray-100 rounded-md">
      <div className="border-b-2 border-gray-100 pb-7">
        <div className="w-1/2">
          <p className="text-base font-normal  py-2 text-black">
            Name <span style={{ color: "red" }}>*</span>
          </p>
          <input
            className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black"
            placeholder="Enter name..."
            value={name}
            // readOnly={token && name !== '' ? true : false}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-1/2 pb-4">
          <p className="text-base font-normal  py-2 text-black">
            Phone number <span style={{ color: "red" }}>*</span>
          </p>
          <input
            className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black"
            placeholder="Enter phone number..."
            value={phone}
            readOnly={token ? true : false}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {!token || (token && !address?.information) ? (
          <div>
            <div className="flex space-x-4 items-center">
              <p className="font-semibold font-body tracking-wider dark:text-black">
                Your place
              </p>
            </div>

            {fullAddress ? (
              <div className="grid grid-cols-1 mt-3 ml-7">
                <div className="flex space-x-2 mb-2 items-center">
                  <p className="text-black xs:text-sm">
                    You are missing your area ?
                  </p>
                  {flag ? null : (
                    <button
                      className="bg-deepBlue-800 text-white px-2 py-1 rounded-md text-sm"
                      onClick={() => setFlag(true)}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {!flag ? (
                  <>
                    {addressValueSelect == 1 ? (
                      <div className="p-3 lg:p-2 w-[400px] xls:w-[300px] xms:w-[280px] xs:w-[250px] bg-deepBlue-800 rounded-md cursor-pointer group">
                        <p className="text-white text-sm lg:text-xs">
                          <span>{editableAddress}</span>
                        </p>
                      </div>
                    ) : (
                      <div
                        className="p-3 lg:p-2 w-[400px] xls:w-[300px] xms:w-[280px] xs:w-[250px] border-2 border-deepBlue-800 rounded-md cursor-pointer group"
                        onClick={() => handleSelectAddress(1)}
                      >
                        <p className="text-gray-400 text-sm lg:text-xs">
                          <span>{editableAddress}</span>
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <textarea
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-deepBlue-800  dark:bg-white dark:placeholder-gray-400 dark:text-black"
                      onChange={(e) => handleChange(e.target.value)}
                    >
                      {editableAddress}
                    </textarea>
                    <div className="flex space-x-3">
                      <button
                        className="bg-deepBlue-800 px-3 py-1 rounded-md text-white mt-2"
                        onClick={() => handleSave()}
                      >
                        save
                      </button>
                      <button
                        className="bg-red-500 px-3 py-1 rounded-md text-white mt-2"
                        onClick={() => handleCancel()}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2 pl-14">
                <span className="text-black">please select your location </span>
                <span onClick={handleGetLocation} className="cursor-pointer">
                  <svg
                    className="fill-current text-myColor-500 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 1L13.001 4.06201C16.6192 4.51365 19.4869 7.38163 19.9381 11L23 11V13L19.938 13.001C19.4864 16.6189 16.6189 19.4864 13.001 19.938L13 23H11L11 19.9381C7.38163 19.4869 4.51365 16.6192 4.06201 13.001L1 13V11L4.06189 11C4.51312 7.38129 7.38129 4.51312 11 4.06189L11 1H13ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"></path>
                  </svg>
                </span>
              </div>
            )}
            <div className="pt-7">
              <div className="flex space-x-4 items-center">
                <p className="font-semibold font-body tracking-wider dark:text-black">
                  Another place
                </p>
              </div>
              <div className="mt-4 ml-14">
                {anotherAddress ? (
                  <>
                    {addressValueSelect == 2 ? (
                      <div className="p-3 lg:p-2 w-[400px] xls:w-[300px] xms:w-[260px] xs:w-[220px]  bg-deepBlue-800 rounded-md cursor-pointer grid grid-cols-12 group">
                        <p className="text-white text-sm lg:text-xs col-span-11">
                          <span>{anotherAddress}</span>
                        </p>
                        <p className="col-span-1" onClick={handleAddAddress}>
                          <svg
                            className="fill-current text-white h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z"></path>
                          </svg>
                        </p>
                      </div>
                    ) : (
                      <div
                        className="p-3 lg:p-2 w-[400px] xls:w-[300px] xms:w-[260px] xs:w-[220px] border-2 border-deepBlue-800 rounded-md cursor-pointer grid grid-cols-12 group"
                        onClick={() => handleSelectAddress(2)}
                      >
                        <p className="text-gray-400 text-sm lg:text-xs col-span-11">
                          <span>{anotherAddress}</span>
                        </p>
                        <p className="col-span-1" onClick={handleAddAddress}>
                          <svg
                            className="fill-current text-deepBlue-800 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z"></path>
                          </svg>
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="p-3 lg:p-2 w-[300px] border-deepBlue-800 rounded-md cursor-pointer group"
                    onClick={handleAddAddress}
                  >
                    <div className="flex items-center justify-center">
                      <div>
                        <svg
                          className="fill-current text-deepBlue-800 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                        </svg>
                      </div>
                      <p className="text-deepBlue-800">Add address</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white card-shadow flex justify-between text-black py-2 px-2">
            <div className="flex items-center space-x-3">
              <p className="bg-gradient-to-r from-sky-600 to-sky-400 text-white px-1 rounded-md">
                {address?.label}
              </p>

              <p>{address?.information}</p>
            </div>

            <button
              className="text-sky-500 font-semibold tracking-wider uppercase"
              onClick={() => handleShippingAddress()}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="pt-7">
        <div className="flex space-x-4 items-center">
          <p className="font-semibold font-body tracking-wider text-black">
            Delivery Instructions (optional)
          </p>
        </div>
        <div className="mt-4 ml-14">
          <label className="text-gray-700 text-sm">
            Delivery Instructions Note
          </label>

          <textarea
            rows="4"
            onChange={(event) => setOptionalAddress(event.target.value)}
            className="block mt-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-deepBlue-800 outline-none  dark:bg-white  dark:text-black"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>

      <AddressModal
        addressModalOpen={addressModalOpen}
        setAddressModalOpen={setAddressModalOpen}
      />

      <ShippingAddressModal
        shippingAddressModalOpen={shippingAddressModalOpen}
        setShippingAddressModalOpen={setShippingAddressModalOpen}
        addressList={addressList}
        setAddress={setAddress}
        addressflag={addressflag}
        setAddressFlag={setAddressFlag}
      />
    </div>
  );
};

export default DeliveryAddress