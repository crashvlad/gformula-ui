import { Layout } from '@/components/layouts/auth-layout';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeading } from '@/components/ui/page-heading';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    id: 1,
    question: '¿Qué es el Growth Hacking?',
    answer:
      'El Growth Hacking es una estrategia de marketing digital que se enfoca en el crecimiento rápido y sostenible de una empresa mediante la identificación y aprovechamiento de oportunidades únicas para adquirir y retener clientes. Esto implica la experimentación con diferentes tácticas y canales para lograr un crecimiento eficiente.',
  },
  {
    id: 2,
    question: '¿Cuáles son las métricas clave en el Growth Hacking?',
    answer:
      'Las métricas clave en el Growth Hacking varían según el negocio, pero suelen incluir la tasa de adquisición de usuarios, la tasa de retención, el costo por adquisición (CAC), el valor del ciclo de vida del cliente (CLV), la tasa de conversión y más. Estas métricas ayudan a medir el éxito de las estrategias de crecimiento.',
  },
  {
    id: 3,
    question:
      '¿Cómo puedo definir objetivos efectivos en mi estrategia de Growth Hacking?',
    answer:
      'Para definir objetivos efectivos en el Growth Hacking, debes seguir el enfoque SMART (Específico, Medible, Alcanzable, Relevante y Limitado en el Tiempo). Esto significa que tus objetivos deben ser claros, cuantificables, alcanzables, relevantes para tu negocio y con un plazo de tiempo específico para su logro.',
    links: [
      {
        text: 'Cómo iterar y mejorar en el Growth Hacking',
        url: 'https://www.ejemplo.com/iteracion-growth-hacking',
      },
    ],
  },
  {
    id: 4,
    question: '¿Qué son las hipótesis de crecimiento y cómo se prueban?',
    answer:
      'Las hipótesis de crecimiento son suposiciones que haces sobre lo que podría mejorar el crecimiento de tu empresa. Se prueban mediante experimentos controlados y la recopilación de datos. Por ejemplo, podrías hipotetizar que cambiar el texto de tu llamado a la acción aumentará las conversiones y luego probarlo mediante pruebas A/B.',
    links: [
      {
        text: 'Cómo iterar y mejorar en el Growth Hacking',
        url: 'https://www.ejemplo.com/iteracion-growth-hacking',
      },
    ],
  },
  {
    id: 5,
    question: '¿Cuál es la importancia de la iteración en el Growth Hacking?',
    answer:
      'La iteración es fundamental en el Growth Hacking porque te permite aprender de tus experimentos y ajustar tus estrategias en función de los resultados. A medida que obtienes datos y retroalimentación, puedes optimizar continuamente tus tácticas de crecimiento para lograr un mejor rendimiento y resultados más sólidos.',
  },
];
export default function ResultAppPage() {
  return (
    <Layout>
      <PageHeading
        title="Preguntas Frecuentes"
        description={
          <p>
            ¿Tienes una pregunta diferente y no puedes encontrar la respuesta
            que estás buscando? Ponte en contacto con nuestro equipo de soporte
            enviándonos un{' '}
            <Link
              href="mailto:soporte@gformula.io"
              target="_blank"
              className="underline text-primary"
            >
              correo electrónico
            </Link>{' '}
            y te responderemos tan pronto como sea posible.
          </p>
        }
      />

      <dl className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:gap-x-10">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader className="pb-0 font-semibold leading-7">
              <CardTitle className="text-primary">{faq.question}</CardTitle>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="text-base leading-7 ">
              {faq.answer}
            </CardContent>
            {faq.links && faq.links.length > 0 && (
              <CardFooter>
                <div className="text-primary">
                  <ul>
                    {faq.links.map((l) => (
                      <li key={l.url}>
                        <Link
                          href={l.url}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center gap-2 underline"
                        >
                          {l.text}
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </dl>
    </Layout>
  );
}
