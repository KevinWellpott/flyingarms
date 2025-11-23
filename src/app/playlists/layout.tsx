import Footer from "@/sections/global-sections/Footer";
import Header from "@/sections/global-sections/Header";

export default function PlaylistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '90px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
