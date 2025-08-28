import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { setCookie, destroyCookie } from "nookies";
import { Fragment } from "react";
import { toast } from "react-toastify";

const OrderModal = ({ orderModalOpen, setOrderModalOpen, singleData }) => {

   
  const { setCartItems, cartItems, setIsRenderMe, renderMe, setIsCartOpen } =
    useStatus();

  const router = useRouter();
  

const handleReorder = async () =>{

   let arr = [];

   singleData?.sale_product_list?.map((item,index)=>{
         arr.push({
           id: item?.product_variant?.id,
           product_id: item?.product_id,
           generic_name: item?.product?.generic?.generic_name,
           productUnit: item?.product_units,
           name: item?.product?.name,
           image: item?.product?.image,
           discount: item?.product_variant?.discount,
           mainprice: Number(item?.product_variant?.price),
           price: Number(
             item?.product_variant?.price -
               (item?.product_variant?.price *
                 item?.product_variant?.discount) /
                 100
           ),
           quantity: item?.qty,
           sale_unit_id: item?.sale_unit_id,
           stock: item?.product_variant?.qty,
           unitIndex: item?.product_units?.findIndex(
             (unititem) => unititem?.id == item?.product_variant?.id
           ),
           unitName: item?.product_variant?.unit?.unit_name,
         });
   })
   
   
function updateOrAddProducts(cartItem, newProducts) {
  newProducts.forEach((newProduct) => {
    const index = cartItem.findIndex(
      (cartProduct) => cartProduct.product_id === newProduct.product_id
    );
    if (index !== -1) {
      
      cartItem[index] = newProduct;
      // toast.success(`Previous product replaced by new one`);
      setIsCartOpen(true);
    } else {
      cartItem.push(newProduct);
      setIsCartOpen(true);
    }
  });
  destroyCookie({}, "ePharma", {
    path: "/",
  });

  toast.success(`Re-order successful, added to cart`);
       setOrderModalOpen(false);
}

     updateOrAddProducts(cartItems, arr);
  
      setCartItems((cartItems) => [...cartItems]);

      setCookie(null, "ePharma", JSON.stringify([...cartItems]), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      setIsRenderMe(!renderMe);

}


 
 
  return (
    <Transition appear show={orderModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black dark:text-black"
        onClose={() => setOrderModalOpen(false)}
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
            <div className="inline-block w-full max-w-[800px] min-h-[300px] p-4 xls:p-2 xms:p-2 xs:p-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gray-100 flex flex-col justify-center max-w-[45rem] mx-auto">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px]"
                        onClick={() => setOrderModalOpen(false)}
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
                  </div>
                  <div className="bg-gray-100 my-5">
                    <div>
                      <p className="font-semibold tracking-wider font-body text-lg">
                        Order status
                      </p>
                      {singleData?.delivery_status == 1 ? (
                        <p className="px-2 py-1 text-blue-500 font-semibold text-lg  rounded-md">
                          Pending
                        </p>
                      ) : singleData?.delivery_status == 2 ? (
                        <p className="px-2 py-1 text-green-500 font-semibold text-lg   rounded-md">
                          Delivered
                        </p>
                      ) : singleData?.delivery_status == 3 ? (
                        <p className="px-2 py-1 text-yellow-500 font-semibold text-lg   rounded-md">
                          Processing
                        </p>
                      ) : singleData?.delivery_status == 4 ? (
                        <p className="px-2 py-1 text-purple-500 font-semibold text-lg   rounded-md">
                          Order placed
                        </p>
                      ) : singleData?.delivery_status == 5 ? (
                        <p className="px-2 py-1 text-green-700 font-semibold text-lg   rounded-md">
                          On Delivery
                        </p>
                      ) : (
                        <p className="px-2 py-1 text-red-500 font-semibold  text-lg  rounded-md">
                          Reject
                        </p>
                      )}

                      <div className="px-4 xls:px-1 xms:px-1 xs:px-1 py-4 font-body border-2 border-gray-200 rounded-lg mt-3">
                        <div className="grid grid-cols-3">
                          <div className="grid justify-start xls:text-xs xms:text-xs xs:text-xs">
                            <p className="text-gray-500 font-semibold">
                              Order ID
                            </p>
                            <p className="font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              {singleData?.id}
                            </p>
                          </div>

                          <div className="grid justify-center">
                            <p className="text-gray-500 font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              Order Date
                            </p>
                            <p className="font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              {singleData?.sale_date}
                            </p>
                          </div>
                          <div className="grid justify-end">
                            <p className="text-gray-500 font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              Payment method
                            </p>
                            <p className="font-semibold xls:text-xs xms:text-xs xs:text-xs">
                              cash
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 font-body">
                        <p className="tracking-wider">Order Summary</p>

                        <div className="border-2 border-gray-200 rounded-lg mt-3">
                          {singleData?.sale_product_list?.map((item, index) => (
                            <div
                              className="grid grid-cols-12 px-2 py-2 border-b-2 border-gray-100"
                              key={index}
                            >
                             
                              {item?.product?.name.length > 35 ? (
                                <p className="font-semibold tracking-wider text-black col-span-7 xls:text-xs xms:text-xs xs:text-xs">
                                  {item?.product?.name.substring(0, 35) +
                                    "...."}
                                </p>
                              ) : (
                                <p className="font-semibold tracking-wider text-black col-span-7 xls:text-xs xms:text-xs xs:text-xs">
                                  {item?.product?.name}
                                </p>
                              )}

                              <p className="text-black col-span-2 xls:text-xs xms:text-xs xs:text-xs">
                                {item?.qty}
                              </p>
                              <h2 className="font-semibold text-base text-black col-span-3 xls:text-xs xms:text-xs xs:text-xs">
                                ৳ {item?.total}
                              </h2>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="py-3 w-full text-center cursor-pointer text-deepBlue-800 text-lg font-body font-semibold rounded-md uppercase border-2 border-deepBlue-800 mt-3" onClick={()=>handleReorder()}>
                          Re-order
                      </div>
                      <div className="mt-4 font-body dark:text-black">
                        <p className="tracking-wider">Payment Details</p>
                        <div className="border-2 border-gray-200 rounded-lg p-4 mt-3">
                          <div className="flex justify-between items-center py-2 border-b-2 border-gray-100">
                            <p className="font-medium xls:text-xs xms:text-xs xs:text-xs">
                              Subtotal
                            </p>
                            <h2 className="font-semibold text-base xls:text-xs xms:text-xs xs:text-xs">
                              ৳ {singleData?.net_total}
                            </h2>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b-2 border-gray-100">
                            <p className="font-medium xls:text-xs xms:text-xs xs:text-xs">
                              Delivery charge
                            </p>
                            <h2 className="font-semibold text-base xls:text-xs xms:text-xs xs:text-xs">
                              ৳ {singleData?.shipping_cost}
                            </h2>
                          </div>
                          {singleData?.total_discount == null ? null : (
                            <div className="flex justify-between items-center py-2 border-b-2 border-gray-100">
                              <p className="font-medium xls:text-xs xms:text-xs xs:text-xs">
                                Discount
                              </p>
                              <h2 className="font-semibold text-base xls:text-xs xms:text-xs xs:text-xs">
                                ৳ {Math.round(singleData?.total_discount)}
                              </h2>
                            </div>
                          )}

                          <div className="flex justify-between items-center py-2 border-b-2 border-gray-100">
                            <p className="font-medium xls:text-xs xms:text-xs xs:text-xs">
                              Total
                            </p>
                            <h2 className="font-semibold text-base xls:text-xs xms:text-xs xs:text-xs">
                              ৳ {singleData?.grand_total}
                            </h2>
                          </div>
                        </div>
                      </div>
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

export default OrderModal;
