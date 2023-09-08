import { Layout } from '@/components/layouts/auth-layout';
import {
  OnboardingProfileCard,
  OnboardingSteps,
} from '@/components/modules/onboarding';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import codingIcon from '@/images/icons/coding-icon.svg';
import featureIcon from '@/images/icons/feature-icon.svg';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
export default function HomePage() {
  return (
    <Layout>
      <div className="grid items-start gap-5 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-7">
          <OnboardingProfileCard />

          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-5 md:flex-row">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">1. Install our SDK</h3>
                  <p className="text-base">
                    Integrate GrowthBook into your Javascript, React, Golang,
                    Ruby, PHP, Python, or Android application. More languages
                    and frameworks coming soon!
                  </p>
                  <Button rigthIcon={ArrowRight}>Click</Button>
                </div>

                <Image
                  src={codingIcon}
                  alt="Coding Logo"
                  className="w-48 h-48"
                />
              </div>

              <Separator className="my-8" />

              <div className="flex flex-col items-center gap-5 md:flex-row">
                <Image
                  src={featureIcon}
                  alt="Coding Logo"
                  className="w-48 h-48"
                />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">1. Install our SDK</h3>
                  <p className="text-base">
                    Integrate GrowthBook into your Javascript, React, Golang,
                    Ruby, PHP, Python, or Android application. More languages
                    and frameworks coming soon!
                  </p>
                  <Button rigthIcon={ArrowRight}>Click</Button>
                </div>
              </div>
              <Separator className="my-8" />
              <div>
                <h3 className="mb-3 text-lg font-medium">Siguientes Pasos</h3>
                <ul className="pl-8 space-y-3 list-disc">
                  <li>
                    <Link className="underline text-primary" href="/">
                      Externar or Internal Link
                    </Link>
                  </li>
                  <li>
                    <Link className="underline text-primary" href="/">
                      Externar or Internal Link
                    </Link>
                  </li>
                  <li>
                    <Link className="underline text-primary" href="/">
                      Externar or Internal Link
                    </Link>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <OnboardingSteps />
      </div>
    </Layout>
  );
}
