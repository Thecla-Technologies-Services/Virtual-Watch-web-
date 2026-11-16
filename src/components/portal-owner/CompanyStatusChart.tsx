interface StatusSegment {
  label: string;
  count: number;
  color: string;
}

const STATUS_DATA: StatusSegment[] = [
  { label: "Active", count: 218, color: "#00C48C" },
  { label: "Suspended", count: 47, color: "#FFA940" },
  { label: "Expired", count: 23, color: "#FF0E0E" },
  { label: "Trial", count: 0, color: "#7C69EF" },
];

export function CompanyStatusChart() {
  const size = 210;
  const center = size / 2;
  const radius = 74;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  const nonZeroSegments = STATUS_DATA.filter((s) => s.count > 0);
  const total = nonZeroSegments.reduce((acc, s) => acc + s.count, 0);

  // Gap in arc length between rounded-cap segments
  const gapLength = strokeWidth * 1.15;
  const usableCircumference = circumference - gapLength * nonZeroSegments.length;

  // Start angle so Red sits on the right (~15 deg to ~45 deg), Orange bottom-right, Green covers top/left/bottom
  let cumulativeOffset = circumference * 0.14;

  const arcs = nonZeroSegments.map((seg) => {
    const segLength = (seg.count / total) * usableCircumference;
    const dashArray = `${segLength} ${circumference - segLength}`;
    const dashOffset = -cumulativeOffset;
    cumulativeOffset += segLength + gapLength;

    return {
      ...seg,
      dashArray,
      dashOffset,
    };
  });

  // Order arcs so Green is at the right-to-top-left-bottom, Orange at bottom-right, Red at right
  // Re-order display: Expired (Red) -> Suspended (Orange) -> Active (Green) clockwise from ~5 deg
  let clockOffset = circumference * 0.02;
  const orderedForClock = [
    STATUS_DATA[2], // Expired (Red)
    STATUS_DATA[1], // Suspended (Orange)
    STATUS_DATA[0], // Active (Green)
  ];
  const clockArcs = orderedForClock.map((seg) => {
    const segLength = (seg.count / total) * usableCircumference;
    const dashArray = `${segLength} ${circumference - segLength}`;
    const dashOffset = -clockOffset;
    clockOffset += segLength + gapLength;
    return {
      ...seg,
      dashArray,
      dashOffset,
    };
  });

  // Unused variable guard
  void arcs;

  return (
    <div className="bg-white rounded-2xl p-6  border border-slate-100/80 h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-800">
          COMPANY STATUS
        </h3>
        <p className="text-[12px] text-slate-400 font-medium mt-0.5">
          Distribution across 203 accounts
        </p>
      </div>

      {/* Donut SVG */}
      <div className="flex items-center justify-center my-4">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {clockArcs.map((arc) => (
            <circle
              key={arc.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2">
        {STATUS_DATA.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-[11px]">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-400 font-medium">{item.label}</span>
            <span className="text-slate-700 font-bold">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

