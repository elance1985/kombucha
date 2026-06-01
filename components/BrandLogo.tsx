import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** Navbar: horizontal lockup. Footer: icon only (inverted on dark bg). */
  variant?: "navbar" | "footer";
  className?: string;
  onClick?: () => void;
};

export default function BrandLogo({
  variant = "navbar",
  className = "",
  onClick,
}: BrandLogoProps) {
  if (variant === "footer") {
    return (
      <Image
        src="/logo-icon.png"
        alt="Mondo Kombucha"
        width={48}
        height={48}
        className={`h-12 w-12 object-contain brightness-0 invert ${className}`}
      />
    );
  }

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-80 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Mondo Kombucha"
        width={194}
        height={59}
        className="h-9 w-auto max-w-[min(100%,11rem)] object-contain object-left sm:max-w-none md:h-11"
        priority
      />
    </Link>
  );
}
