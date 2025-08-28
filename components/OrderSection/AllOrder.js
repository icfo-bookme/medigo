import request from '@/lib/request';
import { Pagination } from "antd";
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import OrderModal from './OrderModal';
import { MdFeedback } from 'react-icons/md';
import FeedbackModal from './FeedbackModal';

const AllOrder = ({
  orderModalOpen,
  loading,
  data,
  handleOrderDetails,
  setOrderModalOpen,
  singleData,
  page,
  totalData,

  handleFeedback,
  feedbackModalOpen,
  setFeedbackModalOpen,
  orderId,
}) => {
  return (
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
          {data?.data?.length > 0 ? (
            <>
              <div className="flex flex-col border-2 border-gray-400 rounded-lg mt-4 overflow-hidden overflow-x-auto">
                <div className=" sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div>
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500 dark:text-black">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              ORDER DATE
                            </th>
                            <th scope="col" className="px-6 py-4">
                              ORDER ID
                            </th>
                            <th scope="col" className="px-6 py-4">
                              TOTAL QUANTITY
                            </th>
                            <th scope="col" className="px-6 py-4">
                              STATUS
                            </th>
                            <th scope="col" className="px-6 py-4">
                              AMOUNT
                            </th>
                            <th scope="col" className="px-6 py-4">
                              OPERATIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody className="dark:text-black">
                          {data?.data?.map((item, index) => (
                            <tr
                              className="border-b dark:border-neutral-500"
                              key={index}
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {item?.sale_date}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item?.invoice_no}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <p className="text-center">
                                  {Number(item?.total_qty)}
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {item?.delivery_status == 1 ? (
                                  <p className="px-2 py-1 bg-blue-500 font-semibold text-white text-center rounded-md">
                                    Pending
                                  </p>
                                ) : item?.delivery_status == 2 ? (
                                  <p className="px-2 py-1 bg-green-500 font-semibold text-white text-center rounded-md">
                                    Delivered
                                  </p>
                                ) : item?.delivery_status == 3 ? (
                                  <p className="px-2 py-1 bg-yellow-500 font-semibold text-white text-center rounded-md">
                                    Processing
                                  </p>
                                ) : item?.delivery_status == 4 ? (
                                  <p className="px-2 py-1 bg-purple-500 font-semibold text-white text-center rounded-md">
                                    Order placed
                                  </p>
                                ) : item?.delivery_status == 5 ? (
                                  <p className="px-2 py-1 bg-green-700 font-semibold text-white text-center rounded-md">
                                    On Delivery
                                  </p>
                                ) : (
                                  <p className="px-2 py-1 bg-red-500 font-semibold text-white text-center rounded-md">
                                    Reject
                                  </p>
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                ৳ {Number(item?.grand_total).toFixed(2)}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-semibold flex items-center space-x-4">
                                <div
                                  className="flex justify-center items-center bg-blue-500 h-[30px] w-[30px] rounded-full cursor-pointer"
                                  onClick={() => handleOrderDetails(index)}
                                >
                                  <svg
                                    className="h-4 fill-current text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                                  </svg>
                                </div>

                                <div
                                  title="Feedback"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleFeedback(index, item?.invoice_no)
                                  }
                                >
                                  <MdFeedback
                                    className=" text-green-500"
                                    size={30}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3 mb-3">
                <Pagination
                  current={page}
                  total={totalData}
                  onChange={(page) => setPage(page)}
                  pageSize={15}
                />
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

      <OrderModal
        orderModalOpen={orderModalOpen}
        setOrderModalOpen={setOrderModalOpen}
        singleData={singleData}
      />

      <FeedbackModal
        feedbackModalOpen={feedbackModalOpen}
        setFeedbackModalOpen={setFeedbackModalOpen}
        orderId={orderId}
      />
    </div>
  );
};

export default AllOrder