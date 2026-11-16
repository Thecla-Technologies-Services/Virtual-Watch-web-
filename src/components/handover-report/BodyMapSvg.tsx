import type { BodyMarker } from "./types";

interface BodyMapSvgProps {
  markers: BodyMarker[];
  pendingPoint?: { x: number; y: number } | null;
  interactive?: boolean;
  onMapClick?: (x: number, y: number) => void;
  highlightLeftArm?: boolean;
}

export function BodyMapSvg({
  markers,
  pendingPoint,
  interactive = false,
  onMapClick,
  highlightLeftArm = false,
}: BodyMapSvgProps) {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onMapClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    onMapClick(x, y);
  };

  return (
    <div className="relative w-[150px] mx-auto select-none">
      <svg
        viewBox="0 0 140 220"
        onClick={handleClick}
        className={`w-full h-auto ${interactive ? "cursor-crosshair" : ""}`}
      >
        {/* Head */}
        <circle
          cx="70"
          cy="30"
          r="16"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* Left Arm (viewer's left) */}
        <rect
          x="18"
          y="52"
          width="24"
          height="68"
          rx="4"
          fill={highlightLeftArm ? "#FEE2E2" : "#FFFFFF"}
          stroke={highlightLeftArm ? "#FCA5A5" : "#BAE6FD"}
          strokeWidth="1.5"
        />
        {/* Torso */}
        <rect
          x="44"
          y="52"
          width="52"
          height="78"
          rx="4"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* Right Arm (viewer's right) */}
        <rect
          x="98"
          y="52"
          width="24"
          height="68"
          rx="4"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* Left Leg */}
        <rect
          x="46"
          y="134"
          width="22"
          height="58"
          rx="3"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* Right Leg */}
        <rect
          x="72"
          y="134"
          width="22"
          height="58"
          rx="3"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* Left Foot */}
        <rect
          x="46"
          y="196"
          width="22"
          height="12"
          rx="6"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        {/* Right Foot */}
        <rect
          x="72"
          y="196"
          width="22"
          height="12"
          rx="6"
          fill="#FFFFFF"
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />

        {/* Existing Markers */}
        {markers.map((m) => (
          <circle
            key={m.id}
            cx={(m.x / 100) * 140}
            cy={(m.y / 100) * 220}
            r="5"
            fill="#EF4444"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        ))}

        {/* Pending Marker */}
        {pendingPoint && (
          <circle
            cx={(pendingPoint.x / 100) * 140}
            cy={(pendingPoint.y / 100) * 220}
            r="5"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        )}
      </svg>
    </div>
  );
}

