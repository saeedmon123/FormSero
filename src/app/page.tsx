import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { BookIntro } from "@/components/sections/BookIntro";
import { Editions } from "@/components/sections/Editions";
import { Comparison } from "@/components/sections/Comparison";
import { Proof } from "@/components/sections/Proof";
import { InsideBook } from "@/components/sections/InsideBook";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { ProofIsThePage } from "@/components/sections/ProofIsThePage";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <ScrollStory />
        <BookIntro />
        <Editions />
        <Comparison />
        <Proof />
        <InsideBook />
        <WhoItsFor />
        <ProofIsThePage />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
