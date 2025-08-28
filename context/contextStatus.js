import { parseCookies } from "nookies";
import { createContext, useContext, useState } from "react";

const ContextStatus = createContext();

const ContextStatusProvider = ContextStatus.Provider;

function StatusProvider({ children }) {

  const cookie = parseCookies();

  let items = cookie?.hasOwnProperty("ePharma")
    ? [...JSON.parse(cookie?.ePharma)]
    : [];

    const [cartItems, setCartItems] = useState(items);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tabIndex,setTabIndex] = useState(1);
  const [token, setToken] = useState(cookie?.token ? cookie?.token : "");
  const [name,setName] = useState(cookie?.name ? cookie?.name : ''); 
   const [phone, setPhone] = useState(cookie?.phone ? cookie?.phone : ""); 
   const [email, setEmail] = useState(cookie?.email ? cookie?.email : ""); 
  const [image, setImage] = useState(cookie?.avatar ? cookie?.avatar : "");
  const [renderMe, setIsRenderMe] = useState(false);
  const [fullAddress, setFullAddress] = useState(cookie?.fullAddress ? cookie?.fullAddress : "");
  const [city,setCity] = useState(cookie?.city ? cookie?.city : "");
  const [quarter,setQuarter] = useState(cookie?.quarter ? cookie?.quarter : "");
  const [suburb, setSuburb] = useState(cookie?.suburb ? cookie?.suburb : "");
  const [editableAddress, setEditableAddress] = useState(cookie?.editableaddress ? cookie?.editableaddress : "");
   const [isAlive, setIsAlive] = useState(false);
   const [anotherAddress,setAnotherAddress] = useState(cookie?.anotherAddress ? cookie?.anotherAddress : "");
   const [type, setType] = useState(cookie?.type ? cookie?.type : null);
    const [promoValue, setPromoValue] = useState(cookie?.promovalue ? cookie?.promovalue : null); 
    const [couponId,setCouponId] = useState(cookie?.couponid ? cookie?.couponid : "");
    const [userId,setUserId] = useState(cookie?.userId ? cookie?.userId : "");
    const [couponlimit, setCouponlimit] = useState(
      cookie?.coupon_value_limit ? cookie?.coupon_value_limit : ""
    );
   
    const [profileMenu, setProfileMenu] = useState(false);

    const [sideCategory, setSideCategory] = useState(false);
    
    const [step, setStep] = useState("profile");


   const [notification,setNotification] = useState(false);

   const [isFixed, setIsFixed] = useState(false);

   const [words,setWords] = useState([]);

   const [open, setOpen] = useState(false);

   

  return (
    <ContextStatusProvider
      value={{
        isCartOpen,
        setIsCartOpen,
        tabIndex,
        setTabIndex,
        token,
        setToken,
        name,
        setName,
        image,
        setImage,
        cartItems,
        setCartItems,
        renderMe,
        setIsRenderMe,
        fullAddress,
        setFullAddress,
        city,
        setCity,
        quarter,
        setQuarter,
        suburb,
        setSuburb,
        editableAddress,
        setEditableAddress,
        isAlive,
        setIsAlive,
        anotherAddress,
        setAnotherAddress,
        type,
        setType,
        promoValue,
        setPromoValue,
        userId,
        setUserId,
        couponId,
        setCouponId,

        profileMenu,
        setProfileMenu,
        sideCategory,
        setSideCategory,
        phone,
        setPhone,
        step,
        setStep,
        notification,
        setNotification,
        couponlimit,
        setCouponlimit,
        email,
        setEmail,
        isFixed,
        setIsFixed,
        words,
        setWords,
        open,
        setOpen,
      }}
    >
      {children}
    </ContextStatusProvider>
  );
}

function useStatus() {
  const all = useContext(ContextStatus);
  return all;
}

export { StatusProvider, useStatus };
