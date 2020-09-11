let loc = document.getElementById('location')
let current = document.getElementById('current')
let tempIcon = document.getElementById('temp-icon')
let tempValue = document.getElementById('temp-value')
let climate = document.getElementById('climate')
let pres = document.getElementById('pressure')
let humid = document.getElementById('humidity')
let time = document.getElementById('time')
let code = document.getElementById('country-code')
let rise = document.getElementById('sunrise')
let set = document.getElementById('sunset')
let iconFile;

var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')

// register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("./serviceWorker.js")
        .then((res) => {
            console.log("service worker registered")
            // check if localstorage is supported and data already exists
            cachedData();
        })
        .catch(err => console.log("service worker not registered", err))
    })
  }


function cachedData(){
    if (typeof(Storage) === "undefined") {
        // If localstorage is not supported.
        return setError('Note: Local Storage is not supported on this device')
    }
    let cachedData = localStorage.getItem('cachedData');
    if (cachedData !== null && cachedData.length > 1){
        // show the cachedData DATA
        return displayData(JSON.parse(cachedData));
    }
}

function displayData(data){
    // display data
        const {name} = data
        const {pressure} = data.main;
        const {feels_like} = data.main;
        const {humidity} = data.main;
        const {id, main} = data.weather[0];
        const {dt} = data;
        // const d = new Date();
        const {country} = data.sys;
        const {sunrise} = data.sys;
        const {sunset} = data.sys;

        loc.textContent = name;
        code.textContent = country;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - 273);
        pres.textContent = pressure;
        humid.textContent = humidity;
        current.textContent = name;

        //Getting api Date
        let dateapi = new Date(dt * 1000);
        let hours = dateapi.getHours();
        let minutes = '0' + dateapi.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2);
        // let seconds = '0' + date.getSeconds()+ ':' + seconds.substr(-2)
                    
        //Getting Sunrise Time
        let inset = new Date (sunrise * 1000);
        let hrs = inset.getHours();
        let min = '0' + inset.getMinutes();
        let sun = hrs + ':' + min.substr(-2);

        //Getting Sunset Time
        let out = new Date (sunset * 1000);
        let hors = out.getHours();
        let mins = '0' + out.getMinutes();
        let moon = hors + ':' + mins.substr(-2);


        rise.textContent = sun;
        set.textContent = moon;
        time.textContent = formattedTime;
        if (id < 250){
        tempIcon.src = './icons/storm.svg'
        } else if(id < 350){
            tempIcon.src = './icons/drizzle.svg'
        }else if(id < 550){
            tempIcon.src = './icons/rain.svg'
        }else if(id < 650){
            tempIcon.src = './icons/snow.svg'
        }else if(id < 800){
            tempIcon.src = './icons/atmosphere.svg'
        }else if(id === 800){
            tempIcon.src = './icons/clear.svg'
        }else if(id > 800) {
            tempIcon.src = './icons/clouds.svg'
        }

        // save to localstorage
        localStorage.setItem('cachedData', JSON.stringify(data))
}

function setError(msg){
    let error = document.getElementById('error')
    error.style.display = 'block'
    error.innerHTML = msg
    setTimeout(() => {
        error.style.display = 'none'
    }, 3000);
}

button.addEventListener('click', () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=9f897c94b14e329020c130055104f0b4')
    .then(res => res.json())
    .then(data => displayData(data))  

.catch((err) => {
  setError('City not found. Please enter a valid city')
})
})