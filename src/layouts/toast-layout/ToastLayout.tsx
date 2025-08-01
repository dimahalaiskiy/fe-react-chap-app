import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

interface ToastLayoutProps {
  children: ReactNode;
}

export const ToastLayout = ({ children }: ToastLayoutProps) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#232528",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "350px",
            margin: "0 auto",
          },
          success: {
            iconTheme: {
              primary: "#2d88ff",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4d4f",
              secondary: "#ffffff",
            },
            style: {
              borderLeft: "4px solid #ff4d4f",
            },
          },
          loading: {
            iconTheme: {
              primary: "rgba(255, 255, 255, 0.7)",
              secondary: "#232528",
            },
          },
        }}
      />
    </>
  );
};
