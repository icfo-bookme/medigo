import request from "@/lib/request";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import DetailSection from "../ProductDetails/DetailSection";
import ImageGallery from "../ProductDetails/ImageGallery";
import SimilarProductSection from "../ProductDetails/SimilarProductSection";
import { ThreeDots } from "react-loader-spinner";

const ProductModel = ({
  setProductModalOpen,
  productModalOpen,
  slugId,
  id,
  setSlugId,
  setId,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleClose = () =>{
     setProductModalOpen(false);
     setSlugId(null);
     setId(null);
  
  }

  useEffect(() => {
    if (slugId) {
      
      const getData = async () => {
        let res = await request(`product-details/${slugId}`);
        setData(res?.data);
        setLoading(false);
       
      };
      getData();
    }
  }, [slugId]);

 

  return (
    <Transition appear show={productModalOpen} as={Fragment}>
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
            <div className=" inline-block w-full max-w-6xl min-h-[300px] p-4 xls:p-2 xms:p-2 xs:p-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div className="mt-7">
                <div className="py-4 bg-gray-100 flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
                  </div>

                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "100px",
                      }}
                    >
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#1F2937"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />{" "}
                    </div>
                  ) : (
                    <div className="bg-gray-100 my-5">
                      <div className="grid grid-cols-2 pt-6  mb-4 bg-white px-7 xls:px-4 xms:px-3 xs:px-2 pb-4 shadow-md rounded-md gap-x-7">
                        <ImageGallery image={data?.image} />

                        <DetailSection data={data} />
                      </div>
                      <div className="shadow-md w-full rounded-md bg-white p-5">
                        <SimilarProductSection
                          products={data?.similar_products}
                          section={`Alternative Brands`}
                          slugId={slugId}
                          id={id}
                        />
                      </div>

                      {/* <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
                        <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                          Safety Advices
                        </p>
                        {data?.generic?.generic_details?.map((item, index) => (
                          <div key={index}>
                            <button
                              className={`bg-${
                                index % 2 === 0 ? "red-500" : "green-500"
                              } px-2 py-1 rounded-md`}
                            >
                              {item?.title}
                            </button>
                            <p className="text-black pt-3 text-sm">
                              {item?.description}
                            </p>
                          </div>
                        ))}
                      </div> */}

                      {data?.indication !== null ? (
                        <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body overflow-hidden">
                          <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                            Safety Advices
                          </p>
                          <div className="indication">
                            <span
                              className="text-black indicateSpan"
                              dangerouslySetInnerHTML={{
                                __html: data?.indication,
                              }}
                            ></span>
                          </div>
                        </div>
                      ) : null}
                      {data?.medical_overview !== null ? (
                        <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
                          <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                            Medical overview
                          </p>
                          <div className="medical_overview">
                            <span
                              className="text-black"
                              dangerouslySetInnerHTML={{
                                __html: data?.medical_overview,
                              }}
                            ></span>
                          </div>
                        </div>
                      ) : null}
                      {data?.quick_tips !== null ? (
                        <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
                          <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                            Quick Tips
                          </p>
                          <div className="quick_tips">
                            <span
                              className="text-black "
                              dangerouslySetInnerHTML={{
                                __html: data?.quick_tips,
                              }}
                            ></span>
                          </div>
                        </div>
                      ) : null}

                      {data?.brief_description !== null ? (
                        <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
                          <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                            Brief description
                          </p>
                          <div className="brief_description">
                            <span
                              className="text-black "
                              dangerouslySetInnerHTML={{
                                __html: data?.brief_description,
                              }}
                            ></span>
                          </div>
                        </div>
                      ) : null}
                      {data?.disclaimer !== null ? (
                        <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
                          <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                            Disclaimer
                          </p>
                          <div className="disclaimer">
                            <span
                              className="text-black "
                              dangerouslySetInnerHTML={{
                                __html: data?.disclaimer,
                              }}
                            ></span>
                          </div>
                        </div>
                      ) : null}
                    </div>
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

export default ProductModel