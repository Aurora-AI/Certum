import { cn } from "@/lib/utils";

interface TextMaskProps {
  children: string;
  imageUrl: string;
  className?: string;
}

export function TextMask({ children, imageUrl, className }: TextMaskProps) {
  const safeUrl = imageUrl.replaceAll('"', "%22");
  return (
    <span
      className={cn("bg-center bg-cover bg-no-repeat text-transparent", className)}
      style={{
        backgroundImage: `url("${safeUrl}")`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}
