import ProductCard from '@/components/productSections/ProductCard';
import request from '@/lib/request';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Search = () => {
 
    const router = useRouter();

    const { slug } = router?.query;

   const [data, setData] = useState([]);

   const [loading, setLoading] = useState(true);

     useEffect(() => {
       if (slug) {
         const getData = async () => {
           const res = await request(`search/${slug}`);

           setData(res?.data);
           setLoading(false);
           
         };
         getData();
       } 

     }, [slug]);


  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto min-h-[722px] pb-3">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "170px",
            }}
          >
            {" "}
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#1F2937"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </div>
        ) : (
          <div>
            {data?.length > 0 ? (
              <>
                <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xls:grid-cols-2 xms:grid-cols-2 xs:grid-cols-1 gap-5 xms:gap-3 p-2">
                  {data?.map((item, index) => (
                    <div key={index}>
                      <ProductCard item={item} index={index} />
                    </div>
                  ))}
                  <div></div>
                </div>
              </>
            ) : (
              <div className="mt-20">
                <p className="text-3xl text-center font-semibold text-black tracking-wider">
                  No Data found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search