


import Link from 'next/link';

import SidebarSubCategory from './Layout/SidebarSubCategory';
import { ImageHostName } from '@/lib/config';

const Sidebar = ({ data }) => {



  return (
    <div className="w-[330px] lg:w-[300px] md:w-[285px]  sm:hidden xls:hidden xms:hidden xs:hidden  bg-white  ">
      <div className="w-full">
        <nav className="space-y-1 main px-4 mt-2 text-black z-10 fixed  w-[330px] lg:w-[300px] md:w-[285px] overflow-auto overflow-x-hidden">
          <ul className="bg-gray-100 rounded-md fixed  w-[280px] lg:w-[255px] md:w-[250px] left-6 right-0 h-[85vh] overflow-y-auto">
            {data?.map((item, index) => (

              <li
                className={`group list-none`}
                key={index}
              >
                <SidebarSubCategory item={item} />
              </li>

            ))}
          </ul>

        </nav>
      </div>
    </div>
  );
}

export default Sidebar

