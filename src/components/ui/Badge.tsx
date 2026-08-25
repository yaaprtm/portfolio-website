import { memo } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "cyan" | "blue" | "green" | "amber" | "default";
}

const variantStyles = {
  cyan: "bg-white/[0.04] text-slate-200 border-white/10 hover:border-white/30 hover:bg-white/[0.08]",
  blue: "bg-white/[0.04] text-slate-200 border-white/10 hover:border-white/30 hover:bg-white/[0.08]",
  green: "bg-emerald-950/40 text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40",
  amber: "bg-amber-950/40 text-amber-300 border-amber-500/20 hover:border-amber-500/40",
  default: "bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.06]",
};

/**
 * Professional Badge / Tag component — minimal, refined, human-designed.
 */
const Badge = memo(function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border border-white/10 shadow-sm transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
});

export default Badge;
