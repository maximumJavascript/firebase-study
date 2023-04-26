export class DateConverterService {
  static convertDate = (UNIX_timestamp) => {
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'long',
      timeStyle: 'medium',
    }).format(new Date(UNIX_timestamp * 1000));
  };
  static shortConvertDate = (UNIX_timestamp) => {
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(UNIX_timestamp * 1000));
  };
}
