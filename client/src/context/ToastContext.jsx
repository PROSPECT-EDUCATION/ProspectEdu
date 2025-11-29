import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ui/Toast";
import ErrorToast from "../components/ui/ErrorToast";   // ✅ added

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        toast.type === "error" ? (
          <ErrorToast
            message={toast.message}
            onClose={() => setToast(null)}
          />
        ) : (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )
      )}
    </ToastContext.Provider>
  );
}
