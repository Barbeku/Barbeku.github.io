const schedule = {
  Понедельник: [
    'Важное',
    'Литература',
    'Общество',
    'Геометрия',
    'Родной',
    'Физ-ра',
    'Инорматика',
  ],

  Вторник: [
    'Психология',
    'История',
    'Литература',
    'Вероятности',
    'Физ-ра',
    'Английский',
    'Литература',
  ],

  Среда: [
    'Алгебра',
    'Биология',
    'Физика',
    'Химия',
    'Английский',
    'ОБЖ',
    'Русский',
  ],

  Четверг: [
    'Профминимум',
    'Алгебра',
    'История',
    'Литература',
    'Общество',
    'Родной',
    'Русский',
  ],

  Пятница: [
    'Литература',
    'Общество',
    'Геометрия',
    'Английский',
    'Общество',
    'География',
    'Индивид',
    'Физика',
  ]
}
const schoolDelay = 2

function convertIntoMinute(string){
  let [hours, minutes] = string.split(':')
  return Number(hours)*60 + Number(minutes) + schoolDelay
}
let callSchedule = [
  '8:00', '8:40',
  '8:50', '9:30',
  '9:40', '10:20',
  '10:35', '11:15',
  '11:25', '12:05',
  '12:15', '12:55',
  '13:05', '13:45',
  '13:55', '14:35',
  '14:45', '15:25',
]
callSchedule = callSchedule.map(convertIntoMinute)


let day = new Date().getDay()

if(document.querySelector('.diary_content')){
  const diaryContent = document.querySelector('.diary_content')
  //console.log(diaryContent)

  let diaryContentInHtml = ''
  for(let day in schedule){
    let countLesson = 0
    let lessons = schedule[day].reduce((totalString, item) => {
      countLesson++
      return totalString += `<span class="lesson">${countLesson}. ${item}</span>`
    }, `<h2 class="day_today">${day}</h2>`)
    diaryContentInHtml += `<section class="day">${lessons}</section>`
  }

  diaryContent.innerHTML = diaryContentInHtml

}

if(document.querySelector('.schedule')){
  const scheduleToday = document.querySelector('.schedule')
  let days = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
  }
  day = days[day]

  let countLesson = 0
  let lessons = schedule[day].reduce((totalString, item) => {
    countLesson++
    return totalString += `
      <div class="lesson">
        <span>${countLesson}. ${item}</span>
        <span class="recess"></span>
      </div>
    `
  }, `<h2 class="day_today">${day}</h2>`)
  scheduleToday.innerHTML = `<section class="day">${lessons}</section>`

  //nowTime = convertIntoMinute('10:40')



  function calcNowLesson(){
    let date = new Date()
    let nowTime = date.getHours()*60 + date.getMinutes() + schoolDelay
    let timeToNextLesson = []

    let numOfCurrentLesson = callSchedule.map((item, index) => {
      if(item > nowTime){
        timeToNextLesson.push(item - nowTime)

        return index
      }
    })
      .filter(Boolean)[0]

    try{
      document.querySelector('.time_to_next_lesson').textContent = timeToNextLesson[0]

      Array.from(document.querySelectorAll('span'), element => {
        element.style.background = ''
      })
      document.querySelectorAll('span')[numOfCurrentLesson - 1].style.background = 'rgba(255, 70, 70, 0.8)'
    }
    catch(error){
      console.warn(error)
    }
  }
  calcNowLesson()

  setInterval(calcNowLesson, 100)

  
  //чёт урок, нечёт перемена

}
