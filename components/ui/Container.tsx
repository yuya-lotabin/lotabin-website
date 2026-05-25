import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "default" | "wide" | "full";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  size?: ContainerSize;
  children: ReactNode;
};

const sizes: Record<ContainerSize, string> = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none"
};

export function Container({ as, size = "default", className, children, ...props }: ContainerProps) {
  const Component = as ?? "div";

  return (
    <Component className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)} {...props}>
      {children}
    </Component>
  );
}
