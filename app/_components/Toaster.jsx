"use client";
import { Toaster } from "react-hot-toast";
export default function ToasterComp() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{ margin: "8px", fontFamily: "Poppins" }}
      toastOptions={{
        success: {
          duration: 10000,
          style: {
            background: "#8E721D",
            color: "white",
          },
        },
        error: {
          duration: 7000,
        },
        style: {
          fontSize: "15px",
          maxWidth: "500px",
          padding: "10px 24px",
          fontWeight: "500",
          background: "white",
          color: "rgb(33, 21, 21)",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 0 10px rgba(0, 0, 0,0.2)",
        },
      }}
    />
  );
}
