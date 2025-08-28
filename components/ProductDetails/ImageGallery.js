import hostname, { ImageHostName } from "@/lib/config";
import Image from "next/image";
import { useEffect, useState } from "react";

import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";


const ImageGallery = ({image}) => {

   
   const [isOptimizedImage, setIsOptimizedImage] = useState(true);

   useEffect(()=>{

    if(image){

      setIsOptimizedImage(true)
    }
   },[image])

  return (
    <div className="mb-3 xls:col-span-full xms:col-span-full xs:col-span-full">
      <div className=" h-[500px] sm:hidden xls:hidden xms:hidden xs:hidden">
        {/* <Image
          src={
            isOptimizedImage
              ? `${ImageHostName}/storage/product/${image}`
              : "/image/placeholder_600x.webp"
          }
          height={350}
          width={350}
          priority
          unoptimized={!isOptimizedImage}
          onError={() => setIsOptimizedImage(false)}
        /> */}
        <InnerImageZoom
          src={ImageHostName + "/storage/product/" + image}
          zoomSrc={ImageHostName + "/storage/product/" + image}
          zoomType="hover"
          zoomPreload={true}
          className="rounded-md h-[500px] w-full"
        />
      </div>
      <div className="sm:block xls:block xms:block xs:block hidden">
        <Image
          src={
            isOptimizedImage
              ? `${ImageHostName}/storage/product/${image}`
              : "/image/placeholder_600x.webp"
          }
          height={350}
          width={350}
          className="object-contain"
          property
          unoptimized={!isOptimizedImage}
          onError={() => setIsOptimizedImage(false)}
          alt="product"
        />
      </div>
    </div>
  );
}

export default ImageGallery