import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto mt-16 w-full">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
