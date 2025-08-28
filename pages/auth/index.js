import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import { useStatus } from "@/context/contextStatus";

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Auth = () => {
  const { tabIndex, setTabIndex } = useStatus();

  return (
    <div className="min-h-[710px] xls:min-h-[570px] xms:min-h-[570px] xs:min-h-[570px] bg-gray-100 pb-16">
      <div className=" bg-white w-[450px] xls:w-[370px] xms:w-[350px] xs:w-[300px] mx-auto rounded-md text-black">
        {tabIndex == 0 ? (
          <p className="text-center py-8 text-xl tracking-wide">
            Create your{" "}
            <span className="text-black font-semibold">Medigo</span> account
          </p>
        ) : (
          <p className="text-center py-8 text-xl">
            <span className="text-gray-400">Login to</span>{" "}
            <span className="font-bold pl-3 tracking-wider">Medigo</span>
          </p>
        )}

        <Tabs
          className="w-full"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="py-2 px-10 grid grid-cols-2 w-full">
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer">
                Register
              </span>
            </Tab>
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer">
                Login
              </span>
            </Tab>
          </TabList>
          <div className="px-4">
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
