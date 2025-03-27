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
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "14px",
          maxWidth: "500px",
          padding: "10px 24px",
          fontWeight: "500",
          background: "white",
          color: "rgb(33, 21, 21)",
        },
      }}
    />
  );
}
