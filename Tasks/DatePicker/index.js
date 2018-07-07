
const DEFAULT_DATE = new Date()
const TOTAL_DAY_IN_WEEK = 7
const DAY_NAME_MAPPING = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// events onMonthChange (can also be onYearChange)
// 

const createDayNumber = ({ dayNum, disabled = false }) => {
  const el = document.createElement('button')
  el.classList.add('day', 'button', ...disabled ? ['disabled'] : [])
  el.disabled = disabled
  el.innerHTML = dayNum
  return el
}

const createDayName = ({ dayName }) => {
  const el = document.createElement('div')
  el.classList.add('dayName')
  el.innerHTML = dayName
  return el
}

const createDates = ({ day,
  dayNames,
  firstDate,
  lastDate,
}) => {
  const datesWrapper = document.createElement('div')

  DAY_NAME_MAPPING.forEach(dayName => {
    datesWrapper.appendChild(createDayName({ dayName }))
  })

  Array.from({ length: TOTAL_DAY_IN_WEEK * 5 }, (x, i) => i + 1).forEach(idDate => {
    let disabled = false
    if (idDate < firstDate || idDate > lastDate) {
      disabled = true
    }
    const dateEl = createDayNumber({
      dayNum: !disabled ? idDate - firstDate + 1: '',
      disabled,
    })
    datesWrapper.appendChild(dateEl)
  })

  return datesWrapper
}

const createYearMonth = ({ month, year, monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
] }) => {
  const yearWrap = document.createElement('div')
  yearWrap.classList.add('yearWrap')

  const prevMonthBtn = document.createElement('button')
  prevMonthBtn.innerText = 'Prev'
  prevMonthBtn.classList.add('navigateMonth', 'button')

  const nextMonthBtn = document.createElement('button')
  nextMonthBtn.innerText = 'Next'
  nextMonthBtn.classList.add('navigateMonth', 'button')

  const yearText = document.createElement('span')
  yearText.classList.add('yearText')
  yearText.innerText = `${monthNames[month]} - ${year}`

  yearWrap.appendChild(prevMonthBtn)
  yearWrap.appendChild(yearText)
  yearWrap.appendChild(nextMonthBtn)

  return yearWrap
}

const createCalendar = ({
  year,
  month,
  day,
  firstDate,
  lastDate,
}) => {
  // create calendar container if doesn't exist
  // auto add it to the body
  let calendarContainer = document.getElementById('calendar')
  if (!calendarContainer) {
    calendarContainer = document.createElement('div')
    calendarContainer.setAttribute('id', 'calendar')
    document.body.appendChild(calendarContainer)
  }
  calendarContainer.classList.add('calendar')

  // create year and month elements with its wrapper
  calendarContainer.appendChild(createYearMonth({
    year,
    month,
  }))

  // create dates and its wrapper
  calendarContainer.appendChild(createDates({
    day,
    firstDate,
    lastDate,
  }))

  return calendarContainer
}

const init = () => {
  const year = DEFAULT_DATE.getFullYear()
  const month = DEFAULT_DATE.getMonth()
  const day = DEFAULT_DATE.getDay()

  // get first and last day of month
  const firstDate = new Date(year, month, 1).getDate()
  const lastDate = new Date(year, month + 1, 0).getDate()

  createCalendar({
    year,
    month,
    day,
    firstDate,
    lastDate
  })
}

init()

