import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

export function getFormatDateDistance(date: string) {
  const activitieDate = new Date(date);
  const presentDay = new Date();

  return formatDistance(presentDay, activitieDate, { locale: es });
}
