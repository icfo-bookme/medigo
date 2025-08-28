import { useState } from 'react';

import { ThreeDots } from "react-loader-spinner";
import NewProfileAddressModal from '../OrderSection/NewProfileAddressModal';
import EditAddressModal from './EditAddressModal';


const AddressBook = ({ loading, userProfileData, isAlive, setIsAlive }) => {
  const [editAddressModal, setEditAddressModal] = useState(false);

  const [addressData, setAddressData] = useState({});

  const [newAddressModal, setNewAddressModal] = useState(false);


  const handleNewAddress = ()=>{
     setNewAddressModal(true);
  }

  const handleClose = ()=>{
     setNewAddressModal(false);
  }


  const handleEditAddress = (index) => {
    setEditAddressModal(!editAddressModal);

    setAddressData(userProfileData?.addresses[index]);
  };

  return (
    <div className="bg-white p-3 rounded-md min-h-[700px]">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <svg
            className="fill-current  text-myColor-500 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z"></path>
          </svg>
          <h1 className="font-semibold text-2xl">
            <span className="text-myColor-500">Address Book</span>{" "}
          </h1>
        </div>
        <div>
          <button
            className="uppercase bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-sm px-3 py-2 rounded-md font-semibold"
            onClick={() => handleNewAddress()}
          >
            + add new address
          </button>
        </div>
      </div>

      <div className="p-3 rounded-md">
        <div className="min-h-[300px] overflow-y-auto">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "100px",
              }}
            >
              {" "}
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#1F2937"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          ) : (
            <>
              {userProfileData?.addresses?.length > 0 ? (
                <>
                  <div className="flex flex-col border-2 border-gray-400 rounded-lg mt-4 overflow-hidden overflow-x-auto">
                    <div className=" sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div>
                          <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 dark:text-black">
                              <tr>
                                <th scope="col" className="px-6 py-4">
                                  Label
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  Address
                                </th>
                                <th scope="col" className="px-6 py-4">
                                  OPERATIONS
                                </th>
                              </tr>
                            </thead>
                            <tbody className="dark:text-black">
                              {userProfileData?.addresses?.map(
                                (item, index) => (
                                  <tr
                                    className="border-b dark:border-neutral-500"
                                    key={index}
                                  >
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                      {item?.label}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      {item?.information}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      <button
                                        className=" text-myColor-500 text-base"
                                        onClick={() => handleEditAddress(index)}
                                      >
                                        Edit
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-4">
                  <p className="text-center text-black text-3xl tracking-wider">
                    No data found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <EditAddressModal
        editAddressModal={editAddressModal}
        setEditAddressModal={setEditAddressModal}
        addressData={addressData}
        isAlive={isAlive}
        setIsAlive={setIsAlive}
      />

      <NewProfileAddressModal
        newAddressModal={newAddressModal}
       
        handleClose={handleClose}
        isAlive={isAlive}
        setIsAlive={setIsAlive}
      />
    </div>
  );
};

export default AddressBook