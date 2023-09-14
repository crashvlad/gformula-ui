import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getInitials } from '@/lib/get-initials';
import { cn } from '@/lib/utils';
import { Frown, MehIcon, Smile, Trophy } from 'lucide-react';

export const UserWinnerCard = ({
  name,
  job,
  workCount,
  notWorkCount,
  notConclusiveCount,
  index,
}: {
  name: string;
  job: string;
  workCount: number;
  notWorkCount: number;
  notConclusiveCount: number;
  index: number;
}) => {
  console.log(index);

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Avatar className="w-16 h-16 mb-4">
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>

        <h4 className="text-lg font-medium text-primary">{name}</h4>

        <p className="mb-2 text-muted-foreground">{job}</p>

        <span className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Trophy className={cn('w-8 h-8')} />
          {workCount}
        </span>
      </CardContent>

      <CardFooter className="p-0 border-t">
        <div className="grid w-full grid-cols-3 divide-x">
          <div className="py-4">
            <span className="flex flex-col items-center justify-center gap-2 text-lg font-semibold text-muted-foreground">
              {workCount}
              <Smile className="w-8 h-8 text-primary" />
            </span>
          </div>
          <div className="py-4">
            <span className="flex flex-col items-center justify-center gap-2 text-lg text-muted-foreground">
              {notConclusiveCount}
              <MehIcon className="w-8 h-8 text-orange-600" />
            </span>
          </div>
          <div className="py-4">
            <span className="flex flex-col items-center justify-center gap-2 text-lg text-muted-foreground">
              {notWorkCount}
              <Frown className="w-8 h-8 text-red-600" />
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
