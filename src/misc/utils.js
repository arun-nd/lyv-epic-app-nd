export function maybeto12hr (time, { shouldConvert }) {
  const match = time.match(/^(\d\d):(\d\d)/)
  let hours = match[1]
  const minutes = match[2]
  let timeUnit = ''
  if (shouldConvert) {
    hours = parseInt(hours)
    timeUnit = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12 || 12
  }
  return {
    time: `${hours}:${minutes}`,
    unit: timeUnit
  }
}

export function toLocalDateTimeString(datetime) {
  datetime = new Date(datetime)
  return datetime.getFullYear() + '-' +
         ('0' + (datetime.getMonth() + 1)).slice(-2) + '-' +
         ('0' + datetime.getDate()).slice(-2) + 'T' +
         ('0' + (datetime.getHours())).slice(-2) + ':' +
         ('0' + (datetime.getMinutes())).slice(-2)
}

export function prettifyDate (datetime, { ampm }) {
  datetime = new Date(datetime)
  const date = datetime.getFullYear() + '-' +
               ('0' + (datetime.getMonth() + 1)).slice(-2) + '-' +
               ('0' + datetime.getDate()).slice(-2)
  let time = ('0' + (datetime.getHours())).slice(-2) + ':' +
             ('0' + (datetime.getMinutes())).slice(-2)

  let { time: ftime, unit } = maybeto12hr(time, { shouldConvert: ampm })

  return {
    datetime: datetime,
    date: date,
    time: ftime,
    timeunit: unit
  }
}

export function toLocalDateTime (datetime) {
  return new Date(datetime)
}

export function toUTC (object) {
  if (object instanceof Date) {
    return object.valueOf()
  }
  if (object instanceof Object) {
    for (const key of Object.keys(object)) {
      object[key] = toUTC(object[key])
    }
  }
  return object
}
