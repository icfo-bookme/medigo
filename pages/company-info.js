import request from '@/lib/request';


const CompanyInfo = ({Data}) => {
  

  return (
    <>
     

      <div className="bg-gray-100 min-h-[722px] pt-5">
        <section>
          <div className="container px-2 py-2 mx-auto">
            {Data?.about_us && (
              <div>
                <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold  text-black dark:text-black">
                  About us
                </h1>
                <div className="py-4 pt-5">
                  <p
                    className="text-base dark:text-black"
                    dangerouslySetInnerHTML={{
                      __html: Data?.about_us?.details,
                    }}
                  ></p>
                </div>
              </div>
            )}

            {Data?.privacy && (
              <div>
                <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold  text-black dark:text-black">
                  Privacy
                </h1>
                <div className="py-4 pt-5">
                  <p
                    className="text-base dark:text-black"
                    dangerouslySetInnerHTML={{ __html: Data?.privacy?.details }}
                  ></p>
                </div>
              </div>
            )}

            {Data?.refund && (
              <div>
                <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold  text-black dark:text-black">
                  Refund
                </h1>
                <div className="py-4 pt-5">
                  <p
                    className="text-base dark:text-black"
                    dangerouslySetInnerHTML={{ __html: Data?.refund?.details }}
                  ></p>
                </div>
              </div>
            )}

            {Data?.terms && (
              <div>
                <h1 className="text-4xl xls:text-2xl xms:text-2xl xs:text-2xl font-semibold  text-black dark:text-black">
                  Terms and conditions
                </h1>
                <div className="py-4 pt-5">
                  <p
                    className="text-base dark:text-black"
                    dangerouslySetInnerHTML={{ __html: Data?.terms?.details }}
                  ></p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default CompanyInfo


export async function getServerSideProps(context) {
  let res = await request(`get-company-info`);

  

  return {
    props: {
      Data: res?.data || null,
     
    },
  };
}