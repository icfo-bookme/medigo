
import { useStatus } from "@/context/contextStatus";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";

const DetailSection = ({data}) => {

 


  const {
    cartItems,
    setCartItems,
    setIsRenderMe,
    renderMe,
    setPromoValue,
    setCouponId,
  } = useStatus();




  const [count,setCount] = useState(1);


  const [price,setPrice] = useState(null);

  const [stock, setStock] = useState(null);

  const [proId, setProId] = useState(null);

  const [productUnit,setProductUnit] = useState({});

  const [unitName, setUnitName] = useState('');

  const [disCount, setDisCount] = useState(null);

  const [slug,setSlug] = useState('');

  const [prodUnitId,setProdUnitId] = useState(null);

  const [unitIndex,setUnitIndex] = useState(null);

   const [isEditable, setIsEditable] = useState(false);


  
  useEffect(()=>{
    if(data){
      setProductUnit(data?.product_units);
      setDisCount(Number(data?.product_units[0]?.discount));
      setSlug(data?.slug);
      setUnitName(data?.product_units[0]?.unit?.unit_name);
      setProId(data?.product_units[0]?.id);
      setStock(data?.product_units[0]?.qty);
      setPrice(data?.product_units[0]?.price);
      setProdUnitId(data?.product_units[0]?.unit?.id);
      setUnitIndex(0);
    }

  },[data])

 
  
  const handleChange = (value) =>{
 
      setPrice(data?.product_units[value]?.price);
      setStock(data?.product_units[value]?.qty);
      setProId(data?.product_units[value]?.id);
      setUnitName(data?.product_units[value]?.unit?.unit_name);
      setDisCount(Number(data?.product_units[value]?.discount));
      setProdUnitId(data?.product_units[value]?.unit?.id);
      setUnitIndex(value);
  }
  
  // console.log("disCount.....", disCount);

   
  const handleCart = () => {
    if(count == 0){
       toast.error('minimum 1 value needed');
    } else {

      let item = {
          id: proId,
          product_id: data?.id,
          name: data?.name,
          image: data?.image,
          generic_name: data?.generic?.generic_name,
          quantity: count,
          price:
            disCount == 0 || disCount == null
              ? price
              : Number(price - (price * disCount) / 100).toFixed(2),
          stock: stock,
          productUnit: productUnit,
          unitName: unitName,
          slug: slug,
          mainprice: price,
          discount: disCount,
          sale_unit_id: prodUnitId,
          unitIndex: unitIndex,
        };

        const is_exist = cartItems.find(
          (variation) => variation.product_id == item.product_id
        );

       

        if (is_exist) {
          const index = cartItems.findIndex(
            (variation) => variation.product_id == is_exist.product_id
          );

          
          
            cartItems[index].id = proId;
            cartItems[index].quantity = count;
            cartItems[index].unitName = unitName;
            cartItems[index].mainprice = price;
            cartItems[index].sale_unit_id = prodUnitId;
            cartItems[index].unitIndex = unitIndex;
            cartItems[index].price =
                disCount == 0 || disCount == null
                  ? price
                  : Number(price - (price * disCount) / 100).toFixed(2);
            cartItems[index].discount = disCount;
            setCartItems(cartItems);
            setCookie(null, "ePharma", JSON.stringify(cartItems), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
             setPromoValue(null);
             destroyCookie(null, "promovalue", {
               path: "/",
             });
             setCouponId("");
             destroyCookie(null, "couponid", {
               path: "/",
             });
             setIsRenderMe(!renderMe)
            toast.success("Product Added");
            
        }

        if (is_exist === undefined) {
          setCartItems((cartItems) => [...cartItems, item]);
          setCookie(null, "ePharma", JSON.stringify([...cartItems, item]), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
           setPromoValue(null);
           destroyCookie(null, "promovalue", {
             path: "/",
           });
           setCouponId("");
           destroyCookie(null, "couponid", {
             path: "/",
           });
          
          setIsRenderMe(!renderMe);
      
          toast.success("Product Added");
        }

    }
      
      };

      

     
        const handleDoubleClick = () => {
          // Enable input editing when double-clicked
          setIsEditable(true);
        };

        const handleInputChange = (value) =>{
          

              setCount(value);
          
        }

        

  
 
 
  return (
    <div className="xls:col-span-full xms:col-span-full xs:col-span-full">
      <p className="font-semibold text-xl text-black">{data?.name}</p>
      {/* <p className="font-semibold text-gray-400 text-base">
        Capsule
      </p> */}
      <p className="mt-2">
        <span className="font-semibold text-black">Generics:</span>{" "}
        <span className="text-sm font-semibold text-deepBlue-800">
          {data?.generic?.generic_name}
        </span>
      </p>
      <p className="text-lg font-semibold text-black xls:text-sm xms:text-sm xs:text-sm">
        {data?.company?.name}
      </p>

      {disCount == 0 || disCount == null ? null : (
        <div className="flex items-center space-x-3 mt-4">
          <p className="line-through text-lg space-x-1 text-black">
            <span className="uppercase">MRP</span>
            <span>
              ৳{" "}
              <span className="text-base text-black">
                {Number(price).toFixed(2)}
              </span>
            </span>
          </p>
          <span className="text-sm text-blue-400">{disCount}% off</span>
        </div>
      )}

      <div className="flex space-x-3 mt-4">
        <p className="text-gray-500 font-semibold dark:text-gray-800">
          Best price:
        </p>
        <p className="text-lg dark:text-black">
          ৳{" "}
          <span className="text-xl">
            {" "}
            {Number(price - (price * disCount) / 100).toFixed(2)}
          </span>{" "}
          / <span className="text-sm text-gray-500">{unitName}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 gap-7 mt-5">
        <div>
          <select
            className="bg-gray-50 border-2 border-deepBlue-800 text-gray-900 outline-none text-sm rounded-lg block w-2/4 xls:w-full xms:w-full xs:w-full p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black"
            onChange={(event) => handleChange(event.target.value)}
          >
            {data?.product_units?.map((item, index) => (
              <option value={index} key={index}>
                {item?.unit?.unit_name}
              </option>
            ))}
          </select>
        </div>

       
          <div className="w-[200px] flex items-center justify-center border border-gray-200 py-1 px-2  rounded-xl  outline-none">
            <button
              className=" cursor-pointer"
              onClick={() => setCount(count > 1 ? count - 1 : 1)}
            >
              <BiMinus size={15} color="#000" className="font-semibold" />
            </button>

            <button onDoubleClick={handleDoubleClick}>
              <input
                type="text"
                value={count}
              
                className="w-[100px] text-center dark:bg-white text-black font-semibold focus:outline-none"
                onChange={(event) => handleInputChange(event.target.value)}
                
              />
            </button>

            <button
              className=" cursor-pointer"
              onClick={() =>
              
                  setCount((c) => c + 1)
                  
              }
            >
              <BsPlusLg size={15} color="#000" className="font-semibold" />
            </button>
          </div>
       

       
          {/* <p className="text-black">
            {" "}
            <span className="font-semibold">{stock}</span> products available
          </p> */}
    
       
      </div>
      <div className="my-4">
       
          <button
            className="px-7 py-2 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white rounded-full font-semibold text-sm"
            onClick={() => handleCart()}
          >
            Add to cart
          </button>
       
      </div>
    </div>
  );
}

export default DetailSection

