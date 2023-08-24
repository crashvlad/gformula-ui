import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/config/routes';
import { SALES_PROCESS_IMPACT_DICTIONARY } from '@/lib/contants';
import { getFormatDateDistance } from '@/lib/date';
import { Experiment } from '@/types';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';

export const TestListResultCard = ({ test }: { test: Experiment }) => {
  return (
    <Link href={ROUTES.app_hypothesis_detail(test.id)}>
      <Card className="flex flex-col h-full px-0">
        <CardHeader>
          <CardTitle className="line-clamp-1">{test.name}</CardTitle>
          <CardDescription>
            Creado por {test.creator.name}
            <br />
            <span className="flex gap-2 mt-2">
              <CalendarDays className="w-4 h-4" />
              hace {getFormatDateDistance(test.createdAt)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <p className="line-clamp-3">{test.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          <Badge variant="outline">
            {SALES_PROCESS_IMPACT_DICTIONARY[test.type]}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};
