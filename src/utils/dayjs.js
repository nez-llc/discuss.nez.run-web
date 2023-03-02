import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'


const detailDate = (date) => {
  dayjs.extend(duration)

  let timeDiff = dayjs.duration(dayjs().diff(date))
  let result = ''

  if(timeDiff.years() > 0){
    result = `${timeDiff.years()}년 전`
  }else if(timeDiff.months() > 0){
    result = `${timeDiff.months()}개월 전`
  }else if(timeDiff.days() > 0){
    result = `${timeDiff.days()}일 전`
  }else if(timeDiff.hours() > 0){
    result = `${timeDiff.hours()}시간 전`
  }else if(timeDiff.minutes() > 0){
    result = `${timeDiff.minutes()}분 전`
  }else if(timeDiff.seconds() > 0){
    result = `${timeDiff.seconds()}초 전`
  }

  return result
}

export {
  detailDate
}