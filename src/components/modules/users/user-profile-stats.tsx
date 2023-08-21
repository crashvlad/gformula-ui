import { useGetProfileIdeasStats } from '@/hooks';
import { CARD_HIPO_STATUS_STYLES } from '@/lib/contants';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const UserProfileStats = () => {
  const { data, isLoading } = useGetProfileIdeasStats();
  return (
    <div className="flex flex-col col-span-12 gap-4 md:col-span-4">
      {!isLoading &&
        data &&
        data.map((d: any) => {
          const Icon = CARD_HIPO_STATUS_STYLES[d.id].icon;
          return (
            <Card key={d.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xl font-medium">{d.title}</CardTitle>
                <Icon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{d.value}</div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};
