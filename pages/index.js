import CampaignComponent from '@/components/CampaignComponent'
import ShopCategory from '@/components/ShopCategory'
import Slides from '@/components/Slides'
import UploadModal from '@/components/UploadModal'
import ProductSections from '@/components/productSections/ProductSections'
import { useStatus } from '@/context/contextStatus'
import request from '@/lib/request'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsMessenger, BsPhone, BsReverseLayoutTextSidebarReverse, BsTelephoneFill, BsWhatsapp } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md'
import dynamic from 'next/dynamic'
import ShopCategorySlider from '@/components/ShopCategorySlider'

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

export default function Home({ sectionData, slider, orderWithCall, video, campaignRes, cat }) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { isFixed, setIsFixed, open } = useStatus();

  useEffect(() => {
    const handleScroll = () => {
      // Only run this in the browser
      if (typeof window !== 'undefined') {
        const scrollPosition = window.scrollY;
        const threshold = 300;

        if (scrollPosition > threshold) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    // Call handleScroll once to set initial state
    handleScroll();

    // Add scroll event listener only in browser
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener on unmount
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [setIsFixed]);

  return (
    <>
      <main className="bg-[#f3f4f6]">
        <Slides slider={slider} />

        <div className="max-w-[90rem] mx-auto">
          <div
            className={`${!open && isFixed
              ? " top-[60px] left-[310px] sm:left-0 sm:top-[90px] xls:left-0 xls:top-[80px] xms:left-0 xms:top-[80px] xs:left-0 xs:top-[80px] right-0 z-10 shadow-md"
              : ""
              } mx-auto mt-5`}
          >
            <div className="flex justify-between space-x-4 bg-white z-5 xls:block xms:block xs:block py-4 px-4 rounded-md">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-black text-lg font-semibold">
                  Order with call
                </div>
                <div className="flex items-center space-x-3">
                  <div>
                    <Link
                      href={`https://wa.me/${orderWithCall?.whatsapp || '1234567890'}`}
                      target="_blank"
                      passHref
                    >
                      <div className="h-8 w-8 relative cursor-pointer">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                        <div className="h-8 w-8 absolute rounded-full bg-green-500 flex justify-center items-center">
                          <svg
                            className="fill-current text-white absolute h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8c0 1.436.377 2.813 1.084 4.024l.422.724-.653 2.401 2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004.054.004.108.01.162.016.159.018.334.115.393.249.298.676.588 1.357.868 2.04.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268.12.116.237.235.363.346.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.60.004.121.015.177.04.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265.004.067.01.175-.013.373-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302 2.378 2.378 0 0 1-.33.288 3.71 3.71 0 0 1-.125.09 5.024 5.024 0 0 1-.383.22 1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://m.me/your-facebook-username"
                      target="_blank"
                      passHref
                    >
                      <div className="h-8 w-8 relative cursor-pointer">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <div className="h-8 w-8 absolute rounded-full bg-blue-500 flex justify-center items-center">
                          <BsMessenger size={15} className="text-white" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`tel:${orderWithCall?.phone || '1234567890'}`}
                      passHref
                    >
                      <div className="h-8 w-8 relative cursor-pointer">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <div className="h-8 w-8 absolute rounded-full bg-black flex justify-center items-center">
                          <BsTelephoneFill size={15} className="text-white" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center xls:mt-3 xms:mt-3 xs:mt-3 space-x-3">
                  <div>
                    <BsReverseLayoutTextSidebarReverse
                      size={20}
                      className="text-black"
                    />
                  </div>
                  <div className="text-black xs:text-xs xls:text-sm xms:text-sm">
                    Order with prescription.
                  </div>
                  <button
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setUploadModalOpen(true)}
                  >
                    <div className="uppercase text-green-500 text-sm xs:text-xs xls:text-xs xms:text-xs font-semibold animate-bounce">
                      Upload now
                    </div>
                    <div>
                      <MdKeyboardArrowRight
                        size={18}
                        className="text-green-500"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md shadow-lg mt-4 bg-white hidden sm:block xls:block xms:block xs:block">
          <div className="flex space-x-2 items-center justify-center py-2 bg-slate-400">
            <div>
              <BsPhone size={20} className="text-black" />
            </div>
            <div className="text-black">Download App</div>
          </div>
          <ul className="text-black flex items-center justify-center">
            <li className="py-2 px-2 text-center cursor-pointer hover:bg-deepBlue-800 hover:text-white list-none">
              <Link
                href="https://play.google.com/"
                className="flex items-center"
                target="_blank"
                passHref
              >
                <div>
                  <Image
                    height={30}
                    width={30}
                    alt="Google Play Store"
                    src="/image/google_play.png"
                    className="h-[30px] w-[30px] object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/image/placeholder_600x.webp';
                    }}
                  />
                </div>
                <div>Google Play Store</div>
              </Link>
            </li>
            <li className="list-none">/</li>
            <li className="py-2 px-2 text-center cursor-pointer hover:bg-deepBlue-800 hover:text-white list-none">
              <Link
                href="https://www.apple.com/store"
                className="flex items-center"
                target="_blank"
                passHref
              >
                <div>
                  <Image
                    height={30}
                    width={30}
                    alt="Apple App Store"
                    src="/image/apple_store.png"
                    className="h-[30px] w-[30px] object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/image/placeholder_600x.webp';
                    }}
                  />
                </div>
                <div>Apple Store</div>
              </Link>
            </li>
          </ul>
        </div>

        {video?.length > 0 && (
          <div className="pt-6 grid grid-cols-3 sm:grid-cols-2 xls:grid-cols-1 xms:grid-cols-1 xs:grid-cols-1">
            {video.map((item, index) => (
              <div className="p-3" key={item.id || index}>
                <ReactPlayer
                  url={item?.url}
                  width="100%"
                  height="400px"
                  volume={1}
                  controls
                />
                <p className="font-semibold text-black pt-2">{item?.title}</p>
              </div>
            ))}
          </div>
        )}

        {campaignRes && <CampaignComponent campaignRes={campaignRes} />}
        <div className="hidden ">
          {cat && <ShopCategory data={cat} />}
        </div>

        <div className="hidden sm:block xls:block xms:block xs:block">
          {cat && <ShopCategorySlider data={cat} />}
        </div>


        {sectionData?.map((section, index) => (
          section?.products?.length > 0 && (
            <div key={section.id || index}>
              <ProductSections
                products={section?.products}
                section={section}
              />
            </div>
          )
        ))}
      </main>
      <UploadModal
        uploadModalOpen={uploadModalOpen}
        setUploadModalOpen={setUploadModalOpen}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    let res = await request('get-products');
    let slider = await request('slider');
    let catData = await request('get-categories');
    let videoRes = await request('get-promotion-video');
    let campaignRes = await request('get-campaign');

    return {
      props: {
        sectionData: res?.data || null,
        slider: slider?.data || null,
        cat: catData?.data || null,
        orderWithCall: res?.order_with_call || { whatsapp: '1234567890', phone: '1234567890' },
        video: videoRes?.data || null,
        campaignRes: campaignRes?.data || null,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        sectionData: null,
        slider: null,
        cat: null,
        orderWithCall: { whatsapp: '1234567890', phone: '1234567890' },
        video: null,
        campaignRes: null,
      },
    };
  }
}