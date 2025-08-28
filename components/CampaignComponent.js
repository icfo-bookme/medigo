import React from 'react'
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { ImageHostName } from '@/lib/config';
import Image from 'next/image';

const CampaignComponent = ({ campaignRes }) => {

 

  

  return (
    <div className="bg-white mt-10 sm:mt-8 xls:mt-4 xms:mt-4 xs:mt-4 py-10 md:py-5 sm:py-4 xls:py-3 xms:py-3 xs:py-2 md:px-2 sm:px-5 xls:px-3 xms:px-2 xs:px-2 relative">
      <div className="max-w-[90rem] lg:max-w-[70rem]  mx-auto">
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
                slidesPerView: 1.2,
                spaceBetween: 9,
              },

              320: {
                slidesPerView: 1.5,
                spaceBetween: 9,
              },

              375: {
                slidesPerView: 1.8,
                spaceBetween: 10,
              },

              425: {
                slidesPerView: 1.8,
                spaceBetween: 15,
              },

              480: {
                slidesPerView: 1.5,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1150: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              2500: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
            }}
          >
            {campaignRes?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative  my-2 h-[225px] md:h-[150px] sm:h-[100px] xls:h-[100px] xms:h-[90px] xs:h-[90px] bg-white rounded-lg ">
                  <Image
                    src={`${ImageHostName}/${item?.image_path}${item?.image}`}
                    height={500}
                    width={500}
                    alt={`campaign-${index + 1}`}
                    className=" h-full object-fill rounded-lg "
                  />
                </div>
              </SwiperSlide>
            ))}

            <button className="button-prev-slide w-[30px] h-[30px] xls:h-[20px] xls:w-[20px] xms:h-[20px] xms:w-[20px] xs:h-[20px] xs:w-[20px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white grid place-items-center absolute top-[150px] md:top-[90px] sm:top-[60px] xls:top-[60px]  xms:top-[60px] xs:top-[60px] left-[50px] lg:left-[40px] md:left-[30px] sm:left-[25px] xls:left-[20px]  xms:left-[20px] xs:left-[20px] cursor-pointer z-9999">
              <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
            </button>

            <button className="button-next-slide w-[30px] h-[30px] xls:h-[20px] xls:w-[20px] xms:h-[20px] xms:w-[20px] xs:h-[20px] xs:w-[20px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white grid place-items-center absolute top-[150px] md:top-[90px] sm:top-[60px] xls:top-[60px] xms:top-[60px] xs:top-[60px] right-[50px] lg:right-[40px] md:right-[30px] sm:right-[25px] xls:right-[25px]  xms:right-[20px] xs:right-[20px] cursor-pointer z-9999">
              <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
            </button>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CampaignComponent