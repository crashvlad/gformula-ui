import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTest } from '@/hooks/tests';
import { useGetVote, useGetVotes, useUpdateVote } from '@/hooks/votes';
import {
  ACCESS_LEVEL,
  SALES_PROCESS_IMPACT_DICTIONARY,
  TEST_STATUS_DICTIONARY,
} from '@/lib/contants';
import { getFormatDateDistance } from '@/lib/date';
import { useSearchParams } from 'next/navigation';
import { TestExperimentationDialogForm } from './test-experimentation-detail-dialog-form';
import { TestResultDialogForm } from './test-result-dialog-form';
import { useUser } from '@/components/context/AuthContext';
import { TestDetailVotes } from './test-detail-votes';
export function TestDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data, isLoading } = useGetTest(Number(id), Boolean(id));
  const { data: dataVote, refetch: refetchVote } = useGetVote(id);
  const { data: dataVotes, refetch: refetchVotes } = useGetVotes(Number(id));
  const { user } = useUser();

  const totalVotesCount = dataVotes ? dataVotes.data.length : 0;
  const hasAdminApproval =
    dataVotes &&
    dataVotes.data.some(
      (v) => v.creator.accessLevel === ACCESS_LEVEL.ACCOUNT_ADMIN
    );
  const hasAcceptableVotesCount = totalVotesCount > 5;
  const isReadyForNextStage = hasAcceptableVotesCount || hasAdminApproval;
  const isOwner = user?.id == data?.creator?.id;

  return (
    <>
      {isLoading && <Skeleton className="h-96" />}
      {!isLoading && data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription className="font-mono">
              Creado por {data.creator.name} • hace{' '}
              {getFormatDateDistance(data.createdAt ?? '')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h5 className="text-xl font-semibold tracking-tight scroll-m-20">
              Descripción del objetivo
            </h5>
            <p className="mb-4 leading-7 text-muted-foreground">
              {data.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge>{SALES_PROCESS_IMPACT_DICTIONARY[data.type]}</Badge>
              <Badge className="uppercase">{data.targetArea}</Badge>
              <Badge>{TEST_STATUS_DICTIONARY[data.status]}</Badge>

              <TestDetailVotes
                id={id}
                totalVotes={totalVotesCount}
                voteValue={dataVote?.data?.value ?? 0}
                afterMutation={() => {
                  refetchVote();
                  refetchVotes();
                }}
              />
            </div>

            <div className="space-y-3">
              <div>
                <Label>Confianza</Label>
                <Progress value={data.confidence * 10} />
              </div>
              <div>
                <Label>Impacto</Label>
                <Progress value={data.impact * 10} />
              </div>
              <div>
                <Label>Dificultad</Label>
                <Progress value={data.difficulty * 10} />
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-2 ">
            {isReadyForNextStage && data?.status === 'IDEA' && isOwner && (
              <TestExperimentationDialogForm id={id} />
            )}

            {data.status === 'TEST' && isOwner && (
              <TestResultDialogForm id={data?.id.toString()} />
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
