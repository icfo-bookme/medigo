/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */


import styles from "./RsLeftMenu.module.css";

import { useStatus } from "@/context/contextStatus";
import Link from "next/link";


function ResLeftMenu({data}) {
  const { sideCategory, setSideCategory } =
    useStatus();




  return (
    <div className={`${sideCategory ? styles.main__wrapper : ``}`}>
      <div
        className={`overflow-y-auto
							md:hidden bg-white fixed top-0 
							duration-500 h-[100vh]  sm:p-10 z-50 ${
                sideCategory ? "left-0 w-[80%]" : "left-[-100%]"
              }
        			`}
      >
        <div
          className="flex justify-between items-center py-2 px-2 bg-gradient-to-r from-lightBlue-400 to-deepBlue-800"
          onClick={() => setSideCategory(false)}
        >
          <h4 className="font-semibold tracking-wider text-white">Category</h4>
          <svg
            className="h-7 w-7 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>
        </div>

        <ul className="p-4">
          {data?.map((item, index) => (
            <>
              <Link
                href={`/category/${item?.slug}`}
                onClick={() => setSideCategory(false)}
              >
                <li
                  className="list-none py-2 border-b border-gray-300 text-black"
                  key={index}
                >
                  {item?.name}
                </li>
              </Link>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResLeftMenu;
