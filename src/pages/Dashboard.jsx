import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "flowbite";
import CSVReader from "react-csv-reader";
import { usePDF } from "react-to-pdf";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import Barcode from 'react-barcode';
import { randomAlphanumeric } from "random-string-alphanumeric-generator";
import JSZip from "jszip";
import html2pdf from 'html2pdf.js';

import "../App.css";
const options = {
  method: 'build',
  page: {
    format: 'A5',
  },
};

function Dashboard() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const getTargetElement = () => document.getElementById('content-id');
  const [allPdfData, setAllPdfData] = useState([]);

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

  const handleDownloadAll = async () => {
    const fileBlobs = [];
  
    await Promise.all(
      csvData?.map(async (data, index) => {
        const trackingId = randomAlphanumeric(18, "uppercase");
        const pdfData = await generatePDF(() => document.getElementById(`content-id-${index}`), options);
        console.log('pdfData', pdfData);
  
        // Convert the pdfData (which might be a DOM element or similar) to a Blob
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
  
        fileBlobs.push({ name: `${trackingId}.pdf`, content: pdfBlob });
      })
    );
  
    const zip = new JSZip();
  
    fileBlobs.forEach((file) => {
      zip.file(file.name, file.content);
    });
  
    const zipBlob = await zip.generateAsync({ type: 'blob' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'slips.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div className="mt-8 flex items-center justify-center w-11/12 mx-auto">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed cursor-pointer"
          >
            <CSVReader
              cssClass="mx-auto m-0 p-0"
              onFileLoaded={(data, fileInfo, originalFile) => {
                data.shift();
                setCsvData(data)
                console.log(data);
              }}
            />
          </label>
        </div>
        {csvData ? (
          <button onClick={handleDownloadAll} className="bg-blue-50 text-blue-600 rounded-lg py-2 px-6 hover:bg-blue-100 border border-blue-600 m-4">
            Download All PDFs
          </button>
        ) : (
          ''
        )}
        <div className="flex justify-start space-x-4 p-2 overflow-x-scroll">
          {csvData ? csvData.length > 0 && csvData?.map((data, index) => {
            let trackingId = randomAlphanumeric(18, "uppercase");
            return (
              <div className="w-[400px]" key={index} id={`content-id-${index}`}>
                {/* <button onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button> */}
                <div

                  className="bg-white border-[3px] border-black "
                >
                  <div className="flex flex-row items-start justify-between p-1">
                    <div className="text-sm ">
                      <p>{data[0]}</p>
                      <p>1204723601</p>
                      <p>{data[2]}</p>
                      <p>{data[4] + " " + data[5] + " " + data[6]}</p>
                    </div>
                    <div>
                      <p className="font-bold text-md">{data[16]} LBS</p>
                      <p className=" text-sm">DWT:16,8,8</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg"> {index + 1} OF {csvData.length}</p>
                    </div>
                  </div>
                  <div className="p-1">
                    <p className="font-bold">SHIP TO:</p>
                    <div className="ml-3">
                      <span className="block -mb-1 m-0">{data[8]}</span>
                      <span className="block -mb-1 m-0">3131378163</span>
                      <span className="block -mb-1 m-0">{data[10]}</span>
                      <span className="block font-bold mb-1 text-2xl">
                        {data[12] + " " + data[13] + " " + data[14]}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-black"></div>
                  <div className="flex justify-between">
                    <div className="w-[30%] p-1">
                      <div className="w-[100px] flex items-center justify-center mx-auto">

                      </div>
                    </div>
                    <div className="w-[70%]  border-l-[1px] border-black p-1">
                      <p className="font-bold text-3xl mb-4">IL 626 9-49</p>
                      <div className="w-[200px] mx-auto">
                        <Barcode value="barcode-example" height={50} width={0.9} displayValue={false} />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[6px] bg-black"></div>
                  <div className="flex flex-row items-start justify-between">
                    <div>
                      <p className="font-bold text-3xl">UPS 2ND DAY AIR</p>
                      <p className="">TRACKING #: {trackingId}</p>
                    </div>
                    <div>
                      <p className="font-bold text-5xl">2</p>
                    </div>
                  </div>
                  <div className="w-full mt-2 h-[2px] bg-black"></div>
                  <div className="flex justify-center"><Barcode value={trackingId} height={70} width={1} displayValue={false} /></div>
                  <div className="w-full h-[6px] bg-black"></div>
                  <div>
                    <p className="text-sm">BILLING: P/P</p>
                    <p className="text-sm">DESC: {data[20]}</p>
                    <p className="mt-1 font-medium text-sm">
                      REF #1: {data[21]}
                    </p>
                  </div>
                  <div className="flex items-end justify-end mt-4 p-1">
                    <p className="text-sm">ISH 13.00F LASER 15.5V 01/2024</p>
                  </div>
                </div>
              </div>
            )
          }) : (
            ''
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default Dashboard;
