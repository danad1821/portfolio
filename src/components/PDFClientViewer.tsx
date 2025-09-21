"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useWindowDimensions } from "hooks/useWindowDimensions";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewerClient = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { width } = useWindowDimensions(); // ⬅️ Get the window width

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1); // ⬅️ Function to calculate the responsive width

  const getPageWidth = () => {
    // If the screen is small (e.g., mobile), use a smaller, dynamic width
    if (width < 768) {
      return width * 0.9; // 90% of the viewport width
    } // For larger screens, use a fixed maximum width or a slightly smaller percentage
    return Math.min(800, width * 0.8); // 80% of viewport width, maxing out at 800px
  };

  return (
    <div style={{ padding: "2rem" }}>
      {" "}
      {numPages > 1 ? (
        <nav
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: pageNumber <= 1 ? "#ccc" : "#2D4734",
              color: "white",
              border: "none",
              cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
            }}
            className="rounded-md text-white p-2 m-2"
          >
            <FaChevronLeft></FaChevronLeft>{" "}
          </button>{" "}
          <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
            Page {pageNumber} of {numPages || "..."}{" "}
          </p>{" "}
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: pageNumber >= numPages ? "#ccc" : "#2D4734",
              color: "white",
              border: "none",
              cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
            }}
            className="rounded-md text-white p-2 m-2"
          >
            <FaChevronRight />{" "}
          </button>{" "}
        </nav>
      ) : (
        <div></div>
      )}{" "}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        <Document
          file="Dana Dabdoub - Resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading PDF...{" "}
            </div>
          }
          error={
            <div
              className="rounded-lg"
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "red",
              }}
            >
              Failed to load PDF. Please make sure the file exists in the public
              folder.{" "}
            </div>
          }
        >
          {" "}
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={getPageWidth()} // ⬅️ Use the responsive width
          />{" "}
        </Document>{" "}
      </div>{" "}
    </div>
  );
};

export default PDFViewerClient;
