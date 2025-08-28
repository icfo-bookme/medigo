import React, { useEffect, useState } from 'react'
import AllOrder from './AllOrder';
import DeliveredOrder from './DeliveredOrder';
import DeliveringOrder from './DeliveringOrder';
import CanceledOrder from './CanceledOrder';
import request from '@/lib/request';
import { useStatus } from '@/context/contextStatus';

const MyOrder = ({ availablePoint }) => {
  const { token } = useStatus();

  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const [singleData, setSingleData] = useState({});

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);

  const [orderId, setOrderId] = useState("");

  const handleOrderDetails = (val) => {
    setOrderModalOpen(true);
    setSingleData(data?.data[val]);
  };

  const handleFeedback = (val, invoice) => {
    setFeedbackModalOpen(true);
    setOrderId(invoice);
  };

  useEffect(() => {
    if (token) {
      const getData = async () => {
        let res = await request(`order-list?page=${page}`);

        setTotalData(res?.data?.total);
        setData(res?.data);
        setLoading(false);
      };
      getData();
    }
  }, [token, page]);

  useEffect(() => {
    if (data?.data?.length > 0) {
      let totalAmount = data?.data?.reduce((a, b) => a + b?.grand_total, 0);

      setTotalAmount(Number(totalAmount));
    }
  }, [data]);

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-lg">
          <span className="text-myColor-500">Order details</span>{" "}
        </h1>
      </div>

      <div className="px-5 xls:px-2 xms:px-2 xs:px-1">
        <div className="grid grid-cols-4 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 gap-5 my-4">
          <div className="shadow-lg shadow-color rounded-md p-5">
            <div className="uppercase text-black font-semibold pb-4">
              Total Order
            </div>
            <div className="text-black">
              {data?.data?.length > 0 ? data?.data?.length : 0}
            </div>
          </div>
          <div className="shadow-lg shadow-color rounded-md p-5">
            <div className="uppercase text-black font-semibold pb-4">
              Total value
            </div>
            <div className="text-black">৳ {Math.round(totalAmount)}</div>
          </div>

          <div className="shadow-lg shadow-color rounded-md p-5">
            <div className="uppercase text-black font-semibold pb-4">
              Available point
            </div>
            <div className="text-black">{Math.round(availablePoint)} points</div>
          </div>
        </div>

        <AllOrder
          orderModalOpen={orderModalOpen}
          setOrderModalOpen={setOrderModalOpen}
          singleData={singleData}
          data={data}
          page={page}
          setPage={setPage}
          loading={loading}
          totalData={totalData}
          handleOrderDetails={handleOrderDetails}
          handleFeedback={handleFeedback}
          feedbackModalOpen={feedbackModalOpen}
          setFeedbackModalOpen={setFeedbackModalOpen}
          orderId={orderId}
        />
      </div>
    </div>
  );
};

export default MyOrder