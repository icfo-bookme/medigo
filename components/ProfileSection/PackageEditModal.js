import { useStatus } from "@/context/contextStatus";
import hostname, { ImageHostName } from "@/lib/config";
import request from "@/lib/request";
import { Dialog, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { destroyCookie } from "nookies";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import postRequest from "@/lib/postRequest";
import LoadingSubmit from "../common/LoadingSubmit";

const PackageEditModal = ({
  editPackageModal,
  setEditPackageModal,
  updateId,
  setUpdateId,
  editItem,
  packageName,
  setPackageName,
  setEditItem,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  autoOrderDays,
  setAutoOrderDays,
  packageItems,
  setPackageItems,
  renderMe,
  setRenderMe,

}) => {
  const { token,setStep } = useStatus();

  const [searchData, setSearchData] = useState([]);

  const [selectedValue, setSelectValue] = useState(null);

  const [countValues, setCountValues] = useState({});

  const [stock, setStock] = useState(null);

  const [selectIndex, setSelectIndex] = useState({});

  const searchRef = useRef(null);

  const [totalDiscount, setTotalDiscount] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0); 

  const [loading,setLoading] = useState(false);

  const handleClose = () => {
    setUpdateId(null);
    setEditPackageModal(false);
    setEditItem({});
    setPackageItems([]);
  };

  const search = async (val) => {
    if (val) {
      if (token) {
        const getData = async () => {
          const res = await request(`search/${val}`);

          setSearchData(res?.data);
        };
        getData();
      }
    } else {
      setSearchData([]);
    }
  };

  const handleSearchChange = (item, value, index, indexSelect) => {
    setSelectValue(searchData[index]?.product_units[value]);
    setStock(searchData[index]?.product_units[value]?.qty);
    setSelectIndex((prevValues) => ({
      ...prevValues,
      [item.id]: indexSelect || 0,
    }));
    setCountValues(1);
  };

  const handleAdd = (item) => {
  
      
        let Obj = {
          id:
            selectedValue !== null
              ? selectedValue?.id
              : item?.product_units[0]?.id,
          product_id: item?.id,
          name: item?.name,
          sale_unit_id:
            selectedValue !== null
              ? selectedValue?.unit?.id
              : item?.product_units[0]?.unit?.id,
          qty: countValues[item.id] || 1,
          stock:
            selectedValue !== null
              ? selectedValue?.quantity
              : item?.product_units[0]?.quantity,
          net_unit_price:
            selectedValue !== null
              ? selectedValue?.discount == 0 || selectedValue?.discount == null
                ? selectedValue?.price
                : Number(
                    selectedValue?.price -
                      (selectedValue?.price * selectedValue?.discount) / 100
                  ).toFixed(2)
              : item?.product_units[0]?.discount == 0 ||
                item?.product_units[0]?.discount == null
              ? item?.product_units[0]?.price
              : Number(
                  item?.product_units[0]?.price -
                    (item?.product_units[0]?.price *
                      item?.product_units[0]?.discount) /
                      100
                ).toFixed(2),
          discount:
            selectedValue !== null
              ? selectedValue?.discount
              : item?.product_units[0]?.discount,
          discount_rate:
            selectedValue !== null
              ? Number((selectedValue?.price * selectedValue?.discount) / 100)
              : Number(
                  (item?.product_units[0]?.price *
                    item?.product_units[0]?.discount) /
                    100
                ),
          unit_name:
            selectedValue !== null
              ? selectedValue?.unit?.unit_name
              : item?.product_units[0]?.unit?.unit_name,
          image: item?.image,
        };

        const is_exist = packageItems.find(
          (variation) => variation.product_id == item.id
        );

        if (is_exist) {
          const index = packageItems.findIndex(
            (variation) => variation.product_id == is_exist.product_id
          );

          packageItems[index].unit_name =
            selectedValue !== null
              ? selectedValue?.unit?.unit_name
              : item?.product_units[0]?.unit?.unit_name;
          packageItems[index].id =
            selectedValue !== null
              ? selectedValue?.id
              : item?.product_units[0]?.id;
           packageItems[index].qty = countValues[item.id] || 1;
           packageItems[index].stock =
             selectedValue !== null
               ? selectedValue?.qty
               : item?.product_units[0]?.qty;
            packageItems[index].net_unit_price =
               selectedValue !== null
                 ? selectedValue?.discount == 0 ||
                   selectedValue?.discount == null
                   ? selectedValue?.price
                   : Number(
                       selectedValue?.price -
                         (selectedValue?.price * selectedValue?.discount) / 100
                     ).toFixed(2)
                 : item?.product_units[0]?.discount == 0 ||
                   item?.product_units[0]?.discount == null
                 ? item?.product_units[0]?.price
                 : Number(
                     item?.product_units[0]?.price -
                       (item?.product_units[0]?.price *
                         item?.product_units[0]?.discount) /
                         100
                   ).toFixed(2);
          packageItems[index].sale_unit_id =
            selectedValue !== null
              ? selectedValue?.unit?.id
              : item?.product_units[0]?.unit?.id;
          packageItems[index].discount =
            selectedValue !== null
              ? selectedValue?.discount
              : item?.product_units[0]?.discount;

          packageItems[index].discount_rate =
            selectedValue !== null
              ? Number((selectedValue?.price * selectedValue?.discount) / 100)
              : Number(
                  (item?.product_units[0]?.price *
                    item?.product_units[0]?.discount) /
                    100
                );
          setPackageItems(packageItems);
          setSelectValue(null);
          setSelectIndex({ [item.id]: 0 });
          toast.success(`Product added successfully`);
        }

        if (is_exist === undefined) {
          setPackageItems((packageItems) => [...packageItems, Obj]);
          setSelectValue(null);
          setSelectIndex({ [item.id]: 0 });
          setCountValues({ [item.id]: 0 });
          toast.success(`Product added successfully`);
        }
      
   
  };

  const handleIncrement = (item) => {
    if (Object.keys(selectIndex).length > 0) {
     
        setCountValues((prevCountValues) => ({
          ...prevCountValues,
          [item.id]: (prevCountValues[item.id] || 1) + 1,
        }));
      
    } else {
      setCountValues((prevCountValues) => ({
        ...prevCountValues,
        [item.id]: (prevCountValues[item.id] || 1) + 1,
      }));
    } 
  };

  const handleDecrement = (item) => {
    if (countValues[item.id] > 0) {
      setCountValues((prevCountValues) => ({
        ...prevCountValues,
        [item.id]: prevCountValues[item.id] - 1,
      }));
    }
  };

  const handlePackageItemRemove = (index) => {
    const list = [...packageItems];
    list.splice(index, 1);
    setPackageItems(list);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchData([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



   useEffect(() => {
     if (packageItems?.length > 0) {
       let totalDiscount = packageItems?.reduce(
         (a, b) => a + (b?.discount ? b?.discount : b?.discount),
         0
       );

       let totalGrandTotal = packageItems?.reduce(
         (a, b) => a + Number(b?.net_unit_price) * Number(b?.qty),
         0
       );

       setGrandTotal(Number(totalGrandTotal).toFixed(2));
       setTotalDiscount(Number(totalDiscount).toFixed(2));
     } else {
       setGrandTotal(0);
       setTotalDiscount(0);
     }
   }, [packageItems]);

  const handleSubmit = async () => {
     
    let validate = false;

    if (packageName == null || packageName == undefined) {
      validate = true;
      toast.error("Package name is required");
      return;
    }

    if (packageItems?.length == 0) {
      validate = true;
      toast.error("You must add at least on product in a package");
      return;
    }

    if (startDate == "") {
      validate = true;
      toast.error("Start date is required");
      return;
    }

    if (endDate == "") {
      validate = true;
      toast.error("End date is required");
      return;
    }

    if (endDate <= startDate) {
      validate = true;
      toast.error("End date must be greater than start date");
      return;
    }

    if (autoOrderDays === null) {
      validate = true;
      toast.error("Auto order days is required");
      return;
    }

    if (isNaN(autoOrderDays)) {
      validate = true;
      toast.error("Auto order days must be a number");
      return;
    }

    if(validate == false){

      setLoading(true);

      let arr = [];

      packageItems?.map((item) => {
        arr.push({
          id: item?.id,
          product_id: item?.product_id,
          qty: item?.qty,
          net_unit_price: Number(item?.net_unit_price),
          sale_unit_id: item?.sale_unit_id,
          discount: item?.discount,
          discount_rate: item?.discount_rate,
          total: Number(item?.net_unit_price) * Number(item?.qty),
        });
      });

      let res = await postRequest(`package-order/store-or-update`, {
        name: packageName,
        update_id: editItem?.id,
        products: arr,
        start_date: startDate,
        delivery_date: endDate,
        auto_order_after_days: Number(autoOrderDays),
        total_discount: totalDiscount,
        grand_total: grandTotal,
        item: Number(packageItems?.length),
        shipping_cost: 70,
      });

      if (res?.status == "success") {
        toast.success(`${res.message}`);
        setPackageItems([]);
        setPackageName(null);
        setEditItem({});
        setEditPackageModal(false);
        setStep("packageList");
        setRenderMe(!renderMe);
        setLoading(false);
      } else {
        toast.error(`${res?.message}`);
      }

       
    }

    
  };

  return (
    <Transition appear show={editPackageModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40  bg-opacity-60 overflow-y-auto bg-black font-body"
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
            <div className=" inline-block w-full max-w-[600px] min-h-min p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-100 rounded-lg shadow-xl">
              <div>
                <div className="py-4 bg-gray-100 flex flex-col justify-center">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center text-3xl font-extrabold text-gray-900 relative">
                      <div
                        className="absolute top-[-20px] right-[-5px]"
                        onClick={() => handleClose()}
                      >
                        <svg
                          className="fill-current text-secondaryColor-500 h-7 w-7 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className=" my-5">
                    <div className="w-full">
                      <p className="text-lg font-normal  py-2 text-black">
                        Package name <span style={{ color: "red" }}>*</span>
                      </p>
                      <input
                        className="border-[1px] h-[40px] w-[400px] xls:w-full xms:w-full xs:w-full pl-2 rounded-md outline-none bg-white text-black"
                        placeholder="Enter package name..."
                        defaultValue={packageName}
                        onChange={(event) => setPackageName(event.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      {packageItems?.length > 0 ? (
                        <div className="h-auto p-2 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-4">
                            {packageItems?.map((item, index) => (
                              <div
                                className="shadow-color rounded-md p-2 relative bg-white"
                                key={index}
                              >
                                <div
                                  className="absolute -top-2 -right-2 cursor-pointer"
                                  onClick={() => handlePackageItemRemove(index)}
                                >
                                  <RxCross2
                                    size={20}
                                    className="text-red-500"
                                  />
                                </div>
                                <div className="h-[70px] w-[70px] m-auto">
                                  <Image
                                    width={100}
                                    height={100}
                                    alt="product"
                                    className="h-full w-full object-fill"
                                    src={`${ImageHostName}/storage/product/${item?.image}`}
                                  />
                                </div>
                                <div>
                                  <div className="text-black text-sm font-semibold">
                                    {item?.name}
                                  </div>
                                  <div className="text-black text-sm">
                                    Unit name :{" "}
                                    <span className="text-sm text-black">
                                      {item?.unit_name}
                                    </span>
                                  </div>
                                  <div className="text-black text-sm">
                                    Price :{" "}
                                    <span className="text-sm text-black">
                                      {item?.net_unit_price}
                                    </span>
                                  </div>
                                  <div className="text-black text-sm">
                                    Quantity :{" "}
                                    <span className="text-sm text-black">
                                      {item?.qty}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-4 relative" ref={searchRef}>
                      <div className="text-black">
                        Medicine search <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        placeholder={`search for something...`}
                        className={`h-10 w-[400px] xls:w-full xms:w-full xs:w-full text-black pl-4 bg-white placeholder:text-base outline-none rounded-lg placeholder-gray-400 transition-transform duration-500 border border-gray-300`}
                        type="text"
                        onChange={(event) => search(event.target.value)}
                      />
                      {searchData?.length ? (
                        <div className="bg-white w-full border border-gray-300 pb-4 sm:w-full mx-auto h-[400px] xls:w-[330px] xls:top-[70px] xms:top-[70px] xms:w-[310px] xs:w-[270px] absolute z-20  xs:top-[70px] overflow-y-auto">
                          {searchData?.map((item, index) => (
                            <div key={index}>
                              <div className="m-2 grid p-4 xls:p-2 xms:p-1 xs:p-1 grid-cols-12 items-center border-[1px] cursor-pointer w-full gap-4  hover:bg-gray-100">
                                <div className="w-[70px] h-[70px] relative mr-10 col-span-3">
                                  <Image
                                    alt=""
                                    fill
                                    src={`${ImageHostName}/storage/product/${item?.image}`}
                                  />
                                </div>

                                <div className="col-span-9">
                                  <div className="mr-10 text-black">
                                    {item?.name?.slice(0, 50)}
                                  </div>
                                  <div className="flex items-center xs:block  justify-between w-full space-x-4 ">
                                    <div className="w-full xs:px-3">
                                      <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg block w-full xls:w-full xms:w-full xs:w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black"
                                        defaultValue={selectIndex[item.id] || 0}
                                        value={selectIndex[item.id] || 0}
                                        onChange={(event) =>
                                          handleSearchChange(
                                            item,
                                            event.target.value,
                                            index,
                                            event.target.selectedIndex
                                          )
                                        }
                                      >
                                        {item?.product_units?.map(
                                          (optionItem, index) => (
                                            <option value={index} key={index}>
                                              {optionItem?.unit?.unit_name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                    <div className="flex items-center justify-center border border-gray-200 py-1 px-2 xs:mt-2 xs:px-2  rounded-xl  outline-none">
                                      <button
                                        className=" cursor-pointer"
                                        onClick={() => handleDecrement(item)}
                                      >
                                        <BiMinus
                                          size={15}
                                          color="#000"
                                          className="font-semibold"
                                        />
                                      </button>
                                      <input
                                        type="text"
                                        value={countValues[item.id] || 1}
                                        className=" w-[50px] text-center dark:bg-white text-black font-semibold focus:outline-none"
                                        readOnly
                                      />

                                      <button
                                        className="cursor-pointer"
                                        onClick={() => handleIncrement(item)}
                                      >
                                        <BsPlusLg
                                          size={15}
                                          color="#000"
                                          className="font-semibold"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() => handleAdd(item)}
                                    className="mt-2"
                                  >
                                    <button className="px-4 py-1 text-xs bg-deepBlue-800 text-white">
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-3">
                      <div className="text-base text-black">
                        Start Date <span style={{ color: "red" }}>*</span>
                      </div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-64 p-2 rounded-md border text-sm bg-white text-black focus:outline-none focus:border border-gray-300"
                        calendarClassName="border p-2 rounded-md shadow-md"
                      />
                    </div>
                    <div className="mt-3">
                      <div className="text-base text-black">
                        Delivery Date <span style={{ color: "red" }}>*</span>
                      </div>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-64 p-2 rounded-md border text-sm bg-white text-black focus:outline-none focus:border border-gray-300"
                        calendarClassName="border p-2 rounded-md shadow-md"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-base font-normal  py-2 text-black">
                        Auto order after days{" "}
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <input
                        className="border-[1px] h-[40px] w-[400px] xls:w-full xms:w-full xs:w-full pl-2 rounded-md outline-none bg-white text-black"
                        placeholder="Enter auto order after days..."
                        value={autoOrderDays}
                        onChange={(event) =>
                          setAutoOrderDays(event.target.value)
                        }
                      />

                      {loading ? (
                        <div className="flex mt-3 justify-start">
                          <LoadingSubmit />
                        </div>
                      ) : (
                        <div>
                          <button
                            className="px-4 py-1  rounded-md text-white bg-deepBlue-800 mt-5"
                            onClick={() => handleSubmit()}
                          >
                            Submit
                          </button>
                        </div>
                      )}
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

export default PackageEditModal;
