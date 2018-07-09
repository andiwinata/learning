function createCalendar({
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
  containerElement,
}) {
  const storeUpdatedEvent = new Event('storeUpdated')

  const DOMUtils = {
    makeElement: ({ type, classNames = [], attributes = {}, events = {}, children = [] }) => {
      const el = document.createElement(type)
      el.classList.add(...classNames)
      Object.keys(attributes).forEach(key => {
        el[key] = attributes[key]
      })

      Object.keys(events).forEach(key => {
        el.addEventListener(key, events[key])
      })

      children.forEach(child => {
        el.appendChild(child)
      })

      return el
    }
  }

  const Utils = {
    generateDayNumbers: ({ year, month }) => {
      const offset = new Date(year, month, 1).getDay()
      const lastDate = new Date(year, month + 1, 0).getDate()

      return Array.from({ length: 8 * 5 }, (x, i) => i)
        .map(id =>
          id < offset || id - offset + 1 > lastDate ? undefined : id - offset + 1
        )
    },
    formatDate: (date) => {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    getYearMonthDate: date => ({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    }),
    notValid: x => x === undefined || x === null,
    shallowEqual: (a, b) => {
      if (Utils.notValid(a) || Utils.notValid(b)) {
        if (Utils.notValid(a) !== Utils.notValid(b)) {
          return false
        }

        return false
      }
      const keysA = Object.keys(a)
      const keysB = Object.keys(b)

      if (keysA.length !== keysB.length) return false
      return keysA.every(keyA => a[keyA] === b[keyA])
    },
  }

  const createStore = initialState => {
    let state = initialState
    return {
      getState() {
        return { ...state }
      },
      setState(newState) {
        state = { ...state, ...newState }
        document.dispatchEvent(storeUpdatedEvent)
      },
      subscribeToStore: mapStateToProps => update => {
        let prevProps
        document.addEventListener('storeUpdated', () => {
          const props = mapStateToProps(state)
          if (Utils.shallowEqual(props, prevProps)) {
            return
          }

          prevProps = props
          update(props)
        })
      }
    }
  }

  const store = createStore({
    selectedDate: new Date(initialDate),
  })

  // TODO: 
  // - can be more efficient updating yearMonth
  // - event delegation

  const createUpdateableComponent = renderFn => props => {
    let el
    const update = (newProps) => {
      const nextEl = renderFn(newProps)

      if (!nextEl.isEqualNode(el)) {
        el.parentNode.replaceChild(nextEl, el)
        el = nextEl
      }
    }

    el = renderFn(props)

    return {
      el,
      update,
    }
  }

  const Component = {
    YearMonth: createUpdateableComponent(
      ({ year, month, prevMonthOnClick, nextMonthOnClick }) => {
        const prevMonthBtn = DOMUtils.makeElement({
          type: 'button',
          attributes: {
            textContent: 'Prev',
          },
          classNames: ['navigateMonth', 'button'],
          events: {
            click: prevMonthOnClick
          }
        })

        const nextMonthBtn = DOMUtils.makeElement({
          type: 'button',
          attributes: {
            textContent: 'Next',
          },
          classNames: ['navigateMonth', 'button'],
          events: {
            click: nextMonthOnClick,
          }
        })

        const monthYearText = DOMUtils.makeElement({
          type: 'span',
          attributes: {
            textContent: `${monthNames[month]} - ${year}`
          },
          classNames: ['yearText'],
        })

        const yearWrap = DOMUtils.makeElement({
          type: 'div',
          classNames: ['yearWrap'],
          children: [
            prevMonthBtn,
            monthYearText,
            nextMonthBtn,
          ],
        })

        return yearWrap
      }
    ),
    Days: createUpdateableComponent(
      ({ year, month, date, onClickFactory }) => {
        const daysWrapper = DOMUtils.makeElement({
          type: 'div',
          classNames: ['daysWrapper'],
        })

        // create numbers
        const numbers = Utils.generateDayNumbers({ year, month })
        numbers.forEach(number => {
          const disabled = typeof number === 'undefined'
          const numberEl = DOMUtils.makeElement({
            type: 'button',
            classNames: [
              'day', 'button',
              disabled ? 'disabled' : undefined,
              number === date ? 'active' : undefined,
            ],
            attributes: {
              disabled,
              textContent: number,
            },
            ...disabled ? {} : {
              events: {
                click: onClickFactory(number)
              }
            },
          })

          daysWrapper.appendChild(numberEl)
        })

        return daysWrapper
      }
    ),
  }

  const mapSTPDate = (st) => ({ selectedDate: st.selectedDate })

  const initInput = () => {
    const input = DOMUtils.makeElement({
      type: 'input',
      attributes: {
        name: 'date-input',
        type: 'text',
        id: 'date-input'
      },
      classNames: ['input'],
    })
    const state = store.getState()

    input.value = Utils.formatDate(state.selectedDate)
    store.subscribeToStore(mapSTPDate)(props => {
      input.value = Utils.formatDate(props.selectedDate)
    })

    return input
  }

  const initYearMonth = () => {
    // create listeners
    const prevMonthOnClick = () => {
      const currentSelectedDate = store.getState().selectedDate
      // jump to previous day in last month
      store.setState({
        selectedDate: new Date(
          currentSelectedDate.getFullYear(),
          currentSelectedDate.getMonth(),
          0,
        )
      })
    }

    const nextMonthOnClick = () => {
      const currentSelectedDate = store.getState().selectedDate
      // jump to first day in next month
      store.setState({
        selectedDate: new Date(
          currentSelectedDate.getFullYear(),
          currentSelectedDate.getMonth() + 1,
          1,
        )
      })
    }

    // create YearMonthElement
    const state = store.getState()
    const { year, month, date } = Utils.getYearMonthDate(state.selectedDate)
    const yearMonth = Component.YearMonth({
      year,
      month,
      prevMonthOnClick,
      nextMonthOnClick,
    })

    // create subscribers
    store.subscribeToStore(mapSTPDate)(props => {
      const { year, month } = Utils.getYearMonthDate(props.selectedDate)
      yearMonth.update({ year, month, prevMonthOnClick, nextMonthOnClick })
    })

    return yearMonth
  }

  const initDays = () => {
    const state = store.getState()
    const { year, month, date } = Utils.getYearMonthDate(state.selectedDate)

    const onClickFactory = num => e => {
      const state = store.getState()
      const { year, month } = Utils.getYearMonthDate(state.selectedDate)

      store.setState({
        selectedDate: new Date(year, month, num)
      })
    }

    const days = Component.Days({
      year, month, date,
      onClickFactory,
    })

    store.subscribeToStore(mapSTPDate)(props => {
      const { year, month, date } = Utils.getYearMonthDate(props.selectedDate)
      days.update({ year, month, date, onClickFactory })
    })

    return days
  }

  const init = () => {
    const fragment = document.createDocumentFragment()
    const calendarWrapper = DOMUtils.makeElement({
      type: 'div',
      classNames: ['calendar'],
    })
    const input = initInput()

    // create yearMonth
    const yearMonth = initYearMonth()

    // create dayNames
    const dayNamesElement = dayNames.map(dayName => DOMUtils.makeElement({
      type: 'div',
      classNames: ['dayName'],
      attributes: {
        textContent: dayName
      },
    }))

    // create days
    const days = initDays()

    fragment.appendChild(input)
    fragment.appendChild(calendarWrapper)
    calendarWrapper.appendChild(yearMonth.el)
    dayNamesElement.forEach(el => {
      calendarWrapper.appendChild(el)
    })
    calendarWrapper.appendChild(days.el)

    containerElement.appendChild(fragment)
  }

  init()
}

createCalendar({
  containerElement: document.querySelector('#calendar-container')
})