import dayjs, {Dayjs} from 'dayjs';

const weekdayNames = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export default function dateFormatLong(date: any) {
  const weekdayName = weekdayNames[date.weekday()];
  const day = date.format('DD');
  const year = date.format('YYYY');

  let month = date.format('MMMM');
  month = String(month).substring(0, 1).toUpperCase() + String(month).substring(1);

  return `${weekdayName}, ${day} de ${month}, ${year}`
}
