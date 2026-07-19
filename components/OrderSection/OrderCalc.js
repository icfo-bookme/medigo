import { useStatus } from '@/context/contextStatus';
import hostname, { ImageHostName } from '@/lib/config';
import postRequest from '@/lib/postRequest';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TiDeleteOutline } from "react-icons/ti";
import LoadingSubmit from '../common/LoadingSubmit';
import request from '@/lib/request';
import RedemComponent from '../RedemComponent';
import Image from 'next/image';

const OrderCalc = ({
  selectedAddress,
  optionalAddress,
  address,
  customerPoint,
}) => {
  const {
    setCartItems,
    cartItems,
    renderMe,
    type,
    setType,
    promoValue,
    setPromoValue,
    userId,
    couponId,
    setCouponId,
    setIsRenderMe,
    name,
    phone,
    couponlimit,
    setCouponlimit,
    token,
  } = useStatus();

  const [promo, setPromo] = useState(null);

  const [total, setTotal] = useState(0);

  const [totalQty, setTotalQty] = useState(0);

  const router = useRouter();

  const [totalDiscount, setTotalDiscount] = useState(null);

  const [totaldiscountRate, setDiscountRate] = useState(null);

  const [loading, setLoading] = useState(false);

  const [deliveryData, setDeliveryData] = useState([]);

  const [deliveryValue, setDeliveryValue] = useState();

  const [pointsToCurrency, setPointsToCurrency] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);

  const [prevGrandTotal, setPrevGrandTotal] = useState(0);

  const [points, setPoints] = useState("");

  const [minUsedPoints, setMinUsedPoints] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [progressDuration, setProgressDuration] = useState(5);
  const [orderTimeout, setOrderTimeout] = useState(null);

  useEffect(() => {
    setCartItems(cartItems);
  }, [renderMe]);

  useEffect(() => {
    let dd = cartItems?.reduce(
      (a, b) =>
        a + (b?.price ? b?.price * b?.quantity : b?.price * b?.quantity),
      0
    );

    setTotal(Number(dd));
  }, [renderMe]);

  const handleChange = (value) => {
    setPromo(value);
  };

  const handlePromo = async () => {
    let res = await postRequest(`coupon-code-check`, {
      coupon_code: promo,
      customer_id: userId ? Number(userId) : null,
      products: idArr,
    });

    if (res?.success) {
      toast.success(`${res?.message}`);

      setType(res?.data?.type);
      setCookie(null, "type", res?.data?.type, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setPromoValue(res?.data?.value);
      setCookie(null, "promovalue", res?.data?.value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCouponId(res?.data?.id);
      setCookie(null, "couponid", res?.data?.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCouponlimit(res?.data?.coupon_value_limit);
      setCookie(null, "coupon_value_limit", res?.data?.coupon_value_limit, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } else {
      toast.error(`${res?.message}`);
    }
  };

  //  console.log("customerPoint...", customerPoint);

  useEffect(() => {
    let totalQuantity = cartItems?.reduce(
      (a, b) => a + (b?.quantity ? b?.quantity : b?.quantity),
      0
    );
    let totalDiscount = cartItems?.reduce(
      (a, b) => a + (b?.discount ? b?.discount : b?.discount),
      0
    );
    let totaldiscountrate = cartItems?.reduce(
      (a, b) => a + (b?.discount * b?.mainprice) / 100,
      0
    );

    setTotalQty(Number(totalQuantity));
    setTotalDiscount(Number(totalDiscount));
    setDiscountRate(Number(totaldiscountrate));
  }, []);

  let arr = [];
  let idArr = [];

  cartItems?.map((item, index) => {
    arr.push({
      id: Number(item?.id),
      product_id: Number(item?.product_id),
      qty: Number(item?.quantity),
      sale_unit_id: Number(item?.sale_unit_id),
      net_unit_price: Number(item?.price),
      discount: Number(item?.discount),
      discount_rate: Number((item?.mainprice * item?.discount) / 100),
      total: Number(item?.price) * Number(item?.quantity),
    });
    idArr.push({
      id: Number(item?.product_id),
    });
  });

  const handleCouponDelete = () => {
    setType(null);

    destroyCookie(null, "type", {
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

    setCouponlimit("");
    destroyCookie(null, "coupon_value_limit", {
      path: "/",
    });

    toast.success("Coupon successfully Deleted!");
  };



  useEffect(() => {
    if (type == 1) {
      setGrandTotal(
        Math.round(
          Number(total) -
          Number(couponlimit) +
          Number(deliveryValue) -
          pointsToCurrency
        )
      );

      setPrevGrandTotal(
        Math.round(Number(total) - Number(couponlimit) + Number(deliveryValue))
      );
    } else if (type == 2) {
      if (
        couponlimit < Math.round((Number(total) * Number(promoValue)) / 100)
      ) {
        setGrandTotal(
          Math.round(
            Number(total) -
            Number(couponlimit) +
            Number(deliveryValue) -
            pointsToCurrency
          )
        );

        setPrevGrandTotal(
          Math.round(
            Number(total) - Number(couponlimit) + Number(deliveryValue)
          )
        );
      } else {
        setGrandTotal(
          Number(
            Number(total) -
            (Number(total) * Number(promoValue)) / 100 +
            Number(deliveryValue) -
            pointsToCurrency
          )
        );

        setPrevGrandTotal(
          Number(
            Number(total) -
            (Number(total) * Number(promoValue)) / 100 +
            Number(deliveryValue)
          )
        );
      }
    } else {
      setGrandTotal(
        Math.round(Number(total) + Number(deliveryValue) - pointsToCurrency)
      );
      setPrevGrandTotal(Math.round(Number(total) + Number(deliveryValue)));
    }
  }, [type, deliveryValue, total, couponlimit, promoValue, pointsToCurrency]);

  const startOrderProcess = () => {
    const baseTime = cartItems?.length > 7 ? 7 : 5;
    setShowModal(true);
    setCountdown(baseTime);
    setProgressDuration(baseTime);

    let seconds = baseTime;

    const interval = setInterval(() => {
      seconds--;

      setCountdown(seconds);
    }, 1000);

    const timeout = setTimeout(async () => {
      clearInterval(interval);
      setShowModal(false);
      await handleOrder();
    }, baseTime * 1000);

    setOrderTimeout({
      timeout,
      interval,
    });
  };


  const handleOrder = async () => {
    let validation = false;

    if (cartItems?.length == 0) {
      validation = true;
      toast.error("you must have to add atleast 1 product");
      return;
    }

    if (!token || (token && !address)) {
      if (selectedAddress == "") {
        validation = true;
        toast.error("please select any address");
        return;
      }
    }

    if (name == "" || name == undefined) {
      toast.error("name is required");
      return;
    }

    if (phone == "" || phone == undefined) {
      toast.error("Phone number is required");
      return;
    }

    setLoading(true);
    let uniqueId = (Math.random() + 1).toString(36).substr(2, 6);

    let obj = {
      invoice_no: uniqueId,
      customer_id: userId ? Number(userId) : null,
      item: Number(cartItems?.length),
      total_qty: Number(totalQty),
      total_discount: Number(totalDiscount),
      total_discount_amount: Number(totaldiscountRate),
      shipping_cost: Number(deliveryValue),
      net_total: Math.round(total),
      name: name,
      phone: phone,
      grand_total: grandTotal,
      prev_grand_total: token ? prevGrandTotal : null,
      redeem_points_used:
        token && pointsToCurrency !== 0 ? Number(minUsedPoints) : null,
      coupon_discount_value:
        couponlimit < promoValue ? Number(couponlimit) : Number(promoValue),
      sale_date: dayjs(new Date()).format("YYYY-MM-DD"),
      coupon_id: couponId ? Number(couponId) : null,
      information: !token || (token && !address) ? selectedAddress : address,
      optional_information: optionalAddress ? optionalAddress : "",
      s_product: arr,
    };

    let res = await postRequest(`checkout`, obj);

    if (res?.success) {
      destroyCookie([], "ePharma", {
        path: "/",
      });
      setCartItems([]);
      setType(null);

      destroyCookie(null, "type", {
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
      setPoints("");
      setMinUsedPoints(0);
      setIsRenderMe(!renderMe);
      router.push(`/payment-successful`);
      toast.success(`${res?.message}`);
      setLoading(false);
    } else {
      toast.error(`${res?.message}`);
      setLoading(false);
    }
  };

  const cancelOrder = () => {
    if (orderTimeout) {
      clearTimeout(orderTimeout.timeout);
      clearInterval(orderTimeout.interval);
    }

    setShowModal(false);
    setCountdown(5);

    toast.info("Order cancelled");
  };
  useEffect(() => {
    const getData = async () => {
      let res = await request(`delivery-charge`);

      setDeliveryData(res?.data);
      // setShippingOption(res?.data[0]?.name)
      setDeliveryValue(res?.data[0]?.value);
    };
    getData();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .progress-animate {
          animation: progressFill ${progressDuration}s linear forwards;
        }
      `}</style>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[450px] max-h-[80vh] flex flex-col">

            <h2 className="text-xl font-semibold mb-2 text-black text-center">
              Placing your order ...
            </h2>

            {/* ── Progress Bar ── */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div
                key={showModal}
                className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 h-full rounded-full progress-animate"
              />
            </div>

            {/* ── Selected Address ── */}
            {token && address?.information ? (
              <div className="mb-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p className="text-xs text-blue-600 font-semibold uppercase">
                    {address?.label || "Shipping Address"}
                  </p>
                </div>
                <p className="text-sm text-gray-700 font-bold">{address?.information}</p>
              </div>
            ) : selectedAddress ? (
              <div className="mb-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p className="text-xs text-blue-600 font-semibold uppercase">
                    Delivery Address
                  </p>
                </div>
                <p className="text-sm text-gray-700 font-bold">{selectedAddress}</p>
              </div>
            ) : null}

            {/* ── Cart Items ── */}
            <div className={`text-left mb-3 ${cartItems?.length > 1 ? "overflow-y-auto max-h-[200px]" : ""}`}>
              {cartItems?.map((item, index) => (
                <p key={index} className="text-gray-700 text-sm py-1 border-b border-gray-100 last:border-b-0">
                  {item?.quantity}x {item?.name}
                </p>
              ))}
            </div>

            <p className="text-gray-500 text-sm text-center mb-4">
              Your order will be submitted in {countdown} second
              {countdown !== 1 ? "s" : ""}
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelOrder}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (orderTimeout) {
                    clearTimeout(orderTimeout.timeout);
                    clearInterval(orderTimeout.interval);
                  }
                  setShowModal(false);
                  handleOrder();
                }}
                className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white px-4 py-2 rounded flex-1 font-semibold"
              >
                Looks Good
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="col-span-5 md:col-span-full sm:col-span-full xls:col-span-full xms:col-span-full xs:col-span-full p-2 border-2 border-gray-100 rounded-md">
        <div className="flex mt-2 mb-3">
          <div className="w-full">
            <input
              type="text"
              className="rounded-l-md h-10 w-full text-black  px-3 bg-gray-200 outline-none placeholder:text-sm"
              placeholder="If you have a Promo Code, Enter Here..."
              onChange={(event) => handleChange(event.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 px-4 h-10 text-white font-semibold tracking-wide text-sm rounded-tr-md rounded-br-md"
              onClick={() => handlePromo()}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium text-black">Product</p>
          <p className="font-medium text-black">Subtotal</p>
        </div>

        <div className="h-[300px] overflow-y-auto">
          {cartItems?.map((item, index) => (
            <div
              className="flex items-center space-x-4 px-2 py-4 border-b-2 border-gray-100"
              key={index}
            >
              <div className="h-14 w-14">
                <Image
                  alt="product"
                  height={56}
                  width={56}
                  src={`${ImageHostName}/storage/product/${item?.image}`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold text-sm tracking-wider hover:underline text-black">
                    {item?.name}
                  </p>

                  <h2 className="font-semibold text-base text-black">
                    ৳ {Number(item?.price * item?.quantity).toFixed(2)}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
          <p className="font-medium text-black">Subtotal</p>
          <h2 className="font-semibold text-base text-black">
            ৳ {Number(total).toFixed(2)}
          </h2>
        </div>

        {/* <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
        <p className="font-medium text-black">Delivery charge</p>
        <h2 className="font-semibold text-base text-black">৳ 70</h2>
      </div> */}

        {token && customerPoint ? (
          <RedemComponent
            customerPoint={customerPoint}
            setPointsToCurrency={setPointsToCurrency}
            prevGrandTotal={prevGrandTotal}
            points={points}
            setPoints={setPoints}
            setMinUsedPoints={setMinUsedPoints}
          />
        ) : null}

        {deliveryData?.map((item, index) => (
          <div className="pt-2" key={index}>
            <label
              htmlFor={item?.value}
              className="flex items-center cursor-pointer justify-between w-full"
            >
              <div className="flex items-center">
                <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                  <input
                    checked={deliveryValue === item?.value}
                    type="radio"
                    id={item?.value} // Use item.name for unique id
                    name="deliveryValue"
                    value={item?.value} // Add value to input
                    className="appearance-none focus:opacity-100 focus:ring-indigo-700 focus:outline-none border rounded-full border-indigo-600 absolute cursor-pointer w-full h-full checked:border-none"
                    onChange={() => setDeliveryValue(item?.value)} // Update shippingOption directly
                  />
                  <div
                    className={`check-icon ${deliveryValue === item?.value ? "block" : "hidden"
                      } border-4 border-indigo-700 rounded-full w-full h-full z-1`}
                  ></div>
                </div>
                <p className="ml-2 text-black text-base">{item?.name}</p>
              </div>
              <p className="text-black pl-1">৳{item?.value}</p>
            </label>
          </div>
        ))}

        {type == 1 ? (
          <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
            <div className="flex space-x-2 items-center">
              <p className="font-medium text-black">Discount</p>
              <button onClick={() => handleCouponDelete()}>
                <TiDeleteOutline
                  size={22}
                  className="text-red-500 cursor-pointer"
                />
              </button>
            </div>
            {couponlimit < promoValue ? (
              <h2 className="font-semibold text-base text-black">
                ৳ {Number(couponlimit).toFixed(2)}
              </h2>
            ) : (
              <h2 className="font-semibold text-base text-black">
                ৳ {Number(promoValue).toFixed(2)}
              </h2>
            )}
          </div>
        ) : type == 2 ? (
          <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
            <div className="flex space-x-2 items-center">
              <p className="font-medium text-black">Discount</p>
              <button onClick={() => handleCouponDelete()}>
                <TiDeleteOutline
                  size={22}
                  className="text-red-500 cursor-pointer"
                />
              </button>
            </div>
            {couponlimit <
              Math.round((Number(total) * Number(promoValue)) / 100) ? (
              <h2 className="font-semibold text-base text-black">
                ৳ {Number(couponlimit).toFixed(2)}
              </h2>
            ) : (
              <h2 className="font-semibold text-base text-black">
                ৳ {Math.round((Number(total) * Number(promoValue)) / 100)}
              </h2>
            )}
          </div>
        ) : null}

        {type == 1 ? (
          <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
            <p className="font-medium text-black">Total</p>
            {couponlimit < promoValue ? (
              <h2 className="font-semibold text-base text-black">
                ৳ {grandTotal}
              </h2>
            ) : (
              <h2 className="font-semibold text-base text-black">
                ৳ {grandTotal}
              </h2>
            )}
          </div>
        ) : type == 2 ? (
          <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
            <p className="font-medium text-black">Total</p>
            {couponlimit <
              Math.round((Number(total) * Number(promoValue)) / 100) ? (
              <h2 className="font-semibold text-base text-black">
                ৳ {grandTotal}
              </h2>
            ) : (
              <h2 className="font-semibold text-base text-black">
                ৳{grandTotal}
              </h2>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center py-4 border-b-2 border-gray-100">
            <p className="font-medium text-black">Total</p>
            <h2 className="font-semibold text-base text-black">৳ {grandTotal}</h2>
          </div>
        )}

        {loading ? (
          <button className="px-4 py-3 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 rounded-md w-full flex items-center justify-center space-x-2  disabled mt-5">
            <svg
              className="fill-current text-white animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C12.5523 2 13 2.44772 13 3V6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6V3C11 2.44772 11.4477 2 12 2ZM12 17C12.5523 17 13 17.4477 13 18V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18C11 17.4477 11.4477 17 12 17ZM22 12C22 12.5523 21.5523 13 21 13H18C17.4477 13 17 12.5523 17 12C17 11.4477 17.4477 11 18 11H21C21.5523 11 22 11.4477 22 12ZM7 12C7 12.5523 6.55228 13 6 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H6C6.55228 11 7 11.4477 7 12ZM19.0711 19.0711C18.6805 19.4616 18.0474 19.4616 17.6569 19.0711L15.5355 16.9497C15.145 16.5592 15.145 15.9261 15.5355 15.5355C15.9261 15.145 16.5592 15.145 16.9497 15.5355L19.0711 17.6569C19.4616 18.0474 19.4616 18.6805 19.0711 19.0711ZM8.46447 8.46447C8.07394 8.85499 7.44078 8.85499 7.05025 8.46447L4.92893 6.34315C4.53841 5.95262 4.53841 5.31946 4.92893 4.92893C5.31946 4.53841 5.95262 4.53841 6.34315 4.92893L8.46447 7.05025C8.85499 7.44078 8.85499 8.07394 8.46447 8.46447ZM4.92893 19.0711C4.53841 18.6805 4.53841 18.0474 4.92893 17.6569L7.05025 15.5355C7.44078 15.145 8.07394 15.145 8.46447 15.5355C8.85499 15.9261 8.85499 16.5592 8.46447 16.9497L6.34315 19.0711C5.95262 19.4616 5.31946 19.4616 4.92893 19.0711ZM15.5355 8.46447C15.145 8.07394 15.145 7.44078 15.5355 7.05025L17.6569 4.92893C18.0474 4.53841 18.6805 4.53841 19.0711 4.92893C19.4616 5.31946 19.4616 5.95262 19.0711 6.34315L16.9497 8.46447C16.5592 8.85499 15.9261 8.85499 15.5355 8.46447Z"></path>
            </svg>
            <p className="text-white font-semibold">Ordering...</p>
          </button>
        ) : (
          <button
            onClick={startOrderProcess}
            className="px-4 py-3 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 rounded-md w-full text-white mt-5"
          >
            Order Now
          </button>
        )}
      </div>
    </>
  );
};

export default OrderCalc