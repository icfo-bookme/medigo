
import { ImageHostName } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';


const Footer = ({ companyInfo }) => {

 
  // console.log("companyInfo", companyInfo);
  

  return (
    <footer className="bg-white pt-3 pb-5 sm:pb-7 xls:pb-5 xms:pb-5 xs:pb-4 border-t border-gray-400">
      <div className="max-w-7xl lg:max-w-[55rem] md:max-w-[45rem] sm:max-w-[44rem] xls:max-w-[23rem] xms:max-w-[21rem] xs:max-w-[18rem] mx-auto sm:pb-10 xls:pb-10 xms:pb-10 xs:pb-10 grid grid-cols-3 md:grid-cols-3 sm:grid-cols-3 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1 gap-x-20 md:gap-x-10 sm:gap-x-5">
        <div className="grid xls:justify-center xms:justify-center xs:justify-center">
          <Link href={`/`}>
            <div className="flex justify-start lg:w-auto md:justify-center xls:justify-center xms:justify-center xs:justify-center lg:flex-1">
              <Image
                width={90}
                height={100}
                src={
                  companyInfo?.length > 0 &&
                  companyInfo[9]?.image_path &&
                  companyInfo[9]?.value
                    && `${ImageHostName}/${companyInfo[9].image_path}${companyInfo[9].value}`
              
                }
                className="object-contain"
                alt="logo"
              />
            </div>
          </Link>
        </div>

        <div>
          <p className="text-black text-base font-semibold  pt-3">
            About address
          </p>
          <p className="text-black text-sm pt-3">
            {companyInfo?.length > 0 && companyInfo[3]?.value}
          </p>
        </div>

        <div>
          <Link
            href={`/company-info`}
            className="text-black text-xl xls:text-sm xms:text-sm xs:text-sm  border-b border-gray-300 font-semibold pt-3 s "
          >
            Our company
          </Link>
          {/* <ul className="space-y-4 pt-4">
            <li className="text-white text-sm xls:text-xs xms:text-xs xs:text-xs font-semibold cursor-pointer no-underline">
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li className="text-white text-sm  xls:text-xs xms:text-xs xs:text-xs font-semibold no-underline">
              <Link href="/refund-and-returnpolicy">
                Refund and return policy
              </Link>
            </li>
            <li className="text-white text-sm xls:text-xs xms:text-xs xs:text-xs font-semibold no-underline">
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>

            <li className="text-white text-sm xls:text-xs xms:text-xs xs:text-xs font-semibold no-underline">
              <Link href="/about-us">About us</Link>
            </li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer