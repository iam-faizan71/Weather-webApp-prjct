// target and access classes 
let citySearch = document.querySelector(".weather_search")
let cityName = document.querySelector(".weather_city");
let Datetime = document.querySelector(".weather_date_time");
let w_forecaste = document.querySelector(".weather_forecast");
let w_icon= document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temp");
let w_min = document.querySelector(".weather_min");
let w_max = document.querySelector(".weather_max");

let Humadity = document.querySelector(".weather_humadity");
let Wind = document.querySelector(".weather_wind");
let Sunrise = document.querySelector(".weather_sunrise");
let Sunset = document.querySelector(".weather_sunset");
let Visiblity = document.querySelector(".weather_visibility");
let Precipitation = document.querySelector(".weather_precipitation");



// Day Date time formate
const getDateTime = (time) => {
    curDate = new Date(time);
    // console.log(curDate);

    const options = {
        weekday : 'long',
        year : 'numeric',
        month : 'long',
        day : 'numeric',
        hour : 'numeric'
        // minute : 'numeric',
    };
    
    const formatter = new Intl.DateTimeFormat("en-US",options);
    return formatter.format(curDate);
};



//Hour and Minute Formate 
const getTime = (time) => {
    curTime = new Date(time);
    // console.log(curTime);

    const options = {
        hour : 'numeric',
        minute : 'numeric',
        hour12 : true
    };

    const formatter = new Intl.DateTimeFormat("en-US",options);
    return formatter.format(curTime);
}



// Search area 
city = "Mumbai"

citySearch.addEventListener("submit",(e) => {
    e.preventDefault();

    let cityname = document.querySelector('.city_name');
    // console.log(cityname.value);

    city = cityname.value;

    getWeatherData();

    cityname.value = "";

});



// api fetch And call
const getWeatherData =  async () => {

    const weatherurl = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=RSnzjrTmLOSJMCjKXgE1JcRZyyMtpjtu`

    // // main api link
    // const weatherurl = "https://api.tomorrow.io/v4/weather/forecast?location=mumbai&apikey=IW0YRsXk51swpRnkwR0QkQLqU29hazAg.";

    try{
        const res = await fetch(weatherurl,{
            // method: 'GET', /////optional in Getting
            headers: {
                Accept: 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        // console.log(data);


        //destructure data from api 
        const {location,timelines} = data;
        const {name} = location;
        const {daily} = timelines;
        const {time,values} = daily[0];
        const {humidityAvg,sunriseTime,sunsetTime,temperatureApparentAvg,
            temperatureMin,temperatureMax,windSpeedAvg,visibilityAvg,
            precipitationProbabilityAvg} = values;
        

        // dynamicaly change data 
        cityName.innerHTML = name;
        Datetime.innerHTML = getDateTime(time);
        w_temp.innerHTML = `${temperatureApparentAvg.toFixed()}&#176`;
        w_min.innerHTML = `Min: ${temperatureMin.toFixed()}&#176`;
        w_max.innerHTML = `Max: ${temperatureMax.toFixed()}&#176`;

        Humadity.innerHTML =`${humidityAvg} %`;
        Wind.innerHTML =`${windSpeedAvg} kph`;
        Visiblity.innerHTML = `${visibilityAvg.toFixed()} km`;
        Precipitation.innerHTML = `${precipitationProbabilityAvg.toFixed()} mm`;
        Sunrise.innerHTML = getTime(sunriseTime);
        Sunset.innerHTML = getTime(sunsetTime);



       //error block
    }catch(err){

        alert("Can't Fetch Data, Try sometime latter ");
        err = "Can't Fetch Data, Try sometime latter";
        cityName.innerHTML = err;
        cityName.style.color= "red";
        // console.log(err);

    }

}

// by default page loaded
document.addEventListener("load",getWeatherData());