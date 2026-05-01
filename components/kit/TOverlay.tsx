"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { TButton } from "./TButton";

/* ---------- Modal ---------- */
export function TModal({
  open, onClose, title, children, footer, className = "",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="t-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`t-modal ${className}`} role="dialog" aria-modal="true">
        {(title || true) && (
          <div className="t-modal__header">
            {title && <h3 className="t-modal__title">{title}</h3>}
            <button className="t-modal__close" onClick={onClose} aria-label="Close">×</button>
          </div>
        )}
        <div className="t-modal__body">{children}</div>
        {footer && <div className="t-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
export const TrainovateModal = TModal;

/* ---------- Toast ---------- */
type ToastTone = "info" | "success" | "warning" | "danger";
interface ToastItem { id: number; msg: ReactNode; tone: ToastTone }
interface ToastCtx { push: (msg: ReactNode, tone?: ToastTone) => void }

const ToastContext = createContext<ToastCtx>({ push: () => {} });

export function TToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((msg: ReactNode, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, msg, tone }]);
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 2800);
  }, []);
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        {items.map((i) => (
          <div
            key={i.id}
            style={{
              background: "var(--t-fg)",
              color: "var(--t-bg)",
              padding: "12px 20px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              boxShadow: "var(--t-shadow-md)",
              animation: "tToastIn 200ms ease-out",
            }}
          >
            {i.msg}
          </div>
        ))}
      </div>
      <style>{`@keyframes tToastIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </ToastContext.Provider>
  );
}

export function useToast() { return useContext(ToastContext); }
export const TrainovateToastProvider = TToastProvider;
export const useTrainovateToast = useToast;
