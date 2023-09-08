import { useUser } from '@/components/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { getInitials } from '@/lib/get-initials';

export const OnboardingProfileCard = () => {
  const { user } = useUser();
  return (
    <Card id="home-header">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-xl font-medium tracking-tight scroll-m-20 ">
              Bienvenido a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-[#02EEB1]">
                Growth Formula
              </span>
            </h2>
            <span className="text-2xl font-bold">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.job}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
