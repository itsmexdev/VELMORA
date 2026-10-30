"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CircleCheckBig, CircleAlert, X } from "lucide-react";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastItem["type"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, type: ToastItem["type"] = "success") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 px-4 pb-6 sm:items-end sm:px-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`fade-in pointer-events-auto flex w-full max-w-sm items-start gap-3 border bg-ivory px-4 py-3 shadow-[0_12px_30px_rgba(32,28,25,0.12)] ${
              t.type === "error" ? "border-burgundy/40" : "border-line"
            }`}
          >
            {t.type === "error" ? (
              <CircleAlert size={18} className="mt-0.5 shrink-0 text-burgundy" />
            ) : (
              <CircleCheckBig size={18} className="mt-0.5 shrink-0 text-olive-dark" />
            )}
            <p className="flex-1 text-sm leading-snug text-charcoal">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-charcoal-soft/60 hover:text-charcoal"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
