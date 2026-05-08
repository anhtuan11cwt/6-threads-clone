"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="dialog"
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white" id="modal-title">
            {title}
          </h2>
          <button
            className="rounded-full p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
