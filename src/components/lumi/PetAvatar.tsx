import type { CompanionType } from "@/lib/lumi/types";
import { cn } from "@/lib/utils";

interface Props {
  type: CompanionType;
  size?: number;
  className?: string;
  animate?: boolean;
}

export function PetAvatar({ type, size = 64, className, animate }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-warm shadow-soft",
        animate && "transition-transform duration-500 hover:scale-105",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span style={{ fontSize: size * 0.55, lineHeight: 1 }}>
        {emojiFor(type)}
      </span>
    </div>
  );
}

export function emojiFor(type: CompanionType) {
  switch (type) {
    case "cat":
      return "🐱";
    case "dog":
      return "🐶";
    case "box":
      return "📦";
    case "soda":
      return "🥤";
  }
}

export function labelFor(type: CompanionType) {
  switch (type) {
    case "cat":
      return "Quiet Cat";
    case "dog":
      return "Loyal Dog";
    case "box":
      return "Cardboard Box";
    case "soda":
      return "Soda Can";
  }
}
