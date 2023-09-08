import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle, Trophy, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import logoSimple from '@/images/logos/gf-simple.png';
import Image from 'next/image';
import { useState } from 'react';

export function SupportPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="rounded-full w-14 h-14">
          {open ? (
            <X className="w-8 h-8" />
          ) : (
            <HelpCircle className="w-8 h-8" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative p-0 w-80"
        align="end"
        alignOffset={25}
        sideOffset={15}
      >
        <div className="px-3 py-6 bg-primary/50 rounded-t-md">
          <h2 className="flex gap-1 text-lg font-extrabold text-muted-foreground">
            <Image
              className=""
              src={logoSimple}
              alt=""
              width={25}
              height={25}
              unoptimized
            />
            Como podemos ayudarte?
          </h2>
        </div>
        <div className="relative px-3 -top-4">
          <Card>
            <CardContent className="p-6">
              <span className="font-bold">Tienes preguntas?</span>

              <div className="flex flex-col gap-3 mt-2">
                <Link href={ROUTES.faq}>
                  <Button className="w-full" rigthIcon={ArrowRight}>
                    Ver Preguntas Frecuentes
                  </Button>
                </Link>
                <Link href={ROUTES.faq}>
                  <Button
                    className="w-full"
                    variant="outline"
                    rigthIcon={ArrowRight}
                  >
                    Ver Documentación
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative px-3 pb-4">
          <Card>
            <CardContent className="p-6">
              <span className="text-sm font-bold">
                Actualiza tu cuenta para desbloquear el soporte de chat en vivo
                y acceder a funciones premium
              </span>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" variant="outline" rigthIcon={Trophy}>
                Cambiar plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </PopoverContent>
    </Popover>
  );
}
