import { ContactForm } from '@/components/home/contact-form';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Button } from '@/components/ui/button';
import { MailIcon, MapPin, PhoneIcon } from 'lucide-react';

export default function Example() {
  return (
    <>
      <Header />
      <main className="relative isolate">
        <div className="grid grid-cols-1 mx-auto max-w-7xl lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-24">
            <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 w-full overflow-hidden -z-10 ring-1 ring-white/5 lg:w-1/2">
                <svg
                  className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                      width={200}
                      height={200}
                      x="100%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-800/20"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                  />
                </svg>
                <div
                  className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                  aria-hidden="true"
                >
                  <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                      clipPath:
                        'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                    }}
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Ponte en contacto
              </h2>
              <p className="mt-6 text-lg leading-8 ">
                Proin volutpat consequat porttitor cras nullam gravida at. Orci
                molestie a eu arcu. Sed ut tincidunt integer elementum id sem.
                Arcu sed malesuada et magna.
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 ">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <MapPin className="w-6 h-7" aria-hidden="true" />
                  </dt>
                  <dd>
                    Dirección
                    <br />
                    Lima, 2555
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Teléfono</span>
                    <PhoneIcon className="w-6 h-7" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a
                      className="hover:text-white"
                      href="tel:+1 (555) 234-5678"
                    >
                      +51 999 999 999
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <MailIcon className="w-6 h-7" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a
                      className="hover:text-white"
                      href="mailto:hello@example.com"
                    >
                      correo@example.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
