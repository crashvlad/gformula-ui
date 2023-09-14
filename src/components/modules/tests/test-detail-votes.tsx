import { Separator } from '@/components/ui/separator';
import { useUpdateVote } from '@/hooks/votes';
import { cn } from '@/lib/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

type Props = {
  id: string;
  afterMutation: () => void;
  totalVotes: number;
  voteValue: number;
};

export const TestDetailVotes = ({
  id,
  totalVotes,
  voteValue,
  afterMutation,
}: Props) => {
  const updateVoteMutation = useUpdateVote();

  return (
    <div className="flex items-center border rounded-full">
      <button
        className="px-3 py-1.5 flex "
        disabled={updateVoteMutation.isLoading}
        onClick={() => {
          updateVoteMutation.mutate(
            { id, value: 1 },
            {
              onSuccess: () => {
                afterMutation();
              },
            }
          );
        }}
      >
        <ThumbsUp
          className={cn('w-5 h-5 mr-2', voteValue === 1 && 'fill-current')}
        />
        <span>{totalVotes}</span>
      </button>

      <Separator orientation="vertical" className="h-6" />

      <button
        className="px-3 py-1.5"
        disabled={updateVoteMutation.isLoading}
        onClick={() => {
          updateVoteMutation.mutate(
            { id, value: -1 },
            {
              onSuccess: () => {
                afterMutation();
              },
            }
          );
        }}
      >
        <ThumbsDown
          className={cn('w-5 h-5 mr-2', voteValue === -1 && 'fill-current')}
        />
      </button>
    </div>
  );
};
