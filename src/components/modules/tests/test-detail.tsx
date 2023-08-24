import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFormatDateDistance } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchParams } from 'next/navigation';
import { useGetTest } from '@/hooks/tests';
import { ACCESS_LEVEL, SALES_PROCESS_IMPACT_DICTIONARY } from '@/lib/contants';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FlaskConical, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useGetVote, useGetVotes, useUpdateVote } from '@/hooks/votes';
import { cn } from '@/lib/utils';
import { TestExperimentationDialogForm } from './test-experimentation-detail-dialog-form';
import { TestResultDialogForm } from './test-result-dialog-form';
export function TestDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const updateVoteMutation = useUpdateVote();

  const { data, isLoading } = useGetTest(Number(id), Boolean(id));
  const { data: dataVote, refetch: refetchVote } = useGetVote(id);
  const { data: dataVotes, refetch: refetchVotes } = useGetVotes(Number(id));

  const totalVotesCount = dataVotes ? dataVotes.data.length : 0;
  const hasAdminApproval =
    dataVotes &&
    dataVotes.data.some(
      (v) => v.creator.accessLevel === ACCESS_LEVEL.ACCOUNT_ADMIN
    );
  const hasAcceptableVotesCount = totalVotesCount > 5;
  const isReadyForNextStage = hasAcceptableVotesCount || hasAdminApproval;

  return (
    <>
      {isLoading && <Skeleton className="h-96" />}
      {!isLoading && data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>
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

            <div className="flex items-center gap-3 mb-6">
              <Badge>{SALES_PROCESS_IMPACT_DICTIONARY[data.type]}</Badge>
              <Badge className="uppercase">{data.targetArea}</Badge>
              <Badge>{data.status}</Badge>

              <div className="flex items-center border rounded-full">
                <button
                  className="px-3 py-1.5 flex "
                  disabled={updateVoteMutation.isLoading}
                  onClick={() => {
                    updateVoteMutation.mutate(
                      { id, value: 1 },
                      {
                        onSuccess: () => {
                          refetchVote();
                          refetchVotes();
                        },
                      }
                    );
                  }}
                >
                  <ThumbsUp
                    className={cn(
                      'w-5 h-5 mr-2',
                      dataVote?.data?.value === 1 && 'fill-current'
                    )}
                  />
                  <span>{dataVotes?.data?.length}</span>
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
                          refetchVote();
                          refetchVotes();
                        },
                      }
                    );
                  }}
                >
                  <ThumbsDown
                    className={cn(
                      'w-5 h-5 mr-2',
                      dataVote?.data?.value === -1 && 'fill-current'
                    )}
                  />
                </button>
              </div>
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
            {isReadyForNextStage && data?.status === 'IDEA' && (
              <TestExperimentationDialogForm id={id} />
            )}

            {data.status === 'TEST' && (
              <TestResultDialogForm id={data?.id.toString()} />
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
