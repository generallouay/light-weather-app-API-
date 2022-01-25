
window.addEventListener('load' , () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>fetchCoords(position.coords.longitude , position.coords.latitude) 
        )
    }
})


function fetchCoords(long , lat){
    let unit = 'metric'
    getAPI(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&units=${unit}&appid=6a6d26ae2de02c83133bc877d6c4a53b`)
}


function getAPI(api){
    let tempDes = document.querySelector('.temp-description')
    let tempDeg = document.querySelector('.temp-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let mainIcon = document.getElementById('main-icon')

    fetch(api)
    .then(res => res.json())
    .then(data => {
        const {temp,weather} = data.current
        const {main , icon} = weather[0]
        tempDeg.innerHTML = Math.floor(temp)
        tempDes.innerHTML = main
        locationTimezone.innerHTML = data.timezone
        let link = `http://openweathermap.org/img/wn/${icon}@2x.png`
        mainIcon.setAttribute('src' , link)

    })
}