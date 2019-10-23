export const stringOperators = [
  {
    label: 'Bắt đầu bằng',
    filter: (text) => {
      return { regexp: `^${text}` }
    },
    operator: 'begins-with'
  },
  {
    label: 'Chứa',
    filter: (text) => {
      return { regexp: `/*${text}*/` }
    },
    operator: 'contains'
  },
  {
    label: 'Không chứa',
    filter: (text) => {
      return { regexp: `^((?!${text}).)*$` }
    },
    operator: "doesn't-contain"
  },
  {
    label: 'Kết thúc bằng',
    filter: (text) => {
      return { exgexp: `^*${text}$/` }
    },
    operator: 'ends-with'
  },
  {
    label: 'Bằng',
    filter: (text) => {
      return { eq: text }
    },
    operator: 'equal'
  },
  {
    label: 'Không bằng',
    filter: (text) => {
      return { neq: text }
    },
    operator: "doesn't-equal"
  }
]

export const numberOperators = [
  {
    label: 'Bằng',
    filter: (num) => {
      return { eq: num }
    },
    operator: 'equals'
  },
  {
    label: 'Lớn hơn',
    filter: (num) => {
      return { gt: num }
    },
    operator: 'greater-than'
  },
  {
    label: 'Nhỏ hơn',
    filter: (num) => {
      return { lt: num }
    },
    operator: 'less-than'
  },
  {
    label: 'Lớn hơn hoặc bằng',
    filter: (num) => {
      return { gte: num }
    },
    operator: "greater-than-or-equal"
  },
  {
    label: 'Nhỏ hơn hoặc bằng',
    filter: (num) => {
      return { lte: num }
    },
    operator: "less-than-or-equal"
  },
]

export const dateOperators = [
  {
    label: 'Vào ngày',
    filter: (date) => {
      return { eq: date }
    },
    operator: 'equals'
  },
  {
    label: 'Trước ngày',
    filter: (date) => {
      return { lt: date }
    },
    operator: 'less-than'
  },
  {
    label: 'Từ ngày',
    filter: (date) => {
      return { gte: date }
    },
    operator: 'greater-than-or-equal'
  },
  {
    label: 'Giữa hai ngày',
    filter: (dates) => {
      return {
        and: [{
          gte: dates[0]
        },
        { lte: dates[1] }
        ]
      }
    },
    operator: 'between'
  },
  {
    label: 'Năm',
    filter: (year) => {
      return {
        and: [{
          gte: new Date(`${year}/01/01`)
        },
        {
          lte: new Date(`${year}/12/31`)
        }]
      }
    },
    operator: 'equal-year'
  },
  {
    label: 'Vào tháng/năm',
    filter: (month) => {
      const year = Number(month.substr(0, 4))
      const monthOfYear = Number(month.substr(5, 2))

      const thisMonth = new Date(year.toString, monthOfYear.toString)

      let nextMonth
      if (monthOfYear === 12) {
        nextMonth = new Date((year + 1).toString, "1")
      } else {
        nextMonth = new Date(year.toString, (monthOfYear + 1).toString)
      }

      return {
        and: [{
          lt: nextMonth
        },
        {
          gte: thisMonth
        }]
      }
    },
    operator: 'equal-month-year'
  },
]