const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('vi-VN', {
  hour: '2-digit',
  minute: '2-digit',
  // second: '2-digit',
  hour12: false,
})

const datetimeFormatter = (datetime: string) => {
  return `${dateFormatter.format(new Date(datetime))} ${timeFormatter.format(new Date(datetime))}`
}

export {
  dateFormatter, timeFormatter, datetimeFormatter
}
