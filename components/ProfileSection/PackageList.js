import React, { useEffect, useState } from 'react'
import PackageListModal from './PackageListModal';
import { useStatus } from '@/context/contextStatus';
import request from '@/lib/request';
import { Pagination } from 'antd';
import { ThreeDots } from 'react-loader-spinner';
import PackageDeleteModalOpen from './PackageDeleteModal';
import { toast } from 'react-toastify';
import deleteRequest from '@/lib/deleteRequest';
import PackageEditModal from './PackageEditModal';


const PackageList = () => {
   
    const {token} = useStatus();
    const [packageViewModal,setPackageViewModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(null);
     const [data, setData] = useState([]);
     const [pageSize,setPageSize] = useState(null);
     const [packages,setPackages] = useState({});
     const [deleteId,setDeleteId] = useState(null);
     const [packageDeleteModalOpen,setPackageDeleteModalOpen] = useState(false);
     const [renderMe,setRenderMe] = useState(false);
     const [updateId,setUpdateId] = useState(null);
     const [editPackageModal,setEditPackageModal] = useState(false);
     const [editItem,setEditItem] = useState({});
     const [packageName,setPackageName] = useState(null);
     const [startDate, setStartDate] = useState("");
     const [endDate, setEndDate] = useState('');
     const [autoOrderDays, setAutoOrderDays] = useState(null);
      const [packageItems, setPackageItems] = useState([]);
    

    const handleClick = (index) =>{
          setPackageViewModal(true);
          setPackages(data[index]);
          
    }


    useEffect(() => {
      if(Object.keys(editItem).length > 0 ){
          setPackageName(editItem?.name);
          setStartDate(new Date(editItem?.start_date));
          setEndDate(new Date(editItem?.delivery_date));
          setAutoOrderDays(editItem?.auto_order_after_days);

          let arr = [];

          editItem?.products_list?.map((item,index)=>{
              arr.push({
                id: item?.product_variant?.id,
                product_id: item?.product_id,
                generic_name: item?.product?.generic?.generic_name,
                productUnit: item?.product_units,
                name: item?.product?.name,
                image: item?.product?.image,
                discount: item?.product_variant?.discount,
                discount_rate: Number( (item?.net_unit_price * item?.product_variant?.discount / 100) ),
                net_unit_price: item?.net_unit_price,
                qty: item?.qty,
                sale_unit_id: item?.sale_unit_id,
                stock: item?.product_variant?.qty,

                unit_name: item?.product_variant?.unit?.unit_name,
                total:item?.total,
              });
          })

          setPackageItems(arr);
  
      }
    }, [editItem]);


    const handleDeletePackage = (id) => {
      setDeleteId(id);
      setPackageDeleteModalOpen(true);
    };

    const handleUpdatePackage = (id,index) =>{
            
      setUpdateId(id);
       setEditPackageModal(true);
       setEditItem(data[index]);
    }


    useEffect(() => {
      if (token) {
        let getData = async () => {
          let res = await request(`package-order/list?page=${page}`);
          setTotalData(res?.total);
          setData(res?.data);
          setPageSize(res?.per_page);
          setLoading(false);
        };
        getData();
      }
    }, [renderMe]);


     const handleDelete = async () => {
       let res = await deleteRequest(`package-order/delete/${deleteId}`);
       if (res?.status == "success") {
         toast.success(`${res?.message}`);
         setRenderMe(!renderMe);
         setDeleteId(null);
         setPackageDeleteModalOpen(false);
       } else {
         toast.error(`${res?.message}`);
       }
     };

    //  console.log("editItem...", editItem);



  return (
    <>
      <div className="bg-white p-3 rounded-md min-h-[700px]">
        <div className="flex space-x-2 items-center">
          <svg
            className="fill-current h-6 w-6  text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M3 2.9918C3 2.44405 3.44495 2 3.9934 2H20.0066C20.5552 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM19 11V4H5V11H19ZM19 13H5V20H19V13ZM9 6H15V8H9V6ZM9 15H15V17H9V15Z"></path>
          </svg>
          <h1 className="font-semibold text-2xl">
            <span className="text-myColor-500">Package List</span>{" "}
          </h1>
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
            {data?.length > 0 ? (
              <>
                <div className="flex flex-col border-2 border-gray-400 rounded-lg mt-4 overflow-hidden overflow-hidden overflow-x-auto">
                  <div className=" sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div>
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium dark:border-neutral-500 dark:text-black">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                PACKAGE NAME
                              </th>
                              <th scope="col" className="px-6 py-4">
                                START DATE
                              </th>
                              <th scope="col" className="px-6 py-4">
                                DELIVERY DATE
                              </th>
                              <th scope="col" className="px-6 py-4">
                                TOTAL QUANTITY
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-4">
                                OPERATIONS
                              </th>
                            </tr>
                          </thead>
                          <tbody className="dark:text-black">
                            {data?.map((item, index) => (
                              <tr
                                className="border-b dark:border-neutral-500"
                                key={index}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {item?.name}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                  {item?.start_date}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                  {item?.delivery_date}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                  {Number(item?.products_list?.length)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                  ৳ {Number(item?.grand_total).toFixed(2)}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 font-semibold flex space-x-4 items-center">
                                  {/* <div className="flex  items-center space-x-3">
                                <button
                                  className="bg-orange-500 px-3 text-white rounded-md py-2 flex justify-center items-center cursor-pointer"
                                  onClick={() => handleClick(index)}
                                >
                                  Details
                                </button>
                              </div> */}
                                  <div
                                    className="flex justify-center items-center bg-blue-500 h-[30px] w-[30px] rounded-full cursor-pointer"
                                    onClick={() => handleClick(index)}
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
                                    className="flex justify-center items-center bg-red-500 h-[30px] w-[30px] rounded-full cursor-pointer"
                                    onClick={() =>
                                      handleDeletePackage(item?.id, index)
                                    }
                                  >
                                    <svg
                                      className="h-4 fill-current text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                    </svg>
                                  </div>

                                  <div
                                    className="flex justify-center items-center bg-slate-800 h-[30px] w-[30px] rounded-full cursor-pointer"
                                    onClick={() =>
                                      handleUpdatePackage(item?.id, index)
                                    }
                                  >
                                    <svg
                                      className="h-4 fill-current text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M6.41421 15.89L16.5563 5.74786L15.1421 4.33365L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6474L14.435 2.21233C14.8256 1.8218 15.4587 1.8218 15.8492 2.21233L18.6777 5.04075C19.0682 5.43128 19.0682 6.06444 18.6777 6.45497L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                                    </svg>
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
                    pageSize={pageSize}
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
      </div>
      <PackageListModal
        packageViewModal={packageViewModal}
        setPackageViewModal={setPackageViewModal}
        packages={packages}
      />

      <PackageDeleteModalOpen
        packageDeleteModalOpen={packageDeleteModalOpen}
        setPackageDeleteModalOpen={setPackageDeleteModalOpen}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        handleDelete={handleDelete}
      />
      <PackageEditModal
        editPackageModal={editPackageModal}
        setEditPackageModal={setEditPackageModal}
        updateId={updateId}
        setUpdateId={setUpdateId}
        editItem={editItem}
        setEditItem={setEditItem}
        packageName={packageName}
        setPackageName={setPackageName}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate || new Date()}
        setEndDate={setEndDate}
        autoOrderDays={autoOrderDays}
        setAutoOrderDays={setAutoOrderDays}
        packageItems={packageItems}
        setPackageItems={setPackageItems}
        renderMe={renderMe}
        setRenderMe={setRenderMe}
      />
    </>
  );
}

export default PackageList