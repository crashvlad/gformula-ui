import { Layout } from '@/components/layouts/auth-layout';
import { useGetProfileIdeasStats } from '@/hooks/profile/use-get-profile-ideas-stats';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import docsIcon from '../../../public/docs.svg';
import { pagesInfoConfig } from '@/config/home';
import { UserProfileStats } from '@/components/modules/users';

export default function HomeAppPage() {
  return (
    <Layout>
      <div className="grid grid-cols-12 py-8 space-y-8 md:py-12 md:gap-x-8">
        <UserProfileStats />
        <div className="col-span-12 space-y-8 md:col-span-8">
          <div className="grid items-center md:grid-cols-2">
            <div className="">
              <h2 className="text-2xl font-semibold transition-colors scroll-m-20 first:mt-0">
                Trabaje de manera crossfuncional y cree hipótesis de
                experimentación
              </h2>
              <p className="text-sm leading-7 [&:not(:first-child)]:mt-2">
                Permite que todos los miembros de equipos cross funcionales
                puedan contribuir en distintas fases del proceso de growth;
                idear, organizar y optimizar.
              </p>
            </div>

            <div className="">
              <Image src={docsIcon} alt="" />
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {pagesInfoConfig.map((info) => (
              <Card key={info.title} className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-lg font-medium">
                    {info.title}
                  </CardTitle>
                  <info.icon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-sm">
                  {info.description}
                </CardContent>
                <CardFooter>
                  <Link href={info.to}>
                    <Button>{info.btnText}</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
