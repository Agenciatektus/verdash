
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wider font-grotesk",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-to-r from-verdash-cyan to-verdash-success text-white shadow hover:brightness-110",
        secondary: "border-transparent bg-verdash-input-bg text-white hover:bg-verdash-divider",
        destructive: "border-transparent bg-gradient-to-r from-verdash-error to-red-600 text-white shadow hover:brightness-110",
        outline: "text-white border-verdash-divider hover:bg-verdash-input-bg/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
