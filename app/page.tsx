import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import SystemSelection from '@/components/SystemSelection/SystemSelection';
import Solutions from '@/components/Solutions/Solutions';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Projects from '@/components/Projects/Projects';
import About from '@/components/About/About';
import FAQ from '@/components/FAQ/FAQ';
import ConsultationCTA from '@/components/ConsultationCTA/ConsultationCTA';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <SystemSelection />
        <Solutions />
        <HowItWorks />
        <Projects />
        <About />
        <FAQ />
        <ConsultationCTA />
      </main>

      <Footer />
    </>
  );
}
