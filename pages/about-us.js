import request from '@/lib/request';


const AboutUs = ({data}) => {
  return (
    <>
    
      <div className="bg-gray-100 min-h-[670px] pt-20">
        <section>
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold text-center text-black dark:text-black">
              About us
            </h1>
            <div className="py-4 pt-5">
              <p
                className="text-base dark:text-black"
                dangerouslySetInnerHTML={{ __html: data?.data?.details }}
              ></p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutUs

export async function getStaticProps() {
  let settings = await request(`about-us`);

  return {
    props: {
      data: settings || null,
    },
    revalidate: 5,
  };
}