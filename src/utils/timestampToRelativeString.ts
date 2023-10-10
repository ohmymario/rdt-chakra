import { Timestamp } from 'firebase/firestore';

function timestampToRelativeString(timestamp: Timestamp) {
  const now = new Date();
  const timeDifference = now.getTime() - timestamp.toDate().getTime();

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const weeksInMs = daysInMs * 7;
  const monthsInMs = daysInMs * 30.44; // Using the average number of days in a month (365.25 / 12)

  if (timeDifference < hoursInMs) {
    const minutes = Math.round(timeDifference / minutesInMs);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else if (timeDifference < daysInMs) {
    const hours = Math.round(timeDifference / hoursInMs);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (timeDifference < weeksInMs) {
    const days = Math.round(timeDifference / daysInMs);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (timeDifference < monthsInMs) {
    const weeks = Math.round(timeDifference / weeksInMs);
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else {
    const months = Math.round(timeDifference / monthsInMs);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }
}

export default timestampToRelativeString;