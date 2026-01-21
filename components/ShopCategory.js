
import { ImageHostName } from '@/lib/config';
import Image from 'next/image';

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ShopCategory = ({data}) => {

  return (
    <div className="bg-white   mt-10 md:mt-10 sm:mt-8 xls:mt-4 xms:mt-4 xs:mt-4 p-10 md:p-5 lg:p-2 xls:p-4 xms:p-3 xs:p-3">
      <div className="max-w-[90rem] mx-auto">
        <div className="mb-5 sm:mb-2 xls:mb-2 xms:mb-2 xs:mb-1 flex justify-between">
          <p className="text-3xl sm:text-xl xls:text-base xms:text-base xs:text-base text-center text-deepBlue-800 font-semibold tracking-wider">
            Shop By Category
          </p>
          <Link href={`/all-category`} >
            <button className="tracking-wider sm:text-sm xls:text-xs xms:text-xs xs:text-xs px-4 py-1 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800  font-semibold text-white cursor-pointer rounded-md">
              See all
            </button>
          </Link>
        </div>
        <div>
          <ul className="grid grid-cols-8 md:grid-cols-5 sm:grid-cols-5 xls:grid-cols-3 xms:grid-cols-3 xs:grid-cols-2 gap-5 xms:gap-2 xls:gap-2 xs:gap-2  justify-center pt-4 xs:pt-0 xms:pt-0">
            {data?.map((item, index) => (
              <li className="group bg-white shadow rounded-md list-none" key={index}>
                <Link href={`/category/${item?.slug}`}>
                  <div className="pt-4 items-center justify-center cursor-pointer">
                    <div>
                      <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto rounded-full bg-gray-50">
                        <Image
                          src={`${ImageHostName}/storage/product/${item?.image}`}
                          className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500"
                          height={80}
                          width={80}
                          alt="product"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm xls:text-xs xms:text-xs xs:text-xs font-semibold text-black text-center ">
                          {item?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShopCategory