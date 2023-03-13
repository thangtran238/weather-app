let search = document.querySelector('.search')
let city = document.querySelector('.city')
let country = document.querySelector('.country')
let value = document.querySelector('.value')
let shortDesc = document.querySelector('.short-desc')
let visibility = document.querySelector('.visibility span')
let wind = document.querySelector('.wind span')
let humidity = document.querySelector('.humidity span')
let time = document.querySelector('.time')
let content = document.querySelector('.content')
let body = document.querySelector('body')
let weather = document.querySelector('.weather')

async function changeWeatherUI(countrySearch) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${countrySearch}&appid=01f918775396dcb8c3b36f134a8ac540
  `
  let data = await fetch(apiURL).then(res => res.json()) 
  
  if (data.cod == 200) {
    content.classList.remove('hider')
    city.innerText = data.name;
    country.innerText = data.sys.country
    time.innerText = new Date().toLocaleString('vi')
    let temp =  Math.floor(data.main.temp -272,15)
    value.innerText = temp + ' ℃'
    shortDesc.innerText = data.weather[0] ? data.weather[0].description : ''
    visibility.innerText = data.visibility + 'm'
    wind.innerText = data.wind.speed +'m/s'
    humidity.innerText = data.main.humidity + '%'
    body.setAttribute('class','hot')

    if (temp < 25) {
      body.setAttribute('class', 'warm')
    }
    if (temp < 20) {
      body.setAttribute('class', 'cool')
    }
    if (temp < 15) {
      body.setAttribute('class', 'cold')
    }
  } else {
    content.classList.add('hider')
  }
} 
content.classList.add('hider')
search.addEventListener('keydown',e => {
  let input = search.value.trim()
  if (input) {
    content.classList.remove('hider')
  }
  if (e.key === 'Enter') {
    let countrySearch = search.value.trim()
    changeWeatherUI(countrySearch)
  }
})


