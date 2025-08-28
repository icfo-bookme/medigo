
import { useStatus } from "@/context/contextStatus";
import { ImageHostName } from "@/lib/config";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import Emptycart from "./Emptycart";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import request from "@/lib/request";
import Image from "next/image";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="w-60 flex mx-auto h-full items-center">Loading...</div>
});

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    cartItems,
    renderMe,
    setCartItems,
    setIsRenderMe,
    setPromoValue,
    setCouponId,
  } = useStatus();

  const [count, setCount] = useState(1);
  const wrapperRef = useRef(null);
  const router = useRouter();
  const [searchData, setSearchData] = useState([]);
  const [selectedValue, setSelectValue] = useState(null);
  const [countValues, setCountValues] = useState({});
  const [stock, setStock] = useState(null);
  const [selectIndex, setSelectIndex] = useState({});
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  const handleClick = () => {
    setIsCartOpen(false);
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setIsCartOpen(false);
  };

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  const handleCheckout = () => {
    if (cartItems?.length == 0) {
      setIsCartOpen(false);
    } else if (cartItems?.length > 0) {
      router.push(`/checkout`);
      setIsCartOpen(false);
    } else if (cartItems?.length == 0) {
      toast.error(`you must have to add atleast 1 product`);
    } else {
      router.push(`/checkout`);
      setIsCartOpen(false);
    }
  };

  const handleChange = (value, cartIndex) => {
    cartItems[cartIndex].id = Number(value);
    cartItems[cartIndex].price =
      cartItems[cartIndex]?.productUnit[value]?.discount == 0 ||
        cartItems[cartIndex]?.productUnit[value]?.discount == null
        ? Number(cartItems[cartIndex]?.productUnit[value]?.price).toFixed(2)
        : Number(
          cartItems[cartIndex]?.productUnit[value]?.price -
          (cartItems[cartIndex]?.productUnit[value]?.price *
            cartItems[cartIndex]?.productUnit[value]?.discount) /
          100
        );

    cartItems[cartIndex].mainprice = Number(
      cartItems[cartIndex]?.productUnit[value]?.price
    );

    cartItems[cartIndex].discount = Number(
      cartItems[cartIndex]?.productUnit[value]?.discount
    );

    cartItems[cartIndex].sale_unit_id = Number(
      cartItems[cartIndex]?.productUnit[value]?.unit?.id
    );

    cartItems[cartIndex].unitIndex = value;

    cartItems[cartIndex].unitName =
      cartItems[cartIndex]?.productUnit[value]?.unit?.unit_name;
    cartItems[cartIndex].stock =
      cartItems[cartIndex]?.productUnit[value]?.qty;
    cartItems[cartIndex].quantity = 1;
    setIsRenderMe(!renderMe);
  };

  const AddCart = (index) => {
    cartItems[index].quantity += count;
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
    setIsRenderMe(!renderMe);
  };

  const SubCart = (index) => {
    if (cartItems[index]?.quantity > 0) {
      cartItems[index].quantity -= count;
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
    }
    if (cartItems[index]?.quantity === 0) {
      cartItems?.splice(index, 1);
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

      toast.success(`product removed successfully`);
    }
    setIsRenderMe(!renderMe);
  };

  const DeleteItem = (index) => {
    cartItems?.splice(index, 1);
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

    toast.success(`product removed successfully`);
    setIsRenderMe(!renderMe);
  };

  const search = async (val) => {
    setSearchValue(val);
  };

  useEffect(() => {
    if (searchValue !== '') {
      const getData = async () => {
        const res = await request(`search/${searchValue}`);
        setSearchData(res?.data);
      };
      getData();
    } else {
      setSearchData([]);
    }
  }, [searchValue]);

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
      stock:
        selectedValue !== null
          ? selectedValue?.qty
          : item?.product_units[0]?.qty,
      quantity: countValues[item.id] || 1,
      productUnit: item?.product_units,
      generic_name: item?.generic?.generic_name,
      price:
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
      mainprice:
        selectedValue !== null
          ? selectedValue?.price
          : item?.product_units[0]?.price,
      unitName:
        selectedValue !== null
          ? selectedValue?.unit?.unit_name
          : item?.product_units[0]?.unit?.unit_name,
      image: item?.image,
      unitIndex: selectIndex[item.id],
      discount:
        selectedValue !== null
          ? selectedValue?.discount
          : item?.product_units[0]?.discount,
    };

    const is_exist = cartItems.find(
      (variation) => variation.product_id == item.id
    );

    if (is_exist) {
      const index = cartItems.findIndex(
        (variation) => variation.product_id == is_exist.product_id
      );

      cartItems[index].unitName =
        selectedValue !== null
          ? selectedValue?.unit?.unit_name
          : item?.product_units[0]?.unit?.unit_name;
      cartItems[index].id =
        selectedValue !== null
          ? selectedValue?.id
          : item?.product_units[0]?.id;
      (cartItems[index].stock =
        selectedValue !== null
          ? selectedValue?.qty
          : item?.product_units[0]?.qty),
        (cartItems[index].quantity = countValues[item.id] || 1);

      (cartItems[index].mainprice =
        selectedValue !== null
          ? selectedValue?.price
          : item?.product_units[0]?.price),
        (cartItems[index].price =
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
              ).toFixed(2));
      cartItems[index].sale_unit_id =
        selectedValue !== null
          ? selectedValue?.unit?.id
          : item?.product_units[0]?.unit?.id;
      cartItems[index].unitIndex = selectIndex[item.id];
      cartItems[index].discount =
        selectedValue !== null
          ? selectedValue?.discount
          : item?.product_units[0]?.discount;
      setCartItems(cartItems);
      setCookie(null, "ePharma", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setSelectValue(null);
      setSelectIndex({ [item.id]: 0 });
      setCountValues({ [item.id]: 0 });
      toast.success(`Product added successfully`);
    }

    if (is_exist === undefined) {
      setCartItems((cartItems) => [...cartItems, Obj]);
      setCookie(null, "ePharma", JSON.stringify(cartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
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
        setSearchValue('');
      }
    }

    // Only add event listener if we're in the browser
    if (typeof window !== 'undefined') {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const handleClearSearch = () => {
    setSearchData([]);
    setSearchValue("");
  };

  const handleInputChange = (value, index) => {
    cartItems[index].quantity = value;
    setCartItems(cartItems);
    setIsRenderMe(!renderMe);
  };

  const handleInputSearchChange = (item, value) => {
    setCountValues((prevCountValues) => ({
      ...prevCountValues,
      [item.id]: value,
    }));
  };

  return (
    <>
      <div
        className={`${
          isCartOpen
            ? "translate-x-[16px] duration-500 z-50 fixed top-[0px] bottom-0 bg-white w-[400px] xls:w-full xms:w-full xs:w-full right-[15px]  shadow-lg text-black"
            : "translate-x-[450px] duration-500 z-50 fixed top-[0px] bottom-0 bg-white w-[400px] xls:w-full xms:w-full xs:w-full  right-[15px] shadow-lg text-black"
        } `}
        ref={wrapperRef}
      >
        <div className="relative h-full top-[0px] left-0 right-0 bottom-0">
          <div className="z-40 bg-white">
            <div className="bg-myBlue-700 flex justify-between items-center py-5 px-4 border-b border-gray-200 absolute w-full top-0 h-[40px]">
              <p className="text-black flex justify-center font-semibold tracking-wider">
                {cartItems?.length} items
              </p>
              <div className="flex space-x-5">
                <div
                  className="flex space-x-2 items-center cursor-pointer"
                  onClick={() => handleDelete()}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
                        fill="#000"
                      ></path>
                    </svg>
                  </div>
                  <p className="font-light text-black">Clear all</p>
                </div>
                <div onClick={() => handleClick()} className="cursor-pointer">
                  <svg
                    className="fill-current text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pt-[40px]" ref={searchRef}>
              <input
                placeholder={`search for medicine...`}
                className={`h-10 w-full text-black pl-4 bg-white placeholder:text-base outline-none placeholder-gray-400 transition-transform duration-500 border border-gray-300`}
                type="text"
                onChange={(event) => search(event.target.value)}
                value={searchValue}
              />
              <div
                className="absolute top-[45px] right-[5px]"
                onClick={() => handleClearSearch()}
              >
                <svg
                  className="fill-current text-secondaryColor-500 h-6 w-6 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                </svg>
              </div>
              {searchData?.length ? (
                <div className="bg-white w-full border border-gray-300 pb-4 sm:w-full mx-auto h-[400px] absolute z-20  overflow-y-auto">
                  {searchData?.map((item, index) => (
                    <div key={index}>
                      <div className="m-2 grid p-4 grid-cols-12 items-center border-[1px] cursor-pointer w-full gap-4  hover:bg-gray-100">
                        <div className="w-[70px] h-[70px] relative mr-10 col-span-3">
                          <Image
                            alt="product"
                            height={70}
                            width={70}
                            src={`${ImageHostName}/storage/product/${item?.image}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/image/placeholder_600x.webp";
                            }}
                          />
                        </div>

                        <div className="col-span-9">
                          <div className="mr-10 text-black">
                            {item?.name?.slice(0, 50)}
                          </div>
                          <div className="flex items-center justify-between w-full space-x-4 ">
                            <div className="w-full">
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
                            <div className="flex items-center justify-center border border-gray-200 py-1 px-2  rounded-xl  outline-none">
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
                                onChange={(event) =>
                                  handleInputSearchChange(
                                    item,
                                    event.target.value
                                  )
                                }
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
          </div>

          {cartItems?.length > 0 ? (
            <div className="absolute overflow-y-auto w-full top-[70px] bottom-[125px]">
              <div className="mt-4 space-y-4">
                {cartItems?.map((data, index) => (
                  <div className="flex items-center space-x-4 px-2" key={index}>
                    <div className="h-20 w-20">
                      <Image
                        alt="product"
                        height={80}
                        width={80}
                        src={`${ImageHostName}/storage/product/${data?.image}`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/image/placeholder_600x.webp";
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div>
                          <Link href={`/product/${data?.slug}`}>
                            <p className="font-semibold text-sm hover:underline text-black">
                              {data?.name}
                            </p>
                          </Link>

                          <p className="pt-2 font-semibold tracking-wider text-deepBlue-800 text-sm">
                            {data?.generic_name}
                          </p>
                        </div>
                        <h2 className="font-semibold text-lg text-gray-400">
                          <p className="text-sm">
                            ৳ {Number(data?.price * data?.quantity).toFixed(2)}
                          </p>
                          {data?.discount == null ||
                            data?.discount == 0 ? null : (
                            <span className="text-sm line-through text-gray-400">
                              ৳{" "}
                              {Number(data?.mainprice * data?.quantity).toFixed(
                                2
                              )}
                            </span>
                          )}
                        </h2>
                      </div>
                      <div className="flex space-x-3 mt-2 w-full">
                        <div>
                          <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-black text-sm rounded-lg  block w-[120px] p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400"
                            value={data?.unitIndex}
                            defaultValue={data?.unitIndex}
                            onChange={(event) =>
                              handleChange(event.target.value, index)
                            }
                          >
                            {data?.productUnit?.map((item, index) => (
                              <option value={index} key={index}>
                                {item?.unit?.unit_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center justify-center border border-gray-200 py-1 px-2  rounded-xl  outline-none">
                          <button
                            className="cursor-pointer"
                            onClick={() => SubCart(index)}
                          >
                            <BiMinus
                              size={15}
                              color="#000"
                              className="font-semibold"
                            />
                          </button>

                          <button>
                            <input
                              value={data?.quantity}
                              style={{ outline: "none" }}
                              className=" w-[50px] text-center dark:bg-white text-black font-semibold focus:outline-none"
                              onChange={(event) =>
                                handleInputChange(event.target.value, index)
                              }
                            />
                          </button>

                          <button
                            className=" cursor-pointer"
                            onClick={() => AddCart(index)}
                          >
                            <BsPlusLg
                              size={15}
                              color="#000"
                              className="font-semibold"
                            />
                          </button>
                        </div>
                        <div
                          className="w-full flex justify-end cursor-pointer"
                          onClick={() => DeleteItem(index)}
                        >
                          <svg
                            className="fill-current text-red-500 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-60 flex mx-auto h-full items-center">
              <Lottie loop={true} animationData={Emptycart} />
            </div>
          )}
          <div className="absolute h-[120px] bottom-0 left-0 w-full bg-white border-t border-gray-300 p-2">
            <div className="flex justify-between ">
              <p className="text-black text-center tracking-wider font-semibold text-lg">
                Subtotal:
              </p>
              <p className="text-black font-semibold">
                ৳{" "}
                {Number(
                  cartItems?.reduce(
                    (a, b) =>
                      a +
                      (b?.price
                        ? b?.price * b?.quantity
                        : b?.price * b?.quantity),
                    0
                  )
                ).toFixed(2)}
              </p>
            </div>
            <p
              className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-center py-3 text-white font-semibold tracking-wider cursor-pointer rounded-lg mt-5"
              onClick={() => handleCheckout()}
            >
              Procced to checkout
            </p>
          </div>
        </div>
      </div>

      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default Cart;