import { Layout } from '@/components/layouts/auth-layout';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { FlagIcon, FlaskConical } from 'lucide-react';
import Link from 'next/link';
export default function HomePage() {
  return (
    <Layout>
      <HeaderHome />
      <Tabs
        defaultValue="hipothesis"
        className="w-full max-w-3xl mx-auto mt-10"
      >
        <TabsList className="flex w-full gap-5 mb-10 bg-transparent md:gap-0">
          <StepItem value={'metric'} label={'1'} />
          <StepLine />
          <StepItem value={'objectives'} label={'2'} />
          <StepLine />
          <StepItem value={'hipothesis'} label={'3'} />
        </TabsList>

        <TabsContent value="metric">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center">
                Métricas Claves
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                sit nemo saepe soluta omnis delectus consequatur perspiciatis
                similique vel ab numquam nobis iure mollitia sapiente?
              </CardDescription>
            </CardHeader>

            <CardContent>
              <AspectRatio ratio={16 / 8}>
                <iframe
                  src="https://www.youtube.com/embed/Wj1qpya4BsA?si=BBuoonlgbWpxAjaQ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              </AspectRatio>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
                Ver Métricas Claves
                <FlagIcon className="w-4 h-4 ml-2" />
              </Link>
              <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
                Comenzar a Experimentar
                <FlaskConical className="w-4 h-4 ml-2" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="objectives">
          {' '}
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center">
                Objetivos
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                sit nemo saepe soluta omnis delectus consequatur perspiciatis
                similique vel ab numquam nobis iure mollitia sapiente?
              </CardDescription>
            </CardHeader>

            <CardContent>
              <AspectRatio ratio={16 / 8}>
                <iframe
                  src="https://www.youtube.com/embed/Wj1qpya4BsA?si=BBuoonlgbWpxAjaQ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              </AspectRatio>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Link href={ROUTES.app_objectives} className={buttonVariants()}>
                Ver Objetivos
                <FlagIcon className="w-4 h-4 ml-2" />
              </Link>
              <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
                Comenzar a Experimentar
                <FlaskConical className="w-4 h-4 ml-2" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="hipothesis">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold text-center">
                Hipotesis
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                sit nemo saepe soluta omnis delectus consequatur perspiciatis
                similique vel ab numquam nobis iure mollitia sapiente?
              </CardDescription>
            </CardHeader>

            <CardContent>
              <AspectRatio ratio={16 / 8}>
                <iframe
                  src="https://www.youtube.com/embed/Wj1qpya4BsA?si=BBuoonlgbWpxAjaQ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              </AspectRatio>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
                Comenzar a Experimentar
                <FlaskConical className="w-4 h-4 ml-2" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

const HeaderHome = () => {
  return (
    <section id="home-header">
      <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl">
        Bienvenido a{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-[#02EEB1]">
          Growth Formula
        </span>
      </h2>
    </section>
  );
};

const StepLine = () => {
  return (
    <Separator
      orientation="horizontal"
      className="hidden h-1 md:block w-14 bg-primary"
    />
  );
};

const StepItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'rounded-full border text-xl !text-primary border-primary h-10 md:h-12 w-10 md:w-12 data-[state=active]:bg-primary data-[state=active]:!text-background'
      )}
    >
      {label}
    </TabsTrigger>
  );
};
