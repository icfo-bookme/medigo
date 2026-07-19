
import React from 'react'
import ProductCard from './ProductCard';
import Link from 'next/link';
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const ProductSections = ({products,section}) => {
 
  return (
    <div className="relative bg-white mt-10 sm:mt-8 xls:mt-4 xms:mt-4 xs:mt-4 py-10 md:py-5 sm:py-4 xls:py-3 xms:py-3 xs:py-2 md:px-2 sm:px-5 xls:px-3 xms:px-2 xs:px-2 px-2">
      <div className="max-w-[90rem] lg:max-w-[70rem]  mx-auto">
        <div className="flex justify-between">
          <p className="text-3xl sm:text-xl xls:text-base xms:text-base xs:text-base text-center text-deepBlue-800 font-semibold tracking-wider">
            {section?.name}
          </p>

          <Link href={`/section/${section?.slug}`}>
            <p className="tracking-wider text-white text-sm sm:text-sm xls:text-xs xms:text-xs xs:text-xs px-4 py-1 font-semibold bg-gradient-to-r from-lightBlue-400 to-deepBlue-800  cursor-pointer rounded-md">
              See all
            </p>
          </Link>
        </div>

        {/* <div className="grid grid-cols-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 pt-8 xls:pt-4 xms:pt-4 xs:pt-3 gap-6 lg:gap-4 md:gap-4 xls:gap-3 xms:gap-3 xs:gap-3">
          {products?.map((item, index) => (
            <div key={index}>
              <ProductCard item={item}  />
            </div>
          ))}
        </div> */}
        <div className=" px-5 pb-4 xms:px-0 xs:px-0 xls:px-0">
          <Swiper
            slidesPerView={6}
            spaceBetween={20}
            autoplay={{
              delay: 2200,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              270: {
                slidesPerView: 1.3,
                spaceBetween: 9,
              },

              320: {
                slidesPerView: 1.5,
                spaceBetween: 9,
              },

              375: {
                slidesPerView: 2.2,
                spaceBetween: 10,
              },

              425: {
                slidesPerView: 2.3,
                spaceBetween: 15,
              },

              480: {
                slidesPerView: 2.5,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 18,
              },
              1150: {
                slidesPerView: 4.5,
                spaceBetween: 12,
              },
              1440: {
                slidesPerView: 6.5,
                spaceBetween: 18,
              },
              2500: {
                slidesPerView: 6.5,
                spaceBetween: 18,
              },
            }}
          >
            {products?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative  my-2">
                  <ProductCard item={item} index={index} products={products} />
                </div>
              </SwiperSlide>
            ))}

            <button className="button-prev-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white grid place-items-center absolute top-[35px] md:top-[18px] sm:top-[15px] xls:top-[5px] xms:top-[5px] xs:top-[5px] right-[270px] lg:right-[190px] md:right-[190px] sm:right-[190px] xls:right-[150px] xms:right-[150px] xs:right-[150px] cursor-pointer">
              <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
            </button>

            <button className="button-next-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white grid place-items-center absolute top-[35px] md:top-[18px] sm:top-[15px] xls:top-[5px] xms:top-[5px] xs:top-[5px]  right-[190px] lg:right-[120px] md:right-[120px] sm:right-[120px] xls:right-[100px]  xms:right-[100px] xs:right-[100px] cursor-pointer">
              <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
            </button>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductSections