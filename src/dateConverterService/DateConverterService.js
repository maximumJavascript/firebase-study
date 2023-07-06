import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export class DateConverterService {
  static formatDateTime = (dateMS) => {
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date(dateMS));
  };

  static getRelativeTimeAgo(dateMS) {
    const relativeTime = formatDistance(dateMS, Date.now(), {
      locale: ru,
      addSuffix: true,
    });
    return relativeTime;
  }
}
