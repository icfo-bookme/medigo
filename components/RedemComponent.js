import React, { useState } from 'react'
import { toast } from 'react-toastify';

const RedemComponent = ({
  customerPoint,
  setPointsToCurrency,
  prevGrandTotal,
  points,
  setPoints,
  setMinUsedPoints,
}) => {
  const handleApply = () => {
    if (isNaN(points) || points.trim() === "") {
      toast.error("Points must be a number.");
      setPoints("");
      return;
    }

    if (Number(points) <= customerPoint?.available_point) {
      if (Number(points) >= Number(customerPoint?.min_use_point)) {
        let conversion =
          Number(points) / Number(customerPoint?.conversion_rate);

        if (conversion > prevGrandTotal) {
          toast.error(`The redeemed points exceed the total amount payable.`);
          setPoints("");
        } else {
          setPointsToCurrency(conversion);
          setMinUsedPoints(Number(points))

          toast.success(
            `Points successfully redeemed!`
          );
        }
      } else {
        toast.error(
          `You have insufficient points to redeem. Minimum required: ${Number(
            customerPoint?.min_use_point
          )}`
        );
        setPoints("");
      }
    } else {
      toast.error(
        `You cannot redeem more than your available points. Available points: ${customerPoint?.available_point}`
      );
      setPoints("");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-2">
        <p className="text-black text-sm capitalize">available point</p>

        <div className="flex space-x-2 items-center">
          <p className="text-black">
            {Number(customerPoint?.available_point)}{" "}
            <span className="text-xs">points</span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-black text-sm capitalize">redeem point</p>

        <div className="flex mt-2 mb-3">
          <div className="w-full">
            <input
              type="text"
              className="rounded-l-md h-8 w-full text-black  px-3 bg-gray-200 outline-none placeholder:text-sm"
              placeholder="Enter redeem point"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-deepBlue-800 text-xs px-4 h-8 text-white font-semibold tracking-wide  rounded-tr-md rounded-br-md"
              onClick={() => handleApply()}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemComponent