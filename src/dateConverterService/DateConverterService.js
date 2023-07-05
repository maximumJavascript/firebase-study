import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export class DateConverterService {
  static formatDateTime = (UNIX_timestamp) => {
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date(UNIX_timestamp));
  };

  static getRelativeTimeAgo(UNIX_timestamp) {
    const relativeTime = formatDistance(UNIX_timestamp, Date.now(), {
      locale: ru,
      addSuffix: true,
    });
    return relativeTime;
  }
}
