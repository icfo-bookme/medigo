import { useStatus } from "@/context/contextStatus";
import hostname, { ImageHostName } from "@/lib/config";
import request from "@/lib/request";
import { Pagination } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { ThreeDots } from "react-loader-spinner";
import PrescriptionDeleteModal from "./PrescriptionDeleteModal";
import deleteRequest from "@/lib/deleteRequest";
import { toast } from "react-toastify";
import EditPrescriptionModal from "./EditPrescriptionModal";
import PrescriptionImageModal from "./PrescriptionImageModal";
import Image from "next/image";


const MyPrescriptionOrder = () => {

  const {token} = useStatus();
   
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [totalData, setTotalData] = useState(null);
   const [pageSize,setPageSize] = useState(null);
   const [prescriptionModalDelete,setPrescriptionModalDelete] = useState(false);
   const [EditPrescriptionModalOpen, setEditPrescriptionModalOpen] =
     useState(false);
   const [deleteId,setDeleteId] = useState(null);
   const [updateID,setUpdateID] = useState(null);
 
   const [renderMe, setRenderMe] = useState(false);
   const [item,setItem] = useState({});

   const [prescriptionImageModalOpen,setPrescriptionImageModalOpen] = useState(false);

   const [id,setId] = useState(null);

   const[image,setImage] = useState(null);

  useEffect(() => {
    if (token) {
      const getData = async () => {
        let res = await request(`prescription-order/list?page=${page}`);
        setPageSize(res?.per_page);
        setTotalData(res?.total);
        setData(res?.data);
        setLoading(false);
      };
      getData();
    }
  }, [renderMe,page,token]);

  const handlePageChange = (pageNumber) => {
    // Scroll the container element to the top
    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      block: "start",
    });

    // Additional logic for handling the page change
    setPage(pageNumber);
  };
  
  const handleDeleteID = (id) =>{
     setPrescriptionModalDelete(true);
      setDeleteId(id);
  }

  const handleUpdateID  = (id,index) =>{
      setEditPrescriptionModalOpen(true);
    
      setUpdateID(id);
      setItem(data[index])
  }

  const handleDelete = async () => {
    
      let res = await deleteRequest(`prescription-order/delete/${deleteId}`);

      if(res?.status == 'success'){
          toast.success(`${res?.message}`);
           setRenderMe(!renderMe);
           setDeleteId(null);
           setPrescriptionModalDelete(false);
      } else {
         toast.error(`${res?.message}`);
      }
     
  };

const handleImage = (id,index) =>{
  setPrescriptionImageModalOpen(true);
  setId(id);
  setImage(data[index]?.prescription_file);
}



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
          {data?.length > 0 ? (
            <div className="flex flex-col border-2 border-gray-400 rounded-lg mt-4">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500 dark:text-black">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Prescription file
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
                              <Image
                                height={50}
                                width={50}
                                alt="product"
                                src={`${ImageHostName}/storage/prescription/${item?.prescription_file}`}
                                className="h-[50px] w-[50px] object-cover cursor-pointer"
                                onClick={() => handleImage(item?.id, index)}
                              />
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 font-semibold flex space-x-10">
                              <div
                                className="flex justify-center items-center bg-slate-800 h-[30px] w-[30px] rounded-full cursor-pointer"
                                onClick={() => handleUpdateID(item?.id, index)}
                              >
                                <svg
                                  className="h-5 fill-current text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 18.89H6.41421L15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89ZM21 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L9.24264 18.89H21V20.89ZM15.7279 6.74786L17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786Z"></path>
                                </svg>
                              </div>
                              <div
                                className="flex justify-center items-center bg-red-600 h-[30px] w-[30px] rounded-full cursor-pointer"
                                onClick={() => handleDeleteID(item?.id)}
                              >
                                <svg
                                  className="h-5 fill-current text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
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
              <div className="flex justify-center mt-3 mb-3">
                <Pagination
                  current={page}
                  total={totalData}
                  onChange={(page) => handlePageChange(page)}
                  pageSize={pageSize}
                />
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-center text-black text-3xl tracking-wider">
                No data found
              </p>
            </div>
          )}
        </>
      )}

      <PrescriptionDeleteModal
        prescriptionModalDelete={prescriptionModalDelete}
        setPrescriptionModalDelete={setPrescriptionModalDelete}
        deleteId={deleteId}
        handleDelete={handleDelete}
        setDeleteId={setDeleteId}
      />

      <EditPrescriptionModal
        EditPrescriptionModalOpen={EditPrescriptionModalOpen}
        setEditPrescriptionModalOpen={setEditPrescriptionModalOpen}
        item={item}
        updateID={updateID}
        setUpdateID={setUpdateID}
        setItem={setItem}
        renderMe={renderMe}
        setRenderMe={setRenderMe}
      />
      <PrescriptionImageModal
        id={id}
        setId={setId}
        prescriptionImageModalOpen={prescriptionImageModalOpen}
        setPrescriptionImageModalOpen={setPrescriptionImageModalOpen}
        image={image}
        setImage={setImage}
      />
    </div>
  );
};

export default MyPrescriptionOrder;
