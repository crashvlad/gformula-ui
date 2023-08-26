import { useMemo, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { BellIcon, ClockIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetActivities, useUpdateActivity } from '@/hooks/activities';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFormatDateDistance } from '@/lib/date';
import { ROUTES } from '@/config/routes';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function NotificationPopover() {
  const { data, isLoading } = useGetActivities();

  const notifications = useMemo(() => {
    if (!isLoading && data) {
      return data.map((n: any) => ({
        ...n,
        id: n.id,
      }));
    }

    return [];
  }, [data, isLoading]);

  const countNotReadNotification = notifications.filter(
    (n: any) => !n.isRead
  ).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          className="relative"
          size="sm"
        >
          {countNotReadNotification > 0 && (
            <Badge
              variant="secondary"
              className="absolute flex items-center justify-center -right-2 -top-2 h-6 w-6 rounded-full p-2"
            >
              {countNotReadNotification}
            </Badge>
          )}
          <BellIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      {notifications.length > 0 && (
        <PopoverContent align="end" className="p-0 py-2">
          <ScrollArea className="h-96">
            <div className="flex flex-col">
              {notifications.map((n: any) => (
                <NotificationItem notification={n} key={n.id} />
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      )}
    </Popover>
  );
}

function NotificationItem({ notification }: { notification: any }) {
  const { objectiveId, metricId, testId } = notification;
  let route = '/';
  const { mutate, isLoading: isLoading } = useUpdateActivity();

  if (objectiveId) route = ROUTES.app_objectives_detail(objectiveId);
  if (metricId) route = ROUTES.app_metric_detail(metricId);
  if (testId) route = ROUTES.app_hypothesis_detail(testId);

  const handleClick = () => {
    if (!notification.isRead) {
      mutate({ id: notification.id, isRead: true });
    }
  };

  return (
    <Link
      key={notification.id}
      href={route}
      className={cn(
        'px-3 py-3 hover:bg-muted/50',
        notification.isRead && 'bg-muted/50'
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-1">
        {notification.name}
        <span className="flex items-center gap-3">
          <ClockIcon className="w-4 h-4" />
          hace {getFormatDateDistance(notification.createdAt)}
        </span>
      </div>
    </Link>
  );
}
