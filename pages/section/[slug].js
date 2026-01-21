import ProductCard from "@/components/productSections/ProductCard";
import request from "@/lib/request";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


const SectionSlug = ({ Data, totalData }) => {
  const router = useRouter();

  const { slug } = router?.query;

  const [data, setData] = useState([]);

  const { ref, inView } = useInView();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (Data) {
      setData(Data);
      setPage(1);
    }
  }, [Data]);


  const loadMoreUsers = async () => {
    const res = await request(`categories-wise-product/${slug}?page=${page + 1}`);
    setData([...data, ...res?.data?.products?.data]);

    setPage(page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[90rem] mx-auto min-h-[722px] pb-3 pt-1">
          
          <div>
            {data?.length > 0 ? (
              <>
                <div className="grid grid-cols-6 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-6 rounded-md bg-white">
                  {data?.map((item, index) => (
                    <div key={index}>
                      <ProductCard item={item} index={index} />
                    </div>
                  ))}
                </div>
                {totalData == data?.length ? null : (
                  <div ref={ref} className="flex justify-center space-x-2 items-center mt-3">
                    <span className="loader"></span> <span className="text-black">Loading...</span>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-20">
                <p className="text-3xl text-center font-semibold text-black tracking-wider ">
                  No Data found
                </p>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default SectionSlug;

export async function getServerSideProps(context) {
 

  let res = await request(
    `categories-wise-product/${context?.query?.slug}?page=1`
  );

  return {
    props: {
      Data: res?.data?.products?.data || null,
      totalData: res?.data?.products?.total || null,
      
    },
  };
}
