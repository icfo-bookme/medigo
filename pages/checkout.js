import DeliveryAddress from "@/components/OrderSection/DeliveryAddress";
import OrderCalc from "@/components/OrderSection/OrderCalc";
import { useStatus } from "@/context/contextStatus";


import { useEffect, useState } from "react";

import request from "@/lib/request";

const Checkout = () => {
   

  const [selectedAddress,setSelectedAddress] = useState('');

  const { editableAddress, anotherAddress, token } = useStatus();

  const [addressValueSelect,setAddressValueSelect] = useState(null);


  const [optionalAddress,setOptionalAddress] = useState('');

  const [addressflag,setAddressFlag] = useState(false);

  const [customerPoint,setCustomerPoint] = useState({});


   

  
    const [address, setAddress] = useState({
        label: "",
        information:""
    });

    const [addressList,setAddressList] = useState([]);
   
  


   const handleSelectAddress = (val) =>{

      if(val == 1) {
         setSelectedAddress(editableAddress);
         setAddressValueSelect(1);
      }

      if(val == 2){
         setSelectedAddress(anotherAddress);
         setAddressValueSelect(2);
      }

   }


   
     useEffect(() => {
       if (token) {
         const profileData = async () => {
           let res = await request(`my-profile`);


        
            
           if(res){



            if (res?.data?.information) {
              setAddressList((prevAddresses) => {
                const updatedAddresses = res?.data?.addresses;

                updatedAddresses.unshift({
                  label: "Default Shipping Address",
                  information: res?.data?.information,
                });

                return updatedAddresses;
              });
            }

            setAddress({
              label: "Default Shipping Address",
              information: res?.data?.information,
            });

            setCustomerPoint(res?.data?.customer_point);

           }
            
           
         };
         profileData();
       }
     }, [token, addressflag]);


  
    

   
  

  return (
    <>
      
      <div className="bg-[#F2F4F8] pt-3 sm:pt-8">
        <div className="max-w-[90rem] lg:max-w-[70rem] md:max-w-[45rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto pb-3">
          <div className="grid grid-cols-12  py-6 xms:py-1 mb-4  bg-white px-7 xls:px-2 xls:py-2 xms:px-1 xs:px-1 xs:py-1 shadow-md gap-4">
            <DeliveryAddress
              handleSelectAddress={handleSelectAddress}
              addressValueSelect={addressValueSelect}
              setOptionalAddress={setOptionalAddress}
              address={address}
              addressList={addressList}
              setAddress={setAddress}
              addressflag={addressflag}
              setAddressFlag={setAddressFlag}
            />

            <OrderCalc
              selectedAddress={selectedAddress}
              optionalAddress={optionalAddress}
              address={address}
              customerPoint={customerPoint}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout