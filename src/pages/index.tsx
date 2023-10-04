import { CallToAction } from '@/components/landing/CallToAction';
import { Faqs } from '@/components/landing/Faqs';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Posts } from '@/components/landing/Posts';
import { Pricing } from '@/components/landing/Pricing';
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures';
import { Testimonials } from '@/components/landing/Testimonials';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { allPosts } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Posts />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
