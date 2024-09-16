const search = document.getElementById('search')
search.addEventListener('click', () => {
    getWeather()
})

function getWeather (){
    const API_KEY = 'd5a36f3d4af637bcabd2d23665a84b18'
    const  city = document.getElementById('input_city').value

    if(!city){
        alert(`enter the city!`)
        return
    }

    const getWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`

    fetch(getWeatherUrl)
    .then(responese => responese.json())
    .then(data => displayWeather(data))
    .catch((error) => {
        console.log(`error fetching data ${error}`)
        alert(`please try again`)
    })

    fetch(forcastUrl)
    .then(responese => responese.json())
    .then((data) => {
        displayHourlyWeather(data.list)
    })
    .catch((error) => {
        console.log(`error fetching hourly weather data ${error}`)
        alert(`error fetching weather hourly please try again`)
    })
}

function displayWeather (data) {
    const weatherIcon = document.querySelector('.weather-icon')
    const weatherInfo = document.querySelector('.weather__main-text')
    const mainInfoContainer = document.querySelector('.weather__main-text')

    weatherIcon.innerHTML = ''
    weatherInfo.innerHTML = ''
    
    if(data.cod === '404'){
        mainInfoContainer.innerHTML =`<h1>${data.message}</h1>`
    } else{
        const tempData = `${Math.round(data.main.temp - 273.15)} °C` //convert to celcius
        const iconUrlCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconUrlCode}@4x.png`;
        const descriptionWeather = data.weather[0].description
        const city = data.name

        weatherIcon.innerHTML = `<img id="weather__icon" alt="" class="img_weather" src="${iconUrl}">`
        weatherInfo.innerHTML = 
        `           <h1 id="">${tempData}</h1>
                    <p id="">${city}</p>
                    <p id="">${descriptionWeather}</p>`
    }
    
}
function displayHourlyWeather(hourlyData){
    const hourlyContainer = document.querySelector('.weather__hourly')
    const hourBefore24 = hourlyData.slice(0, 6) //cut array
    console.log(hourBefore24)
    
    hourlyContainer.innerHTML = ''
    
    hourBefore24.forEach((item, itemIndex) => {
        const dateTime = new Date(item.dt * 1000).getHours() //convert tempstamp to miliseconds
        const temperature = Math.round(item.main.temp - 273.15) //conveert to celcius
        const iconCode = item.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        hourlyContainer.innerHTML += 
        `<div class="hourly__item" id="id-${itemIndex}">
        <span>${temperature}°C</span>
        <img src ="${iconUrl}" alt="icon" />
        <span>${dateTime}:00</span>
        </div>`

    })
}

