import { DataTable } from './data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { columns } from './columns';
import { useUserContributions } from '@/hooks/users';

interface Props {}

export const UsersContributionTable = ({}: Props) => {
  const { data, isLoading } = useUserContributions();

  const membersData = data?.members ?? [];

  return (
    <>
      {isLoading && <Skeleton className="h-96" />}
      {!isLoading && data && <DataTable data={membersData} columns={columns} />}
    </>
  );
};
