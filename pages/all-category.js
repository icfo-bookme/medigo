import hostname, { ImageHostName } from '@/lib/config';
import request from '@/lib/request';
import Image from 'next/image';
import Link from 'next/link';


const AllCategory = ({ cat }) => {
  return (
    <>
      <div className="bg-white min-h-[725px]">
        <div className="max-w-[90rem] lg:max-w-[70rem] md:max-w-[45rem] sm:max-w-[45rem] xls:max-w-[25rem] xms:max-w-[22rem] xs:max-w-[19rem] mx-auto min-h-[722px] xls:min-h-[370px] xms:min-h-[370px] xs:min-h-[350px] pb-3">
          <div>
            <ul className="grid grid-cols-8 md:grid-cols-6 sm:grid-cols-6 xls:grid-cols-4 xms:grid-cols-3 xs:grid-cols-3 gap-5 md:gap-3 sm:gap-3 xls:gap-2 xms:gap-2 xs:gap-2 justify-center pt-4">
              
                {cat?.map((item, index) => (
                  <li
                    className="group bg-white shadow rounded-md list-none"
                    key={index}
                  >
                    <Link href={`/category/${item?.slug}`}>
                      <div className="pt-4 items-center justify-center cursor-pointer">
                        <div>
                          <div className="h-[80px] w-[80px] flex justify-center items-center mx-auto rounded-full bg-gray-50">
                            <Image
                              height={80}
                              width={80}
                              alt='product'
                              src={`${ImageHostName}/storage/product/${item?.image}`}
                              className="h-[50px] w-[50px] object-contain group-hover:scale-110 ease-in-out duration-500"
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
    </>
  );
};

export default AllCategory

export async function getServerSideProps(context) {


  let catData = await request(`get-categories`);

  return {
    props: {
   
      cat: catData?.data || null,
      
    },
  };
}
