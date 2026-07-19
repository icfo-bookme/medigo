import hostname, { ImageHostName } from '@/lib/config';
import { useState } from 'react';

import { AiFillPlusCircle } from "react-icons/ai"

import { useStatus } from '@/context/contextStatus';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { BsPlusLg } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { TbTrash } from "react-icons/tb";
import { useRef } from 'react';
import { useEffect } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import { toast } from 'react-toastify';


const ProductCard = ({ item, index, products }) => {


  const {
    cartItems,
    setCartItems,
    setIsRenderMe,
    renderMe,
    setPromoValue,
    setCouponId,
  } = useStatus();

  const router = useRouter();

  const [isOptimizedImage, setIsOptimizedImage] = useState(true);

  const [buttonModal, setButtonModal] = useState(false);

  const [cartQuantity, setCartQuantity] = useState(1)

  const containerRef = useRef(null);



  const handleClick = (slug) => {

    router.push(`/product/${slug}`);

  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setButtonModal(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleCart = (index) => {



    setButtonModal((prev) => !prev);
    let obj = {
      id: item?.product_units[0]?.id,
      product_id: item?.id,
      name: item?.name,
      image: item?.image,
      generic_name: item?.generic?.generic_name,
      quantity: 1,
      price:
        item?.product_units[0]?.discount == 0 ||
          item?.product_units[0]?.discount == null
          ? item?.product_units[0]?.price
          : Number(
            item?.product_units[0]?.price -
            (item?.product_units[0]?.price *
              item?.product_units[0]?.discount) /
            100
          ).toFixed(2),
      stock: item?.product_units[0]?.qty,
      productUnit: item?.product_units,
      unitName: item?.product_units[0]?.unit?.unit_name,
      slug: item?.slug,
      mainprice: item?.product_units[0]?.price,
      discount: Number(item?.product_units[0]?.discount),
      sale_unit_id: item?.product_units[0]?.unit?.id,
    };

    const is_exist = cartItems.find(
      (variation) => variation.product_id == obj.product_id
    );



    if (is_exist === undefined) {
      setCartItems((cartItems) => [...cartItems, obj]);
      setCookie(null, "ePharma", JSON.stringify([...cartItems, obj]), {
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


  const handleDecrement = () => {
    setCartQuantity((prev) => {

      const newQuantity = prev > 1 ? prev - 1 : 1;

      const index = cartItems.findIndex(
        (variation) => variation.product_id === item?.id
      );

      const updatedCartItems = cartItems.map((cartItem, idx) => {
        if (idx === index) {
          return {
            ...cartItem,
            quantity: newQuantity,
          };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);

      setCookie(null, "ePharma", JSON.stringify(updatedCartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return newQuantity;
    });
  };



  const handleIncrement = () => {
    setCartQuantity((prev) => {
      const newQuantity = prev + 1;

      const index = cartItems.findIndex(
        (variation) => variation.product_id === item?.id
      );

      const updatedCartItems = cartItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCartItems(updatedCartItems);

      setCookie(null, "ePharma", JSON.stringify(updatedCartItems), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return newQuantity;
    });
  };


  const handleInput = (value) => {

    const numericValue = Number(value);


    const finalValue = Number.isNaN(numericValue) ? 0 : numericValue;

    setCartQuantity(finalValue);

    const index = cartItems.findIndex(
      (variation) => variation.product_id === item?.id
    );

    const updatedCartItems = cartItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, quantity: value };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    setCookie(null, "ePharma", JSON.stringify(updatedCartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    // }


  }



  const handleDelete = () => {


    const index = cartItems.findIndex(
      (variation) => variation.product_id === item?.id
    );


    const updatedCartItems = cartItems.filter((_, idx) => idx !== index);


    setCartItems(updatedCartItems);


    setCookie(null, "ePharma", JSON.stringify(updatedCartItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    setButtonModal(false);


  };

  return (
    <>
      <div className="cursor-pointer">
        <div className=" group rounded-md items-center justify-center card-shadow  font-body border border-gray-200">
          <div className="relative">
            <div className=" h-[200px]  p-3 xs:h-auto xms:h-[180px]  rounded-md  relative">
              {item.yt_video ? (
                <div className="relative w-full h-36 p-0 rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${item.yt_video.split("v=")[1]}?autoplay=1&mute=1&controls=1`}
                    title="YouTube video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Image
                  src={
                    isOptimizedImage
                      ? `${ImageHostName}/storage/product/${item?.image}`
                      : "/image/placeholder_600x.webp"
                  }
                  className="h-full w-full object-contain group-hover:scale-110 ease-in-out duration-500"
                  height={500}
                  width={500}
                  priority
                  onClick={() => handleClick(item?.slug)}
                  unoptimized={!isOptimizedImage}
                  onError={() => setIsOptimizedImage(false)}
                  alt="product"
                />
              )}
              {buttonModal ? (
                <div
                  ref={containerRef}
                  className={`absolute bottom-2 right-3  ${buttonModal ? "w-[100px]" : "w-0"
                    } overflow-hidden flex items-center justify-center bg-white border border-gray-200 py-1 px-2 rounded-full outline-none`}
                >
                  {cartItems[
                    cartItems.findIndex(
                      (variation) => variation.product_id === item?.id
                    )
                  ]?.quantity > 1 ? (
                    <button onClick={() => handleDecrement()}>
                      <BiMinus
                        size={15}
                        color="#000"
                        className="font-semibold"
                      />
                    </button>
                  ) : (
                    <button onClick={() => handleDelete()}>
                      <TbTrash
                        size={20}
                        color="#000"
                        className="font-semibold"
                      />
                    </button>
                  )}

                  <input
                    type="text"
                    value={

                      cartQuantity
                    }
                    className="w-full text-center bg-white text-black font-semibold outline-none"
                    onChange={(e) => {
                      const value = e.target.value;


                      handleInput(Number(value))


                    }}
                  />
                  <button onClick={() => handleIncrement(index)}>
                    <BsPlusLg
                      size={15}
                      color="#000"
                      className="font-semibold"
                    />
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className="absolute bottom-2 right-3"
                    onClick={() => handleCart()}
                  >
                    {cartItems[
                      cartItems.findIndex(
                        (variation) => variation.product_id === item?.id
                      )
                    ]?.quantity > 1 ? (
                      <div className="bg-gray-600 text-white rounded-full h-[25px] w-[25px] flex justify-center items-center text-sm">
                        {" "}
                        {
                          cartItems[
                            cartItems.findIndex(
                              (variation) => variation.product_id === item?.id
                            )
                          ].quantity
                        }
                      </div>
                    ) : (
                      <AiFillPlusCircle
                        size={25}
                        className="text-deepBlue-800 cursor-pointer"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <div
              className="p-2"
              onClick={() => handleClick(item?.slug, index, item?.id)}
            >
              <p className="text-sm  font-semibold text-gray-700 pb-2 text-left h-[42px]">
                <span className="line-clamp-2">{item?.name}</span>
              </p>

              <p
                className="text-gray-700 font-semibold text-sm tracking-wider pb-2 text-left h-[25px]"
                onClick={() => handleClick(item?.slug, index, item?.id)}
              >
                <span className="line-clamp-1">
                  {item?.generic?.generic_name}
                </span>{" "}
              </p>

              <p
                className="text-gray-600 font-semibold text-xs  text-left pb-2 "
                onClick={() => handleClick(item?.slug, index, item?.id)}
              >
                <span className="line-clamp-1">{item?.company?.name}</span>
              </p>

              <div className=" px-1 pt-2 h-[50px]">
                {item?.product_units[0]?.discount == null ||
                  Number(item?.product_units[0]?.discount) == 0 ? null : (
                  <p className="text-sm  text-gray-400 font-semibold line-through">
                    ৳ {Number(item?.product_units[0]?.price).toFixed(2)}
                  </p>
                )}
                <div className="flex space-x-2 items-center">
                  {item?.product_units[0]?.discount !== null ? (
                    <p className="text-base xms:text-sm xs:text-xs  text-gray-700 font-semibold">
                      ৳{" "}
                      {Number(
                        item?.product_units[0]?.price -
                        (item?.product_units[0]?.price *
                          item?.product_units[0]?.discount) /
                        100
                      ).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-base xms:text-sm xs:text-xs  text-gray-700 font-semibold">
                      {" "}
                      {Number(item?.product_units[0]?.price).toFixed(2)}
                    </p>
                  )}
                  {item?.product_units[0]?.discount == null ||
                    Number(item?.product_units[0]?.discount) == 0 ? null : (
                    <div>
                      <button className="text-base xms:text-sm xs:text-xs  font-semibold rounded-md text-red-400">
                        ({item?.product_units[0]?.discount}% )
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard