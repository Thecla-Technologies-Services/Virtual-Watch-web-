import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | string;
  height?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  width = "lg",
  height = "lg",
}: ModalProps) {
  const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full",
  }[width] || "max-w-lg";

  const maxHeightClass = {
    sm: "max-h-[30vh]",
    md: "max-h-[50vh]",
    lg: "max-h-[70vh]",
    xl: "max-h-[80vh]",
    "2xl": "max-h-[85vh]",
    "3xl": "max-h-[90vh]",
    "4xl": "max-h-[92vh]",
    "5xl": "max-h-[95vh]",
    full: "max-h-screen",
  }[height] ?? "";

  // Listen for Escape key and manage scroll locking
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content Card */}
      <div 
        className={cn(
          "relative w-full rounded-3xl bg-white p-4 z-50 border border-slate-100 animate-scale-up flex flex-col",
          maxWidthClass,
          maxHeightClass,
          className
        )}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-6 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer z-10"
        >
          <X size={16} />
        </button>

        {/* Optional Title Header */}
        {title && (
          <h3 className="text-base font-bold text-slate-800 mb-4 pr-6 shrink-0">
            {title}
          </h3>
        )}

        {/* Inner Content */}
        <div className="overflow-y-auto min-h-0 pr-2 -mr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
