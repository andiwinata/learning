const createCalendar = ({
  initialDate = new Date(),
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthNames = [
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
  ],
  querySelector,
}) => {
  const TOTAL_DAY_IN_WEEK = 7

  // events onMonthChange (can also be onYearChange)
  // TODO { el, update } refactor

  const createDayNumberRender = (opts) => {
    const el = document.createElement('button')

    const update = ({ dayNum, disabled = false }) => {
      el.classList.add('day', 'button', ...disabled ? ['disabled'] : [])
      el.disabled = disabled
      el.textContent = dayNum
    }

    update(opts) // init

    return {
      el,
      update,
    }
  }

  const createDayNameRender = (opts) => {
    const el = document.createElement('div')
    const update = ({ dayName }) => {
      el.classList.add('dayName')
      el.textContent = dayName
    }

    update(opts) // init

    return {
      el,
      update
    }
  }

  const createDatesRender = ({ daysArray }) => {
    const datesWrapper = document.createElement('div')

    // create day names
    dayNames.forEach(dayName => {
      datesWrapper.appendChild(createDayNameRender({ dayName }).el)
    })

    // create day numbers
    daysArray.forEach(day => {
      const dateEl = createDayNumberRender({
        dayNum: day,
        disabled: day === '',
      })
      datesWrapper.appendChild(dateEl.el)
    })

    return datesWrapper
  }

  const createYearMonthRender = ({ month, year,
    prevMonthOnClick, nextMonthOnClick
  }) => {
    const yearWrap = document.createElement('div')
    yearWrap.classList.add('yearWrap')

    const prevMonthBtn = document.createElement('button')
    prevMonthBtn.innerText = 'Prev'
    prevMonthBtn.classList.add('navigateMonth', 'button')
    prevMonthBtn.addEventListener('click', prevMonthOnClick)

    const nextMonthBtn = document.createElement('button')
    nextMonthBtn.innerText = 'Next'
    nextMonthBtn.classList.add('navigateMonth', 'button')
    nextMonthBtn.addEventListener('click', nextMonthOnClick)

    const yearText = document.createElement('span')
    yearText.classList.add('yearText')
    yearText.innerText = `${monthNames[month]} - ${year}`

    yearWrap.appendChild(prevMonthBtn)
    yearWrap.appendChild(yearText)
    yearWrap.appendChild(nextMonthBtn)

    return yearWrap
  }

  const createCalendarRender = ({
    year,
    month,
    day,
    daysArray,
  }) => {
    // create calendar container if doesn't exist
    // auto add it to the body
    let calendarContainer = document.querySelector(querySelector)
    calendarContainer.classList.add('calendar')

    // create year and month elements with its wrapper
    calendarContainer.appendChild(createYearMonthRender({
      year,
      month,
    }))

    // create dates and its wrapper
    calendarContainer.appendChild(createDatesRender({
      day,
      daysArray
    }))

    return calendarContainer
  }

  /**
   * Generates array of days in for the calendar
   * will contain empty for some elements
   */
  const generateDaysArray = ({
    firstDate,
    lastDate
  }) => Array.from({ length: TOTAL_DAY_IN_WEEK * 5 }, (x, i) => i + 1).map(dayId =>
    // return empty if day index is less than first date
    dayId < firstDate || dayId > lastDate ? '' : dayId - firstDate + 1
  )

  const getFirstLastDate = ({ year, month }) => ({
    firstDate: new Date(year, month, 1).getDate(),
    lastDate: new Date(year, month + 1, 0).getDate(),
  })

  const init = () => {
    const year = initialDate.getFullYear()
    const month = initialDate.getMonth()
    const day = initialDate.getDay()

    // get first and last day of month
    const { firstDate, lastDate } = getFirstLastDate({ year, month })
    const daysArray = generateDaysArray({ firstDate, lastDate })

    createCalendarRender({
      year,
      month,
      day,
      daysArray,
    })
  }

  init()
}

createCalendar({
  querySelector: '#calendar'
})
