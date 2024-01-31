import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { randomAlphanumeric } from "random-string-alphanumeric-generator";

// import { Barcode } from "@react-pdf/barcode";
import Barcode from "react-barcode";
import bwipjs from "bwip-js";

// import Barcode from "react-jsbarcode";
Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "../../public/Poppins/Poppins-SemiBold.ttf",
      fontWeight: 600,
    },
    {
      src: "../../public/Poppins/Poppins-Bold.ttf",
      fontWeight: 700,
    },
    {
      src: "../../public/Poppins/Poppins-ExtraBold.ttf",
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  semiBoldText: {
    fontFamily: "Poppins",
    fontWeight: 600,
  },
  boldText: {
    fontWeight: 700, // This will use the 700 font weight
    fontFamily: "Poppins",
  },
  extraboldText: {
    fontWeight: 900,
    fontFamily: "Poppins",
  },
  normal: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 12,
  },
  normalTwo: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 10,
  },
  second: {
    fontWeight: 700,
    fontSize: 42,
    fontFamily: "Poppins",
    paddingRight: 4,
    marginTop: -8,
  },
  hager: {
    fontWeight: 700,
    fontFamily: "Poppins",
    display: "block",
    // marginTop: 1,
    // marginBottom: 1,
    fontSize: 16,
  },
});

const SecondDocument = ({ csvData }) => {
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
  const generateBarCodeImage = (barcodeValueThree) => {
    const canvas = document.createElement("canvas");
    try {
      bwipjs.toCanvas(canvas, {
        bcid: "code11",
        text: barcodeValueThree,
        scale: 1,
        height: 10,
        includetext: false,
        textxalign: "center",
      });
      return canvas.toDataURL();
    } catch (e) {
      console.error("Error generating MaxiCode:", e);
      return null;
    }
  };
  const generateBarCodeTwoImage = (barcodeValueFour) => {
    const canvas = document.createElement("canvas");
    try {
      bwipjs.toCanvas(canvas, {
        bcid: "code128",
        text: barcodeValueFour,
        scale: 1,
        height: 10,
        includetext: false,
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
          // let canvas, canvas2;
          const zipCode = data[14];
          const barcodeValue = `420${
            zipCode?.length === 5 ? zipCode : zipCode?.slice(0, 9)
          }`;
          console.log(barcodeValue);
          // canvas = document.createElement("canvas");
          // JsBarcode(canvas, barcodeValue, {
          //   displayValue: false,
          //   width: 1,
          //   height: 25,
          // });
          // const barcode = canvas.toDataURL();

          // canvas2 = document.createElement("canvas");
          // JsBarcode(canvas2, trackingId, {
          //   displayValue: false,
          //   width: 1,
          //   height: 30,
          // });
          // const barcode2 = canvas2.toDataURL();
          const barcodeOne = generateBarCodeImage(barcodeValue);
          const barcodeTwo = generateBarCodeTwoImage(trackingId);
          const randomTwoDigitNumber = Math.floor(Math.random() * 90) + 10;

          return (
            <Page size="A6" key={index} id={`content-id-${index}`}>
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
                        padding: 2,
                        // justifyContent: "space-between",
                      }}
                    >
                      <View style={{ fontSize: "8px" }}>
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
                          marginLeft: 30,
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: 75,
                            // borderWidth: 1,
                            // borderColor: "black",
                          }}
                        >
                          <Text style={styles.normal}>{`${data[16]} LBS`}</Text>
                          <Text style={styles.normal}>1 OF 1</Text>
                        </View>
                        <Text style={{ fontSize: "8px", marginLeft: 20 }}>
                          DWT: {`${data[17]},${data[18]},${data[19]}`}
                        </Text>
                      </View>
                      <View></View>
                    </View>

                    <View style={{ padding: 0, marginTop: 16, paddingLeft: 2 }}>
                      <Text style={styles.normalTwo}>SHIP TO:</Text>
                      <View
                        style={{
                          marginLeft: 12,
                          fontSize: "9px",
                          marginTop: -2,
                        }}
                      >
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
                          style={
                            ({
                              display: "block",
                              fontWeight: "bold",
                              marginBottom: 1,
                              fontSize: "14",
                              marginTop: 6,
                            },
                            styles.boldText)
                          }
                        >{`${data[13]} ${data[14]}`}</Text>
                        <Text style={styles.hager}>
                          {`HAGERSTOWN ${data[13]} ${data[14]}`}
                        </Text>
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
                            width: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          {maxiCodeImage && <Image src={maxiCodeImage} />}
                        </View>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          height: 80,
                          padding: 0,
                          paddingLeft: 4,
                          borderLeftWidth: 1,
                          borderLeftColor: "#000",
                          position: "relative",
                        }}
                      >
                        <Text
                          style={
                            ({
                              fontSize: 22,
                              marginBottom: 0,
                              zIndex: 10,
                              // padddingLeft: 10,
                              marginTop: 2,
                            },
                            styles.extraboldText)
                          }
                        >
                          {`${data[13]} ${
                            data[14]?.slice(0, 3) || ""
                          } 9-${randomTwoDigitNumber}`}
                        </Text>
                        {barcodeOne && (
                          <Image
                            src={barcodeOne}
                            style={{
                              width: 150,
                              height: 45,
                              paddingVertical: 1,
                              // borderWidth: 1,
                              // borderColor: "black",
                              // margin: "auto",
                              // marginHorizontal: "auto",
                              marginLeft: 8,
                            }}
                          />
                        )}
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
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        // marginBottom: -10,
                      }}
                    >
                      <View style={{ marginLeft: 3 }}>
                        <Text style={({ fontSize: "24px" }, styles.boldText)}>
                          UPS GROUND
                        </Text>
                        <Text
                          style={{
                            fontSize: "10px",
                            paddingHorizontal: 2,
                            // paddingBottom: 1,
                            // marginVertical: 1,
                          }}
                        >
                          TRACKING #: {trackingId}
                        </Text>
                      </View>
                      <View
                        style={{
                          // margin: 'auto',
                          marginVertical: -0.2,
                          backgroundColor: "black",
                          width: 40,
                          height: 41,
                          display: "flex",
                          justifyContent: "flex-end",
                          // alignItems: "baseline",
                          alignContent: "flex-end",
                        }}
                      ></View>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 2,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        height: 90,
                        width: 220,
                        marginHorizontal: "auto",
                        paddingVertical: 6,
                        // paddingHorizontal: 2,
                      }}
                    >
                      {barcodeTwo && <Image src={barcodeTwo} />}
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "#000",
                      }}
                    ></View>
                    <View style={{ padding: 1 }}>
                      <Text style={{ fontSize: "8px" }}>BILLING: P/P</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "flex-end",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        marginTop: 33.8,
                        padding: 0.1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "7px",
                          textAlign: "right",
                          marginRight: 8,
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
//   document={<SecondDocument csvData={csvData} />}
//   fileName="your-document.pdf"
// >
//   {({ blob, url, loading, error }) =>
//     loading ? "Loading document..." : "Download PDF"
//   }
// </PDFDownloadLink>
//   </div>
// );

export default SecondDocument;
