import { useUserContributions } from '@/hooks/users';
import { UserWinnerCard } from './user-winner-card';

export const UserContributionsWinners = () => {
  const { data, isLoading } = useUserContributions();

  const winnersData = data?.winnersData ?? [];

  return (
    <div className="grid md:grid-cols-3 gap-5 mb-8">
      {!isLoading &&
        winnersData.length > 0 &&
        winnersData.map((w) => (
          <UserWinnerCard
            key={w.id}
            name={w.name}
            job={w.job}
            workCount={w.workTestCount}
            notWorkCount={w.notWorkTestsCount}
            notConclusiveCount={w.notConclusiveTestsCount}
          />
        ))}
    </div>
  );
};
