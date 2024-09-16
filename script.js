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
    .then(data => console.log(data.list))
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
        mainInfoContainer.innerHTML =`<p>${data.message}</p>`
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

