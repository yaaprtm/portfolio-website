import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "cyan" | "blue" | "green" | "amber" | "default";
}

const variantStyles = {
  cyan: "bg-cyan-neon/10 text-cyan-neon border-cyan-neon/20",
  blue: "bg-blue-electric/10 text-blue-400 border-blue-400/20",
  green: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  amber: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  default: "bg-white/5 text-slate-400 border-white/10",
};

/**
 * Badge / tag component for displaying tech stack, categories, etc.
 */
export default function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border transition-all",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
