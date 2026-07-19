
import { ImageHostName } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slides = ({slider}) => {
  return (
    <div>
      <div className="relative ">
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 2200,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {slider?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-[400px] md:h-[330px] sm:h-[300px] xls:h-[180px] xms:h-[180px] xs:h-[180px] ">
                {/* <p>`{ImageHostName}/storage/{item?.image}`</p> */}
                {item?.url ? (
                  <Link href={`${item?.url}`} target="_blank">
                    <Image
                      src={`${ImageHostName}/storage/${item?.image}`}
                      className="object-fill h-full w-full"
                      height={400}
                      width={1920}
                      alt={`slider-${index}`}
                      priority={true}
                    />
                  </Link>
                ) : (
                  <Image
                    src={`${ImageHostName}/storage/${item?.image}`}
                    className="object-fill h-full w-full"
                    height={400}
                    width={1920}
                    alt={`slider-${index}`}
                    priority={true}

                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slides;
