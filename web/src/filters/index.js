import { format } from 'date-fns'

export function formatDate (time, option = 'yyyy/MM/dd HH:mm') {
  const time2 = new Date(time)
  return format(time2, option)
}
