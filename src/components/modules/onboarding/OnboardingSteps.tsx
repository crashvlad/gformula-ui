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

export const OnboardingSteps = () => {
  return (
    <Tabs defaultValue="hipothesis" className="w-full mx-auto md:col-span-5">
      <TabsList className="flex w-full gap-5 bg-transparent md:gap-0">
        <StepItem value={'metric'} label={'1'} />
        <StepLine />
        <StepItem value={'objectives'} label={'2'} />
        <StepLine />
        <StepItem value={'hipothesis'} label={'3'} />
        <StepLine />
        <StepItem value={'dashboard'} label={'4'} />
        <StepLine />
        <StepItem value={'salud'} label={'5'} />
        <StepLine />
        <StepItem value={'results'} label={'6'} />
      </TabsList>

      <TabsContent value="metric">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Métricas Claves
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit
              nemo saepe soluta omnis delectus consequatur perspiciatis
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
          <CardFooter className="grid grid-cols-1 gap-3">
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
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Objetivos
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit
              nemo saepe soluta omnis delectus consequatur perspiciatis
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
          <CardFooter className="grid grid-cols-1 gap-3 ">
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
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Hipotesis
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit
              nemo saepe soluta omnis delectus consequatur perspiciatis
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
      <TabsContent value="dashboard">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Dashboard
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit
              nemo saepe soluta omnis delectus consequatur perspiciatis
              similique vel ab numquam nobis iure mollitia sapiente?
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
              Comenzar a Experimentar
              <FlaskConical className="w-4 h-4 ml-2" />
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="salud">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Salud
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit
              nemo saepe soluta omnis delectus consequatur perspiciatis
              similique vel ab numquam nobis iure mollitia sapiente?
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
              Comenzar a Experimentar
              <FlaskConical className="w-4 h-4 ml-2" />
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="results">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Resultados
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sit
              nemo saepe soluta omnis delectus consequatur perspiciatis
              similique vel ab numquam nobis iure mollitia sapiente?
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Link href={ROUTES.app_hypothesis} className={buttonVariants()}>
              Comenzar a Experimentar
              <FlaskConical className="w-4 h-4 ml-2" />
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const StepLine = () => {
  return (
    <Separator
      orientation="horizontal"
      className="hidden w-6 md:block bg-primary"
    />
  );
};

const StepItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'rounded-full border text-xs !text-primary border-primary h-6  w-6  data-[state=active]:bg-primary data-[state=active]:!text-background'
      )}
    >
      {label}
    </TabsTrigger>
  );
};
