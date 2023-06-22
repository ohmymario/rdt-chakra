import { Timestamp } from 'firebase/firestore';

export function timestampToDate(timestampData: { seconds: number; nanoseconds: number }): string {
  const timestamp = new Timestamp(timestampData.seconds, timestampData.nanoseconds);
  const date = timestamp.toDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
