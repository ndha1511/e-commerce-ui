import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Toasts {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const NotificationButton = ({ type, message }: Toasts) => {
  const notify = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toastTypes: { [key: string]: any } = {
      success: toast.success,
      error: toast.error,
      warning: toast.warning,
      info: toast.info,
    };

    // Hiển thị thông báo
    toastTypes[type](message, {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Gọi notify khi nhận được thông báo
  useEffect(() => {
    if (type || message) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, message]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default NotificationButton;
