import { useStatus } from "@/context/contextStatus";
import postRequest from "@/lib/postRequest";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { toast } from "react-toastify";
import {destroyCookie, setCookie} from "nookies";

const PackageListModal = ({
  packageViewModal,
  setPackageViewModal,
  packages,
}) => {


  const { setCartItems, cartItems, setIsRenderMe, renderMe, setIsCartOpen } =
    useStatus();

  const router = useRouter();


  const handleReorder = async () =>{

    let arr = [];

    packages?.products_list?.map((item,index)=>{
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
      toast.success(`Order added successfully`);

      destroyCookie({}, "ePharma", {
        path: "/",
      });
        setPackageViewModal(false);
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
    <Transition appear show={packageViewModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto bg-opacity-60 bg-black dark:text-black"
        onClose={() => setPackageViewModal(false)}
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
            <div className="inline-block w-full max-w-[800px] min-h-[300px] p-4 xls:p-2 xms:p-2 xs:p-1 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gray-100 flex flex-col justify-center max-w-[45rem] mx-auto">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px]"
                        onClick={() => setPackageViewModal(false)}
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
                        Package name
                      </p>

                      <p className="px-2 py-1 text-blue-500 font-semibold text-lg  rounded-md">
                        {packages?.name}
                      </p>

                      <div className="mt-4 font-body">
                        <p className="tracking-wider">Package Summary</p>

                        <div className="border-2 border-gray-200 rounded-lg mt-3">
                          {packages?.products_list?.map((item, index) => (
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

                          <div className="border-2 border-gray-200 rounded-lg mt-3">
                            <div
                                className="grid grid-cols-12 px-2 py-2 border-b-2 border-gray-100" >
                                  <p className="text-black col-span-2 xls:text-xs xms:text-xs xs:text-xs">
                                    Total
                                  </p>
                              <p className="text-black col-span-2 xls:text-xs xms:text-xs xs:text-xs">

                              </p>
                              <p className="text-black col-span-2 xls:text-xs xms:text-xs xs:text-xs">

                              </p>
                              <p className="text-black text-center col-span-2 xls:text-xs xms:text-xs xs:text-xs">
                                {Number(packages?.products_list?.length)}
                              </p>
                                  <h2 className="font-semibold text-center text-base text-black col-span-3 xls:text-xs xms:text-xs xs:text-xs">
                                    ৳ {packages.grand_total}
                                  </h2>
                            </div>
                          </div>


                      </div>
                      <div
                        className="py-3 w-full text-center cursor-pointer text-deepBlue-800 text-lg font-body font-semibold rounded-md uppercase border-2 border-deepBlue-800 mt-3"
                        onClick={() => handleReorder()}
                      >
                        Order Package
                      </div>
                      {/* <div className="mt-4 font-body dark:text-black">
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
                      </div> */}
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

export default PackageListModal;
