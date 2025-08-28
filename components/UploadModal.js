import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import LoadingSubmit from "./common/LoadingSubmit";

const UploadModal = ({uploadModalOpen,setUploadModalOpen }) => {
  
    const {
      token,
      fullAddress,
      setFullAddress,
      isAlive,
      setIsAlive,
    } = useStatus();

    const [phoneNo,setPhoneNo] = useState('');

    const [selectflag,setSelectFlag] = useState(false);

    const [flag,setFlag] = useState(false);

    const [otp, setOTP] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
     const [base64Image, setBase64Image] = useState("");
     const [loading,setLoading] = useState(false);

     const [name,setName] = useState('');
     
        const [latitude, setLatitude] = useState("");
        const [longitude, setLongitude] = useState("");

        const [address,setAddress] = useState("");
   
      useEffect(() => {
           setAddress(fullAddress);
      }, [fullAddress]);

     

    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
    };

    
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*", 
      multiple: false, 
    });



    useEffect(() => {
      if (selectedFile) {
        const reader = new FileReader();
        
        reader.onload = () => {
       
          const base64Data = reader.result; 
          setBase64Image(base64Data);
        };
        reader.readAsDataURL(selectedFile);
      }
    }, [selectedFile]);
 
    const handleClose = () =>{
       setUploadModalOpen(false);
        setSelectedFile(null);
    }
   
    


    const handleUploadPrescripFile = async () =>{
           
        setLoading(true);
         let res = await postRequest(`prescription-order/store-or-update`, {
            prescription_file: base64Image,
         });  

         if(res?.status == 'success'){
            toast.success(`${res?.message}`);
            setUploadModalOpen(false);
              setSelectedFile(null);
              setLoading(false);
         } else {
            toast.error(`${res?.message}`);
            setLoading(false);
         }
    }

      const handleChange = (value) => {
          if (value == "") {
            setAddress(fullAddress);
          } else {
            setAddress(`${value}`);
          }
         
      };

      

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
          
          setFullAddress(response?.data?.display_name);
         
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
  
    const handleClick = async() =>{

        let validate = false;

         if (base64Image == "") {
           validate = true;
           toast.error("Prescription file is required");
           return;
         } 
         

        if (phoneNo == "") {
          validate = true;
          toast.error("Phone number is required");
          return;
        }

        if (phoneNo) {
          var bdMobilePattern = /^(\+)?(88)?01[3-9]\d{8}$/;
          if (bdMobilePattern.test(phoneNo)) {
          } else {
            validate = true;
            toast.error("Not a valid phone number");

            return;
          }
        }

        if (name == "") {
          validate = true;
          toast.error("Name is required");
          return;
        }

        if (address == "") {
          validate = true;
          toast.error("Address is required");
          return;
        }
       
       

        if (validate == false) {
           setLoading(true);

           let res = await postRequest(`prescription-guest-order`, {
             name: name,
             phone: phoneNo,
             address: address,
             prescription_file: base64Image,
           });

           if (res?.success) {
             toast.success(`${res?.message}`);
             setFlag(true);
             setLoading(false);
           } else {
               toast.error(`${res?.message}`);
                setLoading(false);
           }


        }

       
    }


  

  const handleOTPChange = (otp) => {
    setOTP(otp);
  };
  
  const handleSubmit = async() =>{
     
    let res = await postRequest(`guest-otp/verify`, {
      otp: otp,
      isPassLessLogin: 1,
    });

    if(res?.success){
        
         toast.success(`${res?.message}`);
         
         setFlag(false);
         setUploadModalOpen(false);
         
        
    } else {
       toast.error(`${res?.message}`);
    }

  }


 
    

  return (
    <Transition appear show={uploadModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black font-body"
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
            <div className="inline-block w-full max-w-lg min-h-[300px] p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div className="mt-7">
                <div className="py-4 bg-gray-100 flex flex-col justify-center">
                  <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                    <div
                      className="absolute top-[-40px] right-[-5px] sm:right-[-124px]"
                      onClick={() => handleClose()}
                    >
                      <svg
                        className="fill-current text-deepBlue-800 h-7 w-7 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                      </svg>
                    </div>
                  </div>

                  {token ? (
                    <>
                      <div>
                        <div
                          {...getRootProps()}
                          className="border-dashed border-2 border-gray-300 p-4 my-4 cursor-pointer w-[300px] m-auto"
                        >
                          <input {...getInputProps()} />
                          {!selectedFile ? (
                            <p className="text-center text-sm text-gray-400">
                              Please try to upload clear image. So that we can
                              easily understand.
                            </p>
                          ) : (
                            <>
                              <Image
                                height={100}
                                width={200}
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="w-[200px] m-auto"
                              />
                            </>
                          )}
                        </div>
                      </div>
                      {selectedFile ? (
                        <>
                          {loading ? (
                            <div className="mt-3 flex justify-center">
                              <LoadingSubmit />
                            </div>
                          ) : (
                            <div
                              className="flex justify-center"
                              onClick={() => handleUploadPrescripFile()}
                            >
                              <button className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 px-4 py-2 text-white rounded-md text-sm">
                                Upload
                              </button>
                            </div>
                          )}
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {flag == false ? (
                        <div>
                          <div>
                            <p className="text-lg font-normal text-center py-2 text-black">
                              Please select image{" "}
                              <span style={{ color: "red" }}>*</span>
                            </p>
                            <div
                              {...getRootProps()}
                              className="border-dashed border-2 border-gray-300 p-4 mb-4 cursor-pointer mx-auto w-[300px]"
                            >
                              <input {...getInputProps()} />
                              {!selectedFile ? (
                                <p className="text-center text-sm text-gray-400">
                                  Please try to upload clear image. So that we
                                  can easily understand.
                                </p>
                              ) : (
                                <>
                                  <Image
                                    height={100}

                                    width={200}
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Selected"
                                    className="w-[200px] m-auto"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                          <div className="w-full">
                            <input
                              className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black placeholder:text-sm"
                              placeholder="Enter phone number...(required)"
                              onChange={(event) =>
                                setPhoneNo(event.target.value)
                              }
                              autoComplete="off"
                            />
                          </div>

                          <div className="w-full mt-3">
                            <input
                              className="border-[1px] h-[40px] w-full pl-2 rounded-md outline-none bg-white text-black placeholder:text-sm"
                              placeholder="Enter name...(required)"
                              onChange={(event) => setName(event.target.value)}
                              autoComplete="off"
                            />
                          </div>

                          <div>
                            <div className="grid grid-cols-1 mt-3 ">
                              <div className="flex  justify-between space-x-2">
                                <span className="text-black">Address</span>
                                <span
                                  onClick={handleGetLocation}
                                  className="cursor-pointer inline-flex space-x-2"
                                >
                                  <span className="text-black text-sm">
                                    (get address from GPS)
                                  </span>
                                  <svg
                                    className="fill-current text-myColor-500 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M13 1L13.001 4.06201C16.6192 4.51365 19.4869 7.38163 19.9381 11L23 11V13L19.938 13.001C19.4864 16.6189 16.6189 19.4864 13.001 19.938L13 23H11L11 19.9381C7.38163 19.4869 4.51365 16.6192 4.06201 13.001L1 13V11L4.06189 11C4.51312 7.38129 7.38129 4.51312 11 4.06189L11 1H13ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"></path>
                                  </svg>
                                </span>
                              </div>

                              <div>
                                <textarea
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-deepBlue-800  dark:bg-white dark:placeholder-gray-400 dark:text-black"
                                  onChange={(e) => handleChange(e.target.value)}
                                  value={address}
                                  defaultValue={address}
                                ></textarea>
                              </div>
                            </div>
                          </div>

                          {loading == true ? (
                            <div className="mt-7 flex justify-center">
                              <LoadingSubmit />
                            </div>
                          ) : (
                            <div className="mt-7 flex justify-center">
                              <button
                                className="px-4 py-2 text-white bg-deepBlue-800 rounded-md text-sm"
                                onClick={() => handleClick()}
                              >
                                Submit
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-center text-xl font-semibold tracking-wider mb-4 pt-3 text-black">
                            Please enter your OTP
                          </p>
                          <div className="flex justify-center">
                            <OTPInput
                              value={otp}
                              onChange={handleOTPChange}
                              numInputs={4}
                              separator={<span>-</span>}
                              inputStyle="my-otp-input"
                              renderInput={(props) => (
                                <input type="text" {...props} />
                              )}
                            />
                          </div>
                          <div className="mt-7 flex justify-center">
                            <button
                              className="px-4 py-2 text-white bg-deepBlue-800 rounded-md text-sm"
                              onClick={() => handleSubmit()}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UploadModal;
