import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import WhatIsKombucha from "@/components/WhatIsKombucha";
import ContentCategories from "@/components/ContentCategories";
import WhyMondoKombucha from "@/components/WhyMondoKombucha";
import NewsletterSignup from "@/components/NewsletterSignup";
import ShopBanner from "@/components/ShopBanner";

export default function Home() {
  return (
    <PageShell>
      <main>
        <Hero />
        <WhatIsKombucha />
        <ContentCategories />
        <WhyMondoKombucha />
        <NewsletterSignup />
        <ShopBanner />
      </main>
    </PageShell>
  );
}
