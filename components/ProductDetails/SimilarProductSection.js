import request from '@/lib/request';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../productSections/ProductCard';

const SimilarProductSection = ({ products, section, totalData }) => {



  const router = useRouter();

  const { slug } = router?.query;

  const [data, setData] = useState([]);

  const { ref, inView } = useInView();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (products) {
      setData(products);
      setPage(1);
    }
  }, [products]);

  const loadMoreUsers = async () => {
    const res = await request(
      `product-generic-similar/${slug}?page=${page + 1}`
    );


    
    setData([...data, ...res?.data?.data]);

    setPage(page + 1);
  };

  // useEffect(() => {
  //   if (inView) {
  //     loadMoreUsers();
  //   }
  // }, [inView]);

  return (
    <div className="bg-white ">
      <div className="max-w-[90rem] lg:max-w-[70rem] mx-auto">
        <div className="flex justify-between">
          <p className="text-3xl xls:text-xl xms:text-xl xs:text-lg text-center text-deepBlue-800 font-semibold tracking-wider font-body">
            {section}
          </p>
          {/* <p className="tracking-wider px-4 py-1  text-green-500 hover:bg-lime-500 hover:duration-500 font-semibold hover:text-white cursor-pointer border border-lime-500 rounded-md">
            See all
          </p> */}
        </div>

        <div className="grid grid-cols-5 lg:grid-cols-5 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-2 pt-8 gap-5">
          {data?.map((item, index) => (
            <div key={index}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>

        {/* {totalData == data?.length ? null : (
          <div
            ref={ref}
            className="flex justify-center space-x-2 items-center mt-3"
          >
            <span className="loader"></span>{" "}
            <span className="text-black">Loading...</span>
          </div>
        )} */}

        {totalData == data?.length ? null : (
          <div className="flex justify-center items-center mt-3">
            <button
              className="bg-gradient-to-r from-lightBlue-400 to-deepBlue-800 px-3 py-1 rounded-md text-white capitalize"
              onClick={() => loadMoreUsers()}
            >
              see more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarProductSection
