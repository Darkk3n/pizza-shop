import Image from "next/image";
import { cn } from "@/lib/utils";

// public/logo.png is 1120 × 1085 with a white background, so it sits on white surfaces (header,
// sidebar, cards) or gets rounded corners elsewhere.
const LOGO_RATIO = 1085 / 1120;

type BrandLogoProps = {
  // Rendered width in CSS pixels; next/image serves a 1x/2x file for it, not the full PNG.
  size: number;
  className?: string;
  // Empty by default: every placement sits next to the restaurant name, so the image is decorative.
  alt?: string;
};

export const BrandLogo = ({ size, className, alt = "" }: BrandLogoProps) => {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={size}
      height={Math.round(size * LOGO_RATIO)}
      className={cn("shrink-0 rounded-md", className)}
    />
  );
};
