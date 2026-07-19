import DetailSection from '@/components/ProductDetails/DetailSection';
import ImageGallery from '@/components/ProductDetails/ImageGallery';
import SimilarProductSection from '@/components/ProductDetails/SimilarProductSection';
import { ImageHostName } from '@/lib/config';
import request from '@/lib/request';


const ProductDetails = ({ data, brandproduct, totalData }) => {
  const getYoutubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;

    return url.match(regExp)?.[1] || "";
  };
  return (
    <>
      {/* <Head>
        <title>{`Medigo - ${data?.name}`}</title>

        <link rel="icon" href="/image/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta
          name="url"
          content={`https://medigo.com.bd/product/${data?.slug}`}
        />
        <link
          rel="canonical"
          href={`https://medigo.com.bd/product/${data?.slug}`}
        />
        <meta name="description" content={`${data?.name}`} />
        <meta property="product:availability" content="in stock" />
        <meta property="og:site_name" content="Medigo" />
        <meta property="og:title" content={`${data?.name}`} />
        <meta property="og:description" content={`${data?.name}`} />
        <meta
          property="og:url"
          content={`https://medigo.com.bd/product/${data?.slug}`}
        />
        <meta property="og:type" content="product" />
        <meta property="product:condition" content="new" />
        <meta property="product:price:currency" content="BDT" />
        <meta
          property="product:price:amount"
          content={`${data?.product_units[0]?.price}`}
        />
        <meta
          property="og:image"
          content={`${ImageHostName}/storage/product/${data?.image}`}
        />
        <meta property="product:retailer_item_id" content={`${data?.sku}`} />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: data?.name,
              image: [`${ImageHostName}/storage/product/${data?.image}`],
              description: data?.name,
              sku: data?.sku,
              brand: {
                "@type": "Brand",
                name: "Medigo",
              },
              offers: {
                "@type": "Offer",
                url: `https://medigo.com.bd/product/${data?.slug}`,
                priceCurrency: "BDT",
                price: data?.product_units[0]?.price,
                availability: "InStock",
              },
            }),
          }}
        />
      </Head> */}

      <div className="bg-[#F2F4F8] pt-3">
        <div className="max-w-7xl lg:max-w-[70rem] mx-auto pb-3">
          <div className="grid grid-cols-2 pt-6 mb-4 bg-white px-7 shadow-md rounded-md gap-6">

            {data.yt_video ? (
              <div className="relative w-full h-64 p-3 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(
                    data.yt_video
                  )}?autoplay=0&mute=1&playsinline=1&rel=0&controls=1&enablejsapi=0`}
                  title="YouTube video"
                  frameBorder="0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <ImageGallery image={data?.image} />
            )}


            <DetailSection data={data} />
          </div>

          {data?.indication ? (
            <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body overflow-hidden">
              <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                Safety Advices
              </p>
              <div className="indication">
                <span
                  className="text-black indicateSpan"
                  dangerouslySetInnerHTML={{
                    __html: data?.indication,
                  }}
                ></span>
              </div>
            </div>
          ) : null}
          {data?.medical_overview ? (
            <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
              <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                Medical overview
              </p>
              <div className="medical_overview">
                <span
                  className="text-black"
                  dangerouslySetInnerHTML={{
                    __html: data?.medical_overview,
                  }}
                ></span>
              </div>
            </div>
          ) : null}

          {data?.quick_tips ? (
            <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
              <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                Quick Tips
              </p>
              <div className="quick_tips">
                <span
                  className="text-black "
                  dangerouslySetInnerHTML={{
                    __html: data?.quick_tips,
                  }}
                ></span>
              </div>
            </div>
          ) : null}

          {data?.brief_description ? (
            <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
              <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                Brief description
              </p>
              <div className="brief_description">
                <span
                  className="text-black "
                  dangerouslySetInnerHTML={{
                    __html: data?.brief_description,
                  }}
                ></span>
              </div>
            </div>
          ) : null}
          {data?.disclaimer ? (
            <div className="shadow-md w-full rounded-md bg-white mb-5 mt-4 p-5 space-y-3 font-body">
              <p className="text-xl font-semibold tracking-wider text-deepBlue-800">
                Disclaimer
              </p>
              <div className="disclaimer">
                <span
                  className="text-black "
                  dangerouslySetInnerHTML={{
                    __html: data?.disclaimer,
                  }}
                ></span>
              </div>
            </div>
          ) : null}

          <div className="shadow-md w-full rounded-md bg-white p-5">
            <SimilarProductSection
              products={brandproduct}
              section={`Alternative Brands`}
              totalData={totalData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  console.log("context", context.query.slug);
  let products = await request(`product-details/${context.query.slug}`, "");


  let brandproduct = await request(
    `product-generic-similar/${context.query.slug}`
  );
  return {
    props: {
      data: products?.data || null,
      brandproduct: brandproduct?.data?.data || null,
      totalData: brandproduct?.data?.total || null
    },
  };
}