import { CallToAction } from '@/components/landing/CallToAction';
import { Faqs } from '@/components/landing/Faqs';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Pricing } from '@/components/landing/Pricing';
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures';
import { Testimonials } from '@/components/landing/Testimonials';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Fragment } from 'react';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
