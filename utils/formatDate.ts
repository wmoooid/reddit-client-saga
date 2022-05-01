import { formatDistanceToNow } from 'date-fns';

export function formatDate(date: number) {
  if (date == undefined) return null;
  const unformattedDate = new Date(date * 1000);
  const formatedDate = formatDistanceToNow(unformattedDate, { addSuffix: true });
  return formatedDate;
}
