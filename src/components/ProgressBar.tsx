import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({ value, className, size = "md" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const heights = { sm: "h-1.5", md: "h-3", lg: "h-5" };

  return (
    <div className={cn("w-full rounded-full bg-secondary overflow-hidden", heights[size], className)}>
      <motion.div
        className={cn(
          "h-full rounded-full gradient-primary",
          clamped >= 100 && "bg-success"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={clamped >= 100 ? { background: "hsl(var(--success))" } : undefined}
      />
    </div>
  );
}
