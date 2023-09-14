import { useUserContributions } from '@/hooks/users';
import { UserWinnerCard } from './user-winner-card';

export const UserContributionsWinners = () => {
  const { data, isLoading } = useUserContributions();

  const winnersData = data?.winnersData ?? [];

  return (
    <div className="grid gap-5 mb-8 md:grid-cols-3">
      {!isLoading &&
        winnersData.map((w, i) => (
          <UserWinnerCard
            index={i + 1}
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
