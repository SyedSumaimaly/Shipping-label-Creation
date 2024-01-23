import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "flowbite";
import CSVReader from "react-csv-reader";
import { usePDF } from "react-to-pdf";

import "../App.css";

function Dashboard() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("before condition user", user);
      if (!user) {
        console.log(user, "useruseruseruser");
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User logout!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (user) {
    return (
      <>
        <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <p className="sr-only">Open sidebar</p>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <a href="/" className="flex ms-2 md:me-24">
                  <p className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
                    Label Creation
                  </p>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 rounded-lg py-2 px-6 hover:bg-red-100 border border-red-600"
                  >
                    logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="mt-8 flex items-center justify-center w-11/12 mx-auto">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed cursor-pointer"
          >
            <CSVReader
              cssClass="mx-auto m-0 p-0"
              onFileLoaded={(data, fileInfo, originalFile) =>
                console.dir(data, fileInfo, originalFile)
              }
            />
          </label>
        </div>
        <div>
          <button onClick={() => toPDF()}>Download PDF</button>
          <div
            ref={targetRef}
            className="bg-white w-[30%] mx-auto border-[3px] border-black "
          >
            <div className="flex flex-row items-start justify-between  p-2">
              <div className="text-sm ">
                <p>YOUR BEST CHOICE</p>
                <p>1204723601</p>
                <p>3712 LIBERTY HEIGHTS AVE</p>
                <p>BALTIMORE MD 21215</p>
              </div>
              <div>
                <p className="font-bold text-md">8 LBS</p>
                <p className=" text-sm">DWT:16,8,8</p>
              </div>
              <div>
                <p className="font-bold text-lg"> 1 OF 1</p>
              </div>
            </div>
            <div className="mt-4 p-2">
              <p className="font-bold">SHIP TO:</p>
              <div className="ml-8">
                <span className="block -mb-1 m-0">AMY REEVES</span>
                <span className="block -mb-1 m-0">3131378163</span>
                <span className="block -mb-1 m-0">23698 RTE 4</span>
                <span className="block -mb-1 font-bold text-2xl my-1">
                  CARLINVILLE IL 62626
                </span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-black"></div>
            <div className="flex justify-between">
              <div className="w-[30%] p-2 h-[30%] ">
                <div className="w-[100px] flex items-center justify-center bg-neutral-500 h-20 mx-auto"></div>
              </div>
              <div className="w-[70%]  border-l-[1px] border-black p-2 h-[30%]">
                <p className="font-bold text-4xl">IL 626 9-49</p>
                <div className="w-[200px] bg-black h-10 mx-auto"></div>
              </div>
            </div>
            <div className="w-full h-[6px] bg-black"></div>
            <div className="flex flex-row items-end justify-between">
              <div>
                <p className="font-bold text-3xl">UPS 2ND DAY AIR</p>
                <p className="p-1">TRACKING #: 1Z X98 882 02 8852 3743</p>
              </div>
              <div>
                <p className="font-bold text-6xl">2</p>
              </div>
            </div>
            <div className="w-full h-[2px] bg-black"></div>
            <div className="h-10"></div>
            <div className="w-full h-[6px] bg-black"></div>
            <div>
              <p className="text-sm">BILLING: P/P</p>
              <p className="text-sm">DESC: Fudge Stripe Cookie 36CT 1 PACK</p>
              <p className="mt-2 font-medium text-sm">
                REF #1: 200011641433876
              </p>
            </div>
            <div className="flex items-end justify-end mt-6">
              <p className="text-sm">ISH 13.00F LASER 15.5V 01/2024</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default Dashboard;
