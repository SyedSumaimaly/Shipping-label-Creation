import React, { useEffect } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Canvas,
} from "@react-pdf/renderer";
import { randomAlphanumeric } from "random-string-alphanumeric-generator";
import bwipjs from "bwip-js";

// import { Barcode } from "@react-pdf/barcode";
import Barcode from "react-barcode";
// import Barcode from "react-jsbarcode";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = ({ csvData }) => {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${day},${month},${year}`;
  };

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${month}/${year}`;
  };

  const canvasRef = React.useRef(null);
  // Access the canvas element here

  const generateMaxiCodeImage = (barcodeValueTwo) => {
    const canvas = document.createElement("canvas");
    try {
      bwipjs.toCanvas(canvas, {
        bcid: "maxicode",
        text: barcodeValueTwo,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
      });
      return canvas.toDataURL();
    } catch (e) {
      console.error("Error generating MaxiCode:", e);
      return null;
    }
  };

  return (
    <Document>
      {csvData &&
        csvData.length > 0 &&
        csvData.map((data, index) => {
          const maxiCodeImage = generateMaxiCodeImage(
            `01 96${
              data && data[14]?.padEnd(9, "0")
            } 840 002 1Z10838454 UPSN 40612Y 015 1/1 ${data[16]} N ${
              data[10]
            } ${data[13]}`
          );
          console.log(
            `01 96${data[14]?.padEnd(
              9,
              "0"
            )} 840 002 1Z10838454 UPSN 40612Y 015 1/1 ${data && data[16]} N ${
              data[10]
            } ${data[13]}`
          );
          if (
            !data[0] ||
            !data[2] ||
            !data[4] ||
            !data[5] ||
            !data[6] ||
            !data[7] ||
            !data[8] ||
            !data[16] ||
            !data[17] ||
            !data[18] ||
            !data[19] ||
            !data[15] ||
            !data[10] ||
            !data[12] ||
            !data[13] ||
            !data[14] ||
            !data[20] ||
            !data[21] ||
            !data[22]
          ) {
            return null;
          }
          const generateUpsTrackingNumber = () => {
            const randomSection = `${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}`;

            return `1Z 723 90Y 02 ${randomSection.slice(
              0,
              4
            )} ${randomSection.slice(4)}`;
          };
          const trackingId = generateUpsTrackingNumber();
          // const trackingId = randomAlphanumeric(18, "uppercase");
          let canvas, canvas2;
          const zipCode = data[14];
          const barcodeValue = `420${
            zipCode?.length === 5 ? zipCode : zipCode?.slice(0, 9)
          }`;
          console.log(barcodeValue);
          canvas = document.createElement("canvas");
          JsBarcode(canvas, barcodeValue, {
            displayValue: false,
            width: 1,
            height: 30,
          });
          const barcode = canvas.toDataURL();

          canvas2 = document.createElement("canvas");
          JsBarcode(canvas2, trackingId, {
            displayValue: false,
            width: 1,
            height: 50,
          });
          const barcode2 = canvas2.toDataURL();

          const randomTwoDigitNumber = Math.floor(Math.random() * 90) + 10;

          return (
            <Page size="A5" key={index} id={`content-id-${index}`}>
              <View>
                <View
                // className="w-[400px]"
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      border: "3",
                      borderColor: "#000",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        // justifyContent: "space-between",
                      }}
                    >
                      <View style={{ fontSize: "12px" }}>
                        <Text>{data[0]}</Text>
                        <Text>{data[7]}</Text>
                        <Text>{data[2]}</Text>
                        <Text>{`${data[4]} ${data[5]} ${data[6]}`}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: 20,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            // borderWidth: 1,
                            // borderColor: "black",
                          }}
                        >
                          <Text
                            style={{ fontWeight: "bold", fontSize: 18 }}
                          >{`${data[16]} LBS`}</Text>
                          <Text
                            style={{
                              fontWeight: "ultrabold",
                              fontSize: 20,
                              marginLeft: 13,
                            }}
                          >
                            1 OF 1
                          </Text>
                        </View>
                        <Text style={{ fontSize: "12px", marginLeft: 8 }}>
                          DWT: {`${data[17]},${data[18]},${data[19]}`}
                        </Text>
                      </View>
                      <View></View>
                    </View>

                    <View style={{ padding: 0, marginTop: 28 }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        SHIP TO:
                      </Text>
                      <View style={{ marginLeft: 12, fontSize: "12px" }}>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            margin: 0,
                          }}
                        >
                          {data[8]}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            margin: 0,
                          }}
                        >
                          {data[15]}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            marginBottom: -1,
                            margin: 0,
                          }}
                        >
                          {data[10]}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            fontWeight: "bold",
                            marginBottom: 1,
                            fontSize: 20,
                          }}
                        >{`${data[12]} ${data[13]} ${data[14]}`}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "30%", padding: 1 }}>
                        <View
                          style={{
                            width: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          {maxiCodeImage && <Image src={maxiCodeImage} />}
                          {/* <Canvas
                            ref={canvasRef}
                            id="mycanvas"
                            style={{ width: 100, height: 100 }}
                          ></Canvas> */}
                        </View>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          height: 110,
                          padding: 0,
                          borderLeftWidth: 1,
                          borderLeftColor: "#000",
                          position: "relative",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 30,
                            marginBottom: 0,
                            zIndex: 10,
                          }}
                        >
                          {`${data[13]} ${
                            data[14]?.slice(0, 3) || ""
                          } 9-${randomTwoDigitNumber}`}
                        </Text>

                        <Image
                          src={barcode}
                          style={{
                            marginVertical: 1,
                            zIndex: 0,
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                          UPS 2ND DAY AIR
                        </Text>
                        <Text style={{ fontSize: "12px" }}>
                          TRACKING #: {trackingId}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 50 }}>
                          2
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 2,
                        height: 2,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        height: 100,
                      }}
                    >
                      <Image src={barcode2} />
                      {/* <Barcode
                        value={trackingId}
                        height={70}
                        width={1}
                        displayValue={false}
                      /> */}
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View>
                      <Text style={{ fontSize: 14 }}>BILLING: P/P</Text>
                      <Text style={{ fontSize: 14 }}>DESC: {data[20]}</Text>
                      <Text
                        style={{
                          marginTop: 20.1,
                          fontWeight: "medium",
                          fontSize: 14,
                        }}
                      >
                        REF #1: {data[21]}
                      </Text>
                      <Text
                        style={{
                          marginTop: 1,
                          fontWeight: "medium",
                          fontSize: 14,
                        }}
                      >
                        {`REF #2: ${data[22]}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "flex-end",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        marginTop: 50,
                        padding: 0.1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: "right",
                          marginRight: 6,
                        }}
                      >
                        {`ISH 13.00F LASER 15.5V ${getCurrentMonth()}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          );
        })}
    </Document>
  );
};

// const DownloadLink = ({ csvData }) => (
//   <div>
// <PDFDownloadLink
//   document={<MyDocument csvData={csvData} />}
//   fileName="your-document.pdf"
// >
//   {({ blob, url, loading, error }) =>
//     loading ? "Loading document..." : "Download PDF"
//   }
// </PDFDownloadLink>
//   </div>
// );

export default MyDocument;
