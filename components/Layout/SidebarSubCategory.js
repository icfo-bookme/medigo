import { useStatus } from "@/context/contextStatus";
import { ImageHostName } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SidebarSubCategory = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Event Handlers
  // const handleHoverEnter = () => {

  //   setIsDropdownOpen(true);
  // };

  // const handleHoverLeave = () => {
  //   setIsDropdownOpen(false);
  // };

  const handleClick = (slug) => {

    router.push(`/category/${slug}`);

    setIsDropdownOpen(true);

  };

  useEffect(() => {
    if (router?.pathname == `/`) {
      setIsDropdownOpen(false);
    }
  }, [router?.pathname]);

  return (
    <div className="group">
      <button
        className={`flex items-center justify-between list-none group-hover:bg-blue-100
         w-full text-sm font-medium py-4 border-b border-gray-300 pl-5`}
      >
        <div
          className="flex space-x-5 items-center"
          onClick={() => handleClick(item?.slug)}
        >
          <div className="flex items-center justify-center bg-white rounded-full shadow-sm ">
            <Image
              key={item.slug}
              height={24}
              width={24}
              alt={item.name || "product"}
              src={`${ImageHostName}/storage/product/${item?.image}`}
              className="h-6 w-6 rounded-full object-contain"
              unoptimized={true}
            />
          </div>

          <p
            className={`${router?.query?.slug === item?.slug
              ? "text-myColor-500"
              : "text-black"
              } uppercase font-semibold text-sm group-hover:text-myColor-500 line-clamp-1`}
          >
            {item?.name}
          </p>
        </div>
        {item?.children_category?.length > 0 ? (
          <div className="px-1">


            <IoIosArrowDown size={20} className="text-black hidden group-hover:block" />

            <svg
              className={`fill-current  text-black block group-hover:hidden
               `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>

          </div>
        ) : null}
      </button>

      <ul className="  group-hover:block hidden ml-10 border-l pl-2 border-gray-300   transition-all duration-300">
        {item?.children_category?.length > 0 &&
          item?.children_category?.map((item, subindex) => (
            <li
              className={`list-none text-sm border-none 
                        text-black`}
              key={item.slug}
            >
              <Link href={`/category/${item?.slug}`}>
                <p className="text-black line-clamp-1 font-bold capitalize hover:bg-[#DBEAFE] p-2">{item?.name}</p>
              </Link>
            </li>
          ))}
      </ul>

    </div>
  );
};

export default SidebarSubCategory;
