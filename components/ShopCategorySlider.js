import React from 'react';
import Link from 'next/link';
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ImageHostName } from '@/lib/config';
import Image from 'next/image';

const ShopCategorySlider = ({ data }) => {
    return (
        <div className="relative bg-white mt-10 sm:mt-8 py-10 md:py-5 sm:py-4 px-2">
            <div className="max-w-[90rem] lg:max-w-[70rem] mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-xl text-deepBlue-800 font-semibold tracking-wider">
                        Shop By Category
                    </p>
                    <Link href={`/all-category`}>
                        <p className="tracking-wider text-white text-sm px-4 py-1 font-semibold bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 cursor-pointer rounded-md">
                            See all
                        </p>
                    </Link>
                </div>

                <div className="px-5">
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
                            270: { slidesPerView: 1.3, spaceBetween: 9 },
                            320: { slidesPerView: 1.5, spaceBetween: 9 },
                            375: { slidesPerView: 3.2, spaceBetween: 10 },
                            425: { slidesPerView: 3.7, spaceBetween: 15 },
                            480: { slidesPerView: 2.5, spaceBetween: 18 },
                            768: { slidesPerView: 3.5, spaceBetween: 18 },
                            1024: { slidesPerView: 3.5, spaceBetween: 18 },
                            1150: { slidesPerView: 4.5, spaceBetween: 12 },
                            1440: { slidesPerView: 6.5, spaceBetween: 18 },
                            2500: { slidesPerView: 6.5, spaceBetween: 18 },
                        }}
                    >
                        {data?.map((item) => (
                            <SwiperSlide key={item.id || item.slug}>
                                <Link href={`/category/${item.slug}`}>
                                    <div className="group bg-white shadow rounded-md p-4 cursor-pointer hover:shadow-lg transition">
                                        <div className="h-[80px] w-[80px] mx-auto rounded-full bg-gray-50 flex items-center justify-center">
                                            <Image
                                                src={`${ImageHostName}/storage/product/${item.image}`}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                                className="object-contain group-hover:scale-110 transition duration-300"
                                            />
                                        </div>
                                       
                                    </div>
                                     <p className="text-sm font-semibold text-center mt-3 text-black">
                                            {item.name}
                                        </p>
                                </Link>
                            </SwiperSlide>
                        ))}

                        {/* Navigation Buttons */}
                        <button className="button-prev-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white grid place-items-center absolute top-[35px] md:top-[18px] sm:top-[25px] xls:top-[38px] xms:top-[5px] xs:top-[5px] right-[270px] lg:right-[190px] md:right-[190px] sm:right-[190px] xls:right-[150px] xms:right-[150px] xs:right-[150px] cursor-pointer">
                            <MdOutlineKeyboardArrowLeft size={20} className="text-primary" />
                        </button>

                        <button className="button-next-slide w-[30px] h-[30px] rounded-full shadow-xl drop-shadow-lg hover:scale-150 transition duration-200 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 text-white grid place-items-center absolute top-[35px] md:top-[18px] sm:top-[25px] xls:top-[38px] xms:top-[5px] xs:top-[5px]  right-[190px] lg:right-[120px] md:right-[120px] sm:right-[120px] xls:right-[100px]  xms:right-[100px] xs:right-[100px] cursor-pointer">
                            <MdOutlineKeyboardArrowRight size={20} className="text-primary" />
                        </button>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ShopCategorySlider;
