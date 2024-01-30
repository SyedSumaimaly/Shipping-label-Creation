import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "flowbite";
import CSVReader from "react-csv-reader";
import { usePDF } from "react-to-pdf";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import Barcode from "react-barcode";
import { randomAlphanumeric } from "random-string-alphanumeric-generator";
import JSZip from "jszip";
import html2pdf from "html2pdf.js";
import { Dropdown } from "flowbite-react";

import "../App.css";
import MainDocument from "./MainDocument";
const options = {
  method: "build",
  page: {
    format: "A5",
  },
};

function Dashboard() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const getTargetElement = () => document.getElementById("content-id");
  const [allPdfData, setAllPdfData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

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

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(
      event.target.value,
      "selectedOptionselectedOptionselectedOption"
    );
  };

  // const handleDownloadAll = async () => {
  //   const fileBlobs = [];

  //   await Promise.all(
  //     csvData?.map(async (data, index) => {
  //       const trackingId = randomAlphanumeric(18, "uppercase");
  //       const pdfData = await generatePDF(
  //         () => document.getElementById(`content-id-${index}`),
  //         options
  //       );
  //       console.log("pdfData", pdfData);

  //       // Convert the pdfData (which might be a DOM element or similar) to a Blob
  //       const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
  //       console.logo(pdfBlob);
  //       fileBlobs.push({ name: `${trackingId}.pdf`, content: pdfBlob });
  //     })
  //   );

  //   const zip = new JSZip();

  //   fileBlobs.forEach((file) => {
  //     zip.file(file.name, file.content);
  //   });

  //   const zipBlob = await zip.generateAsync({ type: "blob" });

  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(zipBlob);
  //   link.download = "slips.zip";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  if (user) {
    return (
      <>
        <nav className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 max-w-full sm:w-[90%] w-full mx-auto">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start rtl:justify-end">
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
                    className="bg-red-50 text-red-600 rounded-xl py-2 px-6 hover:bg-red-100 border border-red-600"
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
            className="flex flex-col max-w-full sm:w-[95%] mx-auto items-center justify-center w-full h-36 rounded-xl hover:bg-gray-100 transition-all border-2 border-gray-300 border-dashed cursor-pointer"
          >
            <CSVReader
              cssclassName="mx-auto m-0 p-0"
              onFileLoaded={(data, fileInfo, originalFile) => {
                data.shift();
                setCsvData(data);
                console.log(data);
              }}
            />
          </label>
        </div>
        {/* {csvData ? (
          <button
            onClick={handleDownloadAll}
            className="bg-blue-50 text-blue-600 rounded-lg py-2 px-6 hover:bg-blue-100 border border-blue-600 m-4"
          >
            Download All PDFs
            
          </button>
        ) : (
          ""
        )} */}

        {csvData?.length > 0 && csvData && (
          <>
            <div className="my-4 px-4 sm:w-[20%] sm:ml-20 ml-2">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleSelectChange}
                value={selectedOption}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="UPS 2ND DAY AIR">UPS 2ND DAY AIR</option>
                <option value="UPS Ground">UPS Ground</option>
              </select>
            </div>
          </>
        )}
        {selectedOption && (
          <MainDocument csvData={csvData} selectedOption={selectedOption} />
        )}
      </>
    );
  } else {
    return null;
  }
}

export default Dashboard;
