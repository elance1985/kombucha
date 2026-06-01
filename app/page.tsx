import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIsKombucha from "@/components/WhatIsKombucha";
import ContentCategories from "@/components/ContentCategories";
import WhyMondoKombucha from "@/components/WhyMondoKombucha";
import NewsletterSignup from "@/components/NewsletterSignup";
import ShopBanner from "@/components/ShopBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsKombucha />
        <ContentCategories />
        <WhyMondoKombucha />
        <NewsletterSignup />
        <ShopBanner />
      </main>
      <Footer />
    </>
  );
}
