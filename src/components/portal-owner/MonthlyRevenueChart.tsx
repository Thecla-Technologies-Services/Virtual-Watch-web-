import { useState } from "react";
import { TrendingUp } from "lucide-react";

interface DataPoint {
  label: string;
  month: string;
  value: number; // in thousands ($k)
}

const MRR_DATA: DataPoint[] = [
  { label: "Jan 1", month: "Jan", value: 66 },
  { label: "Jan 15", month: "", value: 16 },
  { label: "Feb 1", month: "Feb", value: 51 },
  { label: "Feb 15", month: "", value: 59 },
  { label: "Mar 1", month: "Mar", value: 21 },
  { label: "Mar 15", month: "", value: 22 },
  { label: "Apr 1", month: "Apr", value: 64 },
  { label: "Apr 15", month: "", value: 91 },
  { label: "May 1", month: "May", value: 59 },
  { label: "May 15", month: "", value: 21 },
  { label: "Jun 1", month: "Jun", value: 43 },
  { label: "Jun 15", month: "", value: 23 },
];

const Y_TICKS = [0, 20, 40, 60, 80, 100];
const MAX_VAL = 100;

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const tension = 0.2;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return path;
}

export function MonthlyRevenueChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const svgW = 680;
  const svgH = 250;
  const padLeft = 48;
  const padRight = 20;
  const padTop = 16;
  const padBottom = 32;

  const plotW = svgW - padLeft - padRight;
  const plotH = svgH - padTop - padBottom;

  const points = MRR_DATA.map((d, i) => ({
    x: padLeft + (i / (MRR_DATA.length - 1)) * plotW,
    y: padTop + plotH - (d.value / MAX_VAL) * plotH,
    ...d,
  }));

  const linePath = buildSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padTop + plotH} L ${points[0].x} ${padTop + plotH} Z`;

  return (
    <div className="bg-white rounded-2xl p-6  border border-slate-100/80 h-full flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-800">
            MONTHLY RECURRING REVENUE
          </h3>
          <p className="text-[12px] text-slate-400 font-medium mt-0.5">
            Jan 2024 – Jul 2024
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#22C55E] bg-[#E8F8EE] px-3 py-1 rounded-full shrink-0">
          <TrendingUp size={13} strokeWidth={2.5} />
          +72% YTD
        </span>
      </div>

      {/* SVG Area Chart */}
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <defs>
            <linearGradient id="mrrAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C69EF" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#7C69EF" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal dashed gridlines & Y-axis labels */}
          {Y_TICKS.map((tick) => {
            const y = padTop + plotH - (tick / MAX_VAL) * plotH;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgW - padRight}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : "3 3"}
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#94A3B8"
                  fontWeight="500"
                >
                  ${tick}k
                </text>
              </g>
            );
          })}

          {/* Vertical dashed gridlines at each data point */}
          {points.map((pt, idx) => (
            <line
              key={`v-${idx}`}
              x1={pt.x}
              y1={padTop}
              x2={pt.x}
              y2={padTop + plotH}
              stroke="#F1F5F9"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

          {/* Shaded Area */}
          <path d={areaPath} fill="url(#mrrAreaGradient)" />

          {/* Smooth Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#7C69EF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* X-axis Month Labels */}
          {points.map((pt, idx) =>
            pt.month ? (
              <text
                key={`x-${idx}`}
                x={pt.x + 14}
                y={svgH - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#94A3B8"
                fontWeight="500"
              >
                {pt.month}
              </text>
            ) : null
          )}

          {/* Data Point Circles + Hover Hit Areas */}
          {points.map((pt, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g
                key={`pt-${idx}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={14}
                  fill="transparent"
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5 : 3.5}
                  fill="#FFFFFF"
                  stroke="#7C69EF"
                  strokeWidth={isHovered ? 2.5 : 1.75}
                  style={{ transition: "r 0.15s ease" }}
                />
              </g>
            );
          })}

          {/* Interactive Tooltip */}
          {hoveredIdx !== null && (() => {
            const pt = points[hoveredIdx];
            const tipW = 92;
            const tipH = 42;
            const tx = Math.min(Math.max(pt.x - tipW / 2, padLeft), svgW - padRight - tipW);
            const ty = Math.max(4, pt.y - tipH - 12);
            return (
              <g pointerEvents="none">
                <rect
                  x={tx}
                  y={ty}
                  width={tipW}
                  height={tipH}
                  rx={8}
                  fill="#1E293B"
                />
                <text
                  x={tx + tipW / 2}
                  y={ty + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#94A3B8"
                  fontWeight="500"
                >
                  {pt.label}
                </text>
                <text
                  x={tx + tipW / 2}
                  y={ty + 32}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#FFFFFF"
                  fontWeight="700"
                >
                  ${pt.value},000
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}

