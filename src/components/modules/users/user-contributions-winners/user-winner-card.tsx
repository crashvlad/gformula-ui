import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useUserContributions } from '@/hooks/users';
import { getInitials } from '@/lib/get-initials';
import { FlaskConical, Frown, MehIcon, Smile } from 'lucide-react';

export const UserWinnerCard = ({
  name,
  job,
  workCount,
  notWorkCount,
  notConclusiveCount,
}: {
  name: string;
  job: string;
  workCount: number;
  notWorkCount: number;
  notConclusiveCount: number;
}) => {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <Avatar className="h-16 w-16 mb-4">
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>

        <h4 className="font-medium text-lg text-primary">{name}</h4>

        <p className="text-muted-foreground mb-2">{job}</p>

        <span className="text-2xl text-primary font-bold flex  items-center gap-2">
          <FlaskConical className="h-5 w-5" />
          {workCount}
        </span>
      </CardContent>

      <CardFooter className="border-t p-0">
        <div className="w-full grid grid-cols-3 divide-x">
          <div className="py-4">
            <span className="text-muted-foreground text-lg flex items-center justify-center gap-2">
              <Smile className="h-5 w-5" />
              {workCount}
            </span>
          </div>
          <div className="py-4">
            <span className="text-muted-foreground text-lg flex items-center justify-center gap-2">
              <MehIcon className="h-5 w-5" />
              {notConclusiveCount}
            </span>
          </div>
          <div className="py-4">
            <span className="text-muted-foreground text-lg flex items-center justify-center gap-2">
              <Frown className="h-5 w-5" />
              {notWorkCount}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
