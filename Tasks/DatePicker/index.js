
const DEFAULT_DATE = new Date()
const TOTAL_DAY_IN_WEEK = 7

// events onMonthChange (can also be onYearChange)
// 

const createDayNumber = ({ date }) => {
  const el = document.createElement('button')
  el.classList.add('day', 'button')
  el.innerHTML = date
  return el
}

const createDayName = ({ dayName }) => {
  const el = document.createElement('div')
  el.classList.add('dayName')
  el.innerHTML = dayName
  return el
}

const createDates = ({ dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }) => {
  if (dayNames.length !== TOTAL_DAY_IN_WEEK) {
    throw new Error(`Total of day must be ${TOTAL_DAY_IN_WEEK}`)
  }
  const datesWrapper = document.createElement('div')

  dayNames.forEach(dayName => {
    datesWrapper.appendChild(createDayName({ dayName }))
  })

  Array.from({ length: TOTAL_DAY_IN_WEEK * 5 }, (x, i) => i + 1).forEach(date => {
    const dateEl = createDayNumber({ date })
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
  yearText.innerText = `${month} - ${year}`

  yearWrap.appendChild(prevMonthBtn)
  yearWrap.appendChild(yearText)
  yearWrap.appendChild(nextMonthBtn)

  return yearWrap
}

const createCalendar = () => {
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
    year: 2018,
  }))

  // create dates and its wrapper
  calendarContainer.appendChild(createDates({}))

  return calendarContainer
}

createCalendar()


