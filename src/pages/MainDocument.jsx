import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer, PDFDownloadLink, View, Text } from "@react-pdf/renderer";
// import MyDocument from "./MyDocument";
import MyDocument from "./MyDocument";
import SecondDocument from "./SecondDocument";

const MainDocument = ({ csvData, selectedOption }) => (
  <div>
    {selectedOption === "UPS 2ND DAY AIR" ? (
      <PDFViewer style={{ width: "100%", height: 1200, margin: "auto" }}>
        <MyDocument csvData={csvData} />
      </PDFViewer>
    ) : (
      <PDFViewer style={{ width: "100%", height: 1200, margin: "auto" }}>
        <SecondDocument csvData={csvData} />
      </PDFViewer>
    )}
    <PDFDownloadLink
      document={
        selectedOption === "UPS 2ND DAY AIR" ? (
          <MyDocument csvData={csvData} />
        ) : (
          <SecondDocument csvData={csvData} />
        )
      }
      fileName="your-document.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
    {/* <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!!!!!!"
      }
    </PDFDownloadLink> */}
  </div>
);

export default MainDocument;
