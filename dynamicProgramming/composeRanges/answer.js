function composeRanges(nums) {
  const separator = '->'

  const starts = []
  const ends = []
  nums.forEach((num, id) => {
      const prevNum = nums[id-1]
      if (typeof prevNum === 'undefined') {
          starts.push(num)
      }

      // if the increment with previous element is higher than 1
      if (num > prevNum + 1) {
          ends.push(prevNum)
          starts.push(num)
      }
  })
  
  ends.push(nums[nums.length - 1])
  return starts.map((start, id) => {
      const end = ends[id]
      if (start === end) {
          return start.toString()
      }
      return `${start}${separator}${end}`
  })
}
