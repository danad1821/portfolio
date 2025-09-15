"use client";
import dynamic from "next/dynamic";
import PDFViewerClient from "./PDFClientViewer";
// Dynamically import the PDF viewer client component.
// const PDFViewerClient = dynamic(() => import("/app/components/PDFViewerClient"), {
//   ssr: false,
//   loading: () => (
//     <div
//       style={{
//         padding: "2rem",
//         textAlign: "center",
//         fontSize: "1.2rem",
//         color: "#333",
//       }}
//     >
//       Loading PDF Viewer...
//     </div>
//   ),
// });

const PDFViewer = () => {
  return <PDFViewerClient />;
};
export default PDFViewer;