'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import SystemSelection from '@/components/SystemSelection/SystemSelection';
import SystemSelectionQuiz from '@/components/SystemSelectionQuiz/SystemSelectionQuiz';
import Solutions from '@/components/Solutions/Solutions';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Projects from '@/components/Projects/Projects';
import About from '@/components/About/About';
import FAQ from '@/components/FAQ/FAQ';
import ConsultationCTA from '@/components/ConsultationCTA/ConsultationCTA';
import Footer from '@/components/Footer/Footer';
import ConsultationModal from '@/components/Header/ConsultationModal/ConsultationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onConsultationClick={() => setIsModalOpen(true)} />

      <main>
        <Hero onConsultationClick={() => setIsModalOpen(true)} />
        <SystemSelection onConsultationClick={() => setIsModalOpen(true)} />
        <SystemSelectionQuiz />
        <Solutions />
        <HowItWorks />
        <Projects />
        <About />
        <FAQ />
        <ConsultationCTA />
      </main>

      <Footer />

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
