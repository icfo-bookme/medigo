import ProductCard from '@/components/productSections/ProductCard';
import { ImageHostName } from '@/lib/config';
import request from '@/lib/request';

import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";

const CategorySlug = ({ Data,  totalData, title, DataRes }) => {
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
    const res = await request(
      `categories-wise-product/${slug}?page=${page + 1}`
    );
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
      {/* <Head>
        <title>{`Medigo - ${title}`}</title>

        <link rel="icon" href="/image/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta
          name="url"
          content={`https://medigo.com.bd/category/${DataRes?.slug}`}
        />
        <link
          rel="canonical"
          href={`https://medigo.com.bd/category/${DataRes?.slug}`}
        />
        <meta name="description" content={`${title}`} />

        <meta property="og:site_name" content="Medigo" />
        <meta property="og:title" content={`${title}`} />
        <meta property="og:description" content={`${title}`} />
        <meta
          property="og:url"
          content={`https://medigo.com.bd/category/${DataRes?.slug}`}
        />
        <meta property="og:type" content="category" />

        <meta property="og:type" content="website" />
      </Head> */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto">
          {/* <ul className="grid grid-cols-10 lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-5 xls:grid-cols-3 xms:grid-cols-3 xs:grid-cols-2 gap-5 xms:gap-2 xls:gap-2 xs:gap-2  justify-center pt-4 xs:pt-0 xms:pt-0">
            {categoryData?.map((item, index) => (
              <li className="group list-none" key={index}>
                <Link href={`/category/${item?.slug}`}>
                  <div>
                    <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto rounded-full bg-gray-50">
                      <Image
                        height={80}
                        width={80}
                        alt={item?.name}
                        src={`${ImageHostName}/storage/product/${item?.image}`}
                        className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500"
                      />
                    </div>
                    <div className="p-2">
                      <p
                        className={`text-sm xls:text-xs xms:text-xs xs:text-xs font-semibold ${
                          slug === item?.slug ? "text-red-600" : "text-black"
                        }  text-center`}
                      >
                        {item?.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul> */}

          <div className=" min-h-[722px] pt-7 pb-3">
            <div>
              {data.length > 0 ? (
                <>
                  <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
                    {data?.map((item, index) => (
                      <div key={index}>
                        <ProductCard item={item} />
                      </div>
                    ))}
                  </div>
                  {totalData == data?.length ? null : (
                    <div
                      ref={ref}
                      className="flex justify-center space-x-2 items-center mt-3"
                    >
                      <span className="loader"></span>{" "}
                      <span className="text-black">Loading...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-20">
                  <p className="text-3xl text-center font-semibold text-black tracking-wider">
                    No Data found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySlug

export async function getServerSideProps(context) {
 
   let rescatData = await request(`get-categories`);

  let res = await request(`categories-wise-product/${context?.query?.slug}?page=1`);
 
  
  
  

  return {
    props: {
      DataRes:res?.data || null,
      title: res?.data?.name || null,
      Data: res?.data?.products?.data || null,
      totalData: res?.data?.products?.total || null,
      categoryData: rescatData?.data || null,
    },
  };
}