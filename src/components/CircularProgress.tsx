interface CircularProgressProps {
  value: number;
  maxValue: number;
  label: string;
  color: "primary" | "chart-1" | "chart-2";
}

const CircularProgress = ({ value, maxValue, label, color }: CircularProgressProps) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: "stroke-primary",
    "chart-1": "stroke-[hsl(var(--chart-1))]",
    "chart-2": "stroke-[hsl(var(--chart-2))]",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={colorClasses[color]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">/ {maxValue}</span>
        </div>
      </div>
      <span className="text-lg font-medium text-foreground">{label}</span>
    </div>
  );
};

export default CircularProgress;
