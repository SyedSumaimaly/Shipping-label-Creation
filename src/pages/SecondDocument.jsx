import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { randomAlphanumeric } from "random-string-alphanumeric-generator";

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
  return (
    <Document>
      {csvData &&
        csvData.length > 0 &&
        csvData.map((data, index) => {
          const trackingId = randomAlphanumeric(18, "uppercase");
          let canvas, canvas2;
          const zipCode = data[14];
          const barcodeValue = `420${
            zipCode?.length === 5 ? zipCode : zipCode.slice(0, 9)
          }`;
          console.log(barcodeValue);
          canvas = document.createElement("canvas");
          JsBarcode(canvas, barcodeValue, {
            displayValue: false,
            width: 1,
            height: 25,
          });
          const barcode = canvas.toDataURL();

          canvas2 = document.createElement("canvas");
          JsBarcode(canvas2, trackingId, {
            displayValue: false,
            width: 1,
            height: 30,
          });
          const barcode2 = canvas2.toDataURL();

          console.log(data, "datadatadatadatadata");
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
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        padding: 8,
                      }}
                    >
                      <View style={{ fontSize: 14 }}>
                        <Text>{data[0]}</Text>
                        <Text>1204723601</Text>
                        <Text>{data[2]}</Text>
                        <Text>{`${data[4]} ${data[5]} ${data[6]}`}</Text>
                      </View>
                      <View>
                        <Text
                          style={{ fontWeight: "bold", fontSize: 18 }}
                        >{`${data[16]} LBS`}</Text>
                        <Text style={{ fontSize: 14 }}>
                          DWT: {getCurrentDate()}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{`${
                          index + 1
                        } OF ${csvData.length}`}</Text>
                      </View>
                    </View>
                    <View style={{ padding: 8 }}>
                      <Text style={{ fontWeight: "bold" }}>SHIP TO:</Text>
                      <View style={{ marginLeft: 12 }}>
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
                          3131378163
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
                        <Text
                          style={{
                            display: "block",
                            fontWeight: "extrabold",
                            marginBottom: 1,
                            fontSize: 24,
                          }}
                        >
                          HAGERSTOWN MD 21740-2116
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
                      <View style={{ width: "30%", padding: 8 }}>
                        <View
                          style={{
                            width: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        ></View>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          borderLeftWidth: 1,
                          borderLeftColor: "#000",
                          padding: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 30,
                            marginBottom: 20,
                          }}
                        >
                          MD 217 9-78
                        </Text>
                        <View style={{ marginTop: -24 }}>
                          {/* <Barcode value="barcode-example" /> */}
                          <Image src={barcode} />
                          {/* <Barcode
                            value="ABC123"
                            options={{ format: "code128" }}
                            renderer="svg"
                          /> */}
                        </View>
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
                          UPS GROUND
                        </Text>
                        <Text style={{}}>TRACKING #: {trackingId}</Text>
                      </View>
                      <View>
                        <View
                          style={{
                            // margin: 'auto',
                            backgroundColor: "black",
                            width: 60,
                            height: 60,
                            display: "flex",
                            justifyContent: "flex-end",
                            // alignItems: "baseline",
                            alignContent: "flex-end",
                          }}
                        ></View>
                        {/* <Text style={{ fontWeight: "bold", fontSize: 50 }}>
                          2
                        </Text> */}
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
                      style={{ flexDirection: "row", justifyContent: "center" }}
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
                      {/* <Text style={{ fontSize: 14 }}>DESC: {data[20]}</Text>
                      <Text
                        style={{
                          marginTop: 1,
                          fontWeight: "medium",
                          fontSize: 14,
                        }}
                      >
                        REF #1: {data[21]}
                      </Text> */}
                    </View>
                    <View
                      style={{
                        flexDirection: "flex-end",
                        justifyContent: "flex-end",
                        marginTop: 20,
                        padding: 8,
                      }}
                    >
                      <Text style={{ fontSize: 14, textAlign: "right" }}>
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
