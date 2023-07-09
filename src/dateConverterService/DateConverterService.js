import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';

export class DateConverterService {
  static formatDateTime = (dateMS) => {
    return new Intl.DateTimeFormat('en-EN', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date(dateMS));
  };

  static getRelativeTimeAgo(dateMS) {
    const relativeTime = formatDistance(dateMS, Date.now(), {
      locale: enUS,
      addSuffix: true,
    });
    return relativeTime;
  }
}
