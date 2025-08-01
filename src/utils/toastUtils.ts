import toast, { ToastOptions } from "react-hot-toast";

export const showSuccessToast = (message: string, options = {}) => {
  return toast.success(message, options);
};

export const showErrorToast = (message: string, options = {}) => {
  return toast.error(message, options);
};

export const showInfoToast = (message: string, options = {}) => {
  return toast(message, options);
};

export const dismissToast = (toastId: string) => {
  if (toastId) {
    toast.dismiss(toastId);
  }
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

export const updateToast = (
  toastId: string,
  message: string,
  type: "success" | "error" | "loading" | "default" = "default",
) => {
  const options: ToastOptions = { id: toastId };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "loading":
      toast.loading(message, options);
      break;
    default:
      toast(message, options);
  }
};

export const toastPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string | ((err: any) => string);
  },
  options = {},
) => {
  return toast.promise(promise, messages, options);
};
