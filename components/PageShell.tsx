import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <>
      <Navbar />
      <div className={`min-h-[calc(100vh-4rem)] ${className}`}>{children}</div>
      <Footer />
    </>
  );
}
