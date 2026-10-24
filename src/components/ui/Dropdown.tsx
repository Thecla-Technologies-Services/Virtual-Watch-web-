import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
  menuClassName?: string;
}

export function Dropdown({
  trigger,
  children,
  align = "right",
  className,
  menuClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside the dropdown container
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close when pressing Escape key
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger Wrapper */}
      <div 
        onClick={() => setIsOpen((prev) => !prev)} 
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Dropdown Menu Portal/Content */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)} // Close when any item inside is clicked
          className={cn(
            "absolute mt-2 w-48 rounded-2xl bg-white border border-slate-100 p-1.5 z-50 animate-fade-in duration-150",
            align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left",
            menuClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function DropdownItem({
  onClick,
  children,
  className,
  icon,
}: DropdownItemProps) {
  return (
    <button
      onClick={(e) => {
        // Prevent click events from propagating to parent components
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer outline-none focus:bg-slate-50",
        className
      )}
    >
      {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="border-t border-slate-50 my-1" />;
}
