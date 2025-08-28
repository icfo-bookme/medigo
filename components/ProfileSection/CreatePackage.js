import { useStatus } from '@/context/contextStatus';
import hostname, { ImageHostName } from '@/lib/config';
import postRequest from '@/lib/postRequest';
import request from '@/lib/request';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import LoadingSubmit from '../common/LoadingSubmit';

const CreatePackage = () => {

    const {token,cartItems,setStep} = useStatus();

     const [searchData,setSearchData] = useState([]);

     const [packageItems, setPackageItems] = useState([]);

     const [selectedValue,setSelectValue] = useState(null);

    const [countValues, setCountValues] = useState({});

     const [stock, setStock] = useState(null);

     const [selectIndex,setSelectIndex] = useState({});

      const searchRef = useRef(null);

      const [packageName,setPackageName] = useState(null); 

      const [startDate, setStartDate] = useState('');

      const [endDate,setEndDate] = useState('');

      const [autoOrderDays,setAutoOrderDays] = useState(null);

      const [totalDiscount, setTotalDiscount] = useState(0);

      const [grandTotal,setGrandTotal] = useState(0); 

      const [loading,setLoading] = useState(false);

     const search = async (val) => {

      if(val){
        if (token) {
          const getData = async () => {
            const res = await request(`search/${val}`);

            setSearchData(res?.data);
          };
          getData();
        } 

      } else {
          setSearchData([])
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




     const  handleAdd =(item) =>{
      
     
   
        
             
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
                quantity: countValues[item.id] || 1,
                net_unit_price:
                  selectedValue !== null
                    ? selectedValue?.discount == 0 ||
                      selectedValue?.discount == null
                      ? selectedValue?.price
                      : Number(
                          selectedValue?.price -
                            (selectedValue?.price * selectedValue?.discount) /
                              100
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
                    ? Number(
                        (selectedValue?.price * selectedValue?.discount) / 100
                      )
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
                stock:
                  selectedValue !== null
                    ? selectedValue?.quantity
                    : item?.product_units[0]?.quantity,
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
                  packageItems[index].quantity = countValues[item.id] || 1;
                  packageItems[index].stock =
                    selectedValue !== null
                      ? selectedValue?.qty
                      : item?.product_units[0]?.qty,
                    packageItems[index].net_unit_price =
                      selectedValue !== null
                        ? selectedValue?.discount == 0 ||
                          selectedValue?.discount == null
                          ? selectedValue?.price
                          : Number(
                              selectedValue?.price -
                                (selectedValue?.price *
                                  selectedValue?.discount) /
                                  100
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
                  
                    packageItems[index].discount_rate = selectedValue !== null
                    ? Number(
                        (selectedValue?.price * selectedValue?.discount) / 100
                      )
                    : Number(
                        (item?.product_units[0]?.price *
                          item?.product_units[0]?.discount) /
                          100
                      );
                  setPackageItems(packageItems);
                setSelectValue(null);
                setSelectIndex({ [item.id]: 0 });
                setCountValues({ [item.id]: 0 });
                toast.success(`Product added successfully`);
                
              }

              if (is_exist === undefined) {
                setPackageItems((packageItems) => [...packageItems, Obj]);
                setSelectValue(
                  null
                ); 
                 setSelectIndex({ [item.id]: 0 });
                 setCountValues({[item.id] :0});
                 toast.success(`Product added successfully`);
              }

            }

          
    

    
    
      const handleIncrement = (item) => {
          
          if(Object.keys(selectIndex).length > 0){

           
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


      const handlePackageItemRemove = (index) => {
        const list = [...packageItems];
        list.splice(index, 1);
        setPackageItems(list);
      };

   
    useEffect(() => {
      if(packageItems?.length > 0){
         let totalDiscount = packageItems?.reduce(
           (a, b) => a + (b?.discount ? b?.discount : b?.discount),
           0
         );

         let totalGrandTotal = packageItems?.reduce(
           (a, b) => a + (Number(b?.net_unit_price) * Number(b?.qty)),
           0
         );

         setGrandTotal(Number(totalGrandTotal).toFixed(2));
         setTotalDiscount(Number(totalDiscount).toFixed(2));

      } else {
          setGrandTotal(0);
          setTotalDiscount(0);
      }
     
      
    }, [packageItems]);

      const handleSubmit = async () =>{
        
          let validate = false;

          if (packageName == null || packageName == undefined) {
            validate = true;
            toast.error("Package name is required");
            return;
          }

          if(packageItems?.length == 0 ){
             validate = true;
             toast.error("You must add at least on product in a package");
             return;
          }
          
          
          if (startDate == '' ) {
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
              qty: item?.quantity,
              net_unit_price: Number(item?.net_unit_price),
              sale_unit_id: item?.sale_unit_id,
              discount: item?.discount,
              discount_rate: item?.discount_rate,
              total: Number(item?.net_unit_price) * Number(item?.quantity),
            });
          });

          let res = await postRequest(`package-order/store-or-update`, {
            name: packageName,
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
            setStep("packageList");
            setLoading(false);
          } else {
            toast.error(`${res?.message}`);
            setLoading(false);
          }
          
         }
         
        
         

      }

    
      


  

  return (
    <div className="bg-white p-3 rounded-md min-h-[700px]">
      <div className="flex space-x-2 items-center">
        <svg
          className="h-6 w-6 text-myColor-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
        <h1 className="font-semibold text-2xl">
          <span className="text-myColor-500">Create package</span>{" "}
        </h1>
      </div>
      <div className="p-3 rounded-md">
        <div className="w-full">
          <p className="text-lg font-normal  py-2 text-black">
            Package name <span style={{ color: "red" }}>*</span>
          </p>
          <input
            className="border-[1px] h-[40px] w-[400px] xls:w-full xms:w-full xs:w-full pl-2 rounded-md outline-none bg-white text-black"
            placeholder="Enter package name..."
            onChange={(event) => setPackageName(event.target.value)}
          />
        </div>
        <div className="xxl:hidden xl:hidden block mt-2">
          {packageItems?.length > 0 ? (
            <div className="h-auto p-2 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {packageItems?.map((item, index) => (
                  <div
                    className="shadow-color rounded-md p-2 relative"
                    key={index}
                  >
                    <div
                      className="absolute -top-2 -right-2 cursor-pointer"
                      onClick={() => handlePackageItemRemove(index)}
                    >
                      <RxCross2 size={20} className="text-red-500" />
                    </div>
                    <div className="h-[70px] w-[70px] m-auto">
                      <Image
                       height={70}
                       width={70}
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
                        <span className="text-sm text-black">{item?.qty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex lg:block md:block sm:block xls:block xms:block xs:block space-x-2">
          <div>
            <div className="mt-4 relative" ref={searchRef}>
              <div className="text-black">
                Medicine search <span style={{ color: "red" }}>*</span>
              </div>
              <input
                placeholder={`search for something...`}
                className={`h-10 w-[600px] lg:w-[600px] md:w-[400px] xls:w-full xms:w-full xs:w-full text-black pl-4 bg-white placeholder:text-base outline-none rounded-lg placeholder-gray-400 transition-transform duration-500 border border-gray-300`}
                type="text"
                onChange={(event) => search(event.target.value)}
              />
              {searchData?.length ? (
                <div className="bg-white w-[600px] border border-gray-300 pb-4 sm:w-full mx-auto h-[400px] xls:w-[330px] xls:top-[70px] xms:top-[70px] xms:w-[310px] xs:w-[270px] absolute z-20  xs:top-[70px] overflow-y-auto">
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
                          <div onClick={() => handleAdd(item)} className="mt-2">
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
                placeholderText={"Please select a  start date"}
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
                placeholderText={"Please select a  delivery date"}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-64 p-2 rounded-md border text-sm bg-white text-black focus:outline-none focus:border border-gray-300"
                calendarClassName="border p-2 rounded-md shadow-md"
              />
            </div>

            <div className="w-full">
              <p className="text-base font-normal  py-2 text-black">
                Auto order after days <span style={{ color: "red" }}>*</span>
              </p>
              <input
                className="border-[1px] h-[40px] w-[400px] xls:w-full xms:w-full xs:w-full pl-2 rounded-md outline-none bg-white text-black"
                placeholder="Enter auto order after days..."
                onChange={(event) => setAutoOrderDays(event.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex justify-start mt-4">
                <LoadingSubmit />
              </div>
            ) : (
              <div className="mt-4 flex justify-start">
                <button
                  className="px-4 py-1  rounded-md text-white bg-deepBlue-800 "
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          <div className="hidden xxl:block xl:block">
            {packageItems?.length > 0 ? (
              <div className="h-[500px] p-2 overflow-y-auto">
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
                        <RxCross2 size={20} className="text-red-500" />
                      </div>
                      <div className="h-[70px] w-[70px] m-auto">
                        <Image
                         height={70}
                         width={70}
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
                            {item?.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePackage