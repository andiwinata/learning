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
  const createStore = initialState => {
    let state = initialState
    return {
      getState() {
        return state
      },
      setState(newState) {
        state = { ...state, ...newState }
        document.dispatchEvent('storeUpdated', { state })
      }
    }
  }

  const shallowEqual = (a, b) => {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    
    if (keysA.length !== keysB.length) return false
    return keysA.every(keyA => a[keyA] === b[keyA])
  }

  const subscribeToStore = mapStateToProps => update => {
    let prevProps
    document.addEventListener('storeUpdate', e => {
      const props = mapStateToProps(e.state)
      if (shallowEqual(props, prevProps)) {
        return
      }
      
      prevProps = props
      update(props)
    })
  }

  const State = {
    selectedDate: new Date(initialDate),
  }

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
      const firstDate = new Date(year, month, 1).getDate()
      const lastDate = new Date(year, month + 1, 0).getDate()

      return Array.from({ length: 7 * 5 }, (x, i) => i + 1)
        .map(dayId =>
          // return empty if day index is less than first date
          dayId < firstDate || dayId > lastDate ? undefined : dayId - firstDate + 1
        )
    },
    formatDate: (date) => {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
  }

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

  const createInitialWrapper = () => ({
    input: DOMUtils.makeElement({
      type: 'input',
      attributes: {
        name: 'date-input',
        type: 'text',
        id: 'date-input'
      },
      classNames: ['input'],
    }),
    calendarWrapper: DOMUtils.makeElement({
      type: 'div',
      classNames: ['calendar'],
    }),
  })

  const init = () => {
    const year = State.selectedDate.getFullYear()
    const month = State.selectedDate.getMonth()
    const date = State.selectedDate.getDate()

    const fragment = document.createDocumentFragment()

    const { input, calendarWrapper } = createInitialWrapper()
    input.value = Utils.formatDate(State.selectedDate)

    // create YearMonth
    const yearMonth = Component.YearMonth({
      year,
      month,
      prevMonthOnClick: () => { console.log('prev clicked') },
      nextMonthOnClick: () => { console.log('next clicked') },
    })

    // create Days
    const days = Component.Days({
      year, month, date,
      onClickFactory: function factory(num) {
        return e => {
          State.selectedDate = new Date(year, month, num)

          input.value = Utils.formatDate(State.selectedDate)
          days.update({ year, month, num, onClickFactory: factory })
        }
      },
    })

    fragment.appendChild(input)
    fragment.appendChild(calendarWrapper)
    calendarWrapper.appendChild(yearMonth.el)
    calendarWrapper.appendChild(days.el)

    containerElement.appendChild(fragment)
  }

  init()
}

createCalendar({
  containerElement: document.querySelector('#calendar-container')
})