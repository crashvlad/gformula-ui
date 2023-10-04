import { formatDistance, format } from 'date-fns';
import { es } from 'date-fns/locale';

export function getFormatDateDistance(date: string) {
  const activitieDate = new Date(date);
  const presentDay = new Date();

  return formatDistance(presentDay, activitieDate, { locale: es });
}

export function formatDatePost(date: string) {
  const postDate = new Date(date);

  return format(postDate, 'LLL d, yyy', { locale: es });
}
