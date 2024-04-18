<template>
    <div class="weather-pop" v-if="state" >
        <div class="small-pop">
            <div class="weather-box weather-left">
                <div class="weather-info">
                    <div class="weather-detail">
                        <h2 class="day">Today</h2>
                        <p class="date"> {{date}} </p>
                        <small> {{time}} </small>
                        <h2 class="place">{{name}} <small>{{country}}</small></h2>
                    </div>
                    <div class="temp">
                        <h1 class="weather-temp">{{temperature}}&deg;</h1>
                        <h2 class="desc">{{description}} <img :src='iconUrl'></h2>
                    </div>
                </div>
            </div>
            <div class="weather-box weather-right">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Sea Level</th>
                            <td v-if="sea_level > 0">{{sea_level}}</td>
                            <td v-else>- -</td>
                        </tr>
                        <tr>
                            <th>Humidity</th>
                            <td>{{humidity}}</td>
                        </tr>
                        <tr>
                            <th>Wind</th>
                            <td>{{wind}}</td>
                        </tr>
                    </tbody>
                </table>
                <DaysWeather :cityname="city"/>
                <div class="changeLoca">
                    <form action="">
                        <input type="button" value="Change Location" @click="changeLocation" class="btn-search changeLocaBtn">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { defineComponent } from 'vue';
import DaysWeather from './DaysWeather.vue';
import axios from 'axios';

export default defineComponent({

    name: 'WeatherApp',
    components: {
        DaysWeather,
    },
    props:{
        city:String        
    },
    data(){
        return {
            state:false,
            cityname: this.city,
            temperature: null,
            description: null,
            iconUrl: null,
            date: null,
            time: null,
            name: null,
            sea_level: null,
            wind: null,
            humidity: null,
            country: null,
            monthNames:['January','February','March','April','May','June','July','August','September','October','November','December']
        }
    },
    methods:{
        changeLocation(){
            window.location.reload();
        }
    },
    async updated(){
        try{
            
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&id&appid=f67e61cc51768e03f63add9847d177ea`);
            const weatherData = response.data;
            
            this.temperature = Math.round(weatherData.main.temp);
            this.description = weatherData.weather[0].description;
            this.name = weatherData.name;
            this.wind = weatherData.wind.speed;
            this.humidity = weatherData.main.humidity;
            this.sea_level = weatherData.main.sea_level;
            this.country = weatherData.sys.country;
            this.iconUrl = `http://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
            const d = new Date();
            this.date = d.getDate() + '-' + this.monthNames[d.getMonth()] + '-' + d.getFullYear();
            this.time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            this.state = true;
            
        }catch{
            this.state = false;
            alert('The information you have inserted is invalid, please check again!');
        }
    },
    
})

</script>
<style>

h2{
    margin: auto;
}

.card {
    order: none;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.weather-info{
    text-align: left;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
}

.date {
    margin-bottom: 0;
    color: #b8babd;
}

small{
    color: #b8babd;

}

.weather-temp {
    margin: 0;
    font-weight: 700;
    font-size: 3rem;
}

h2.day {
    font-size: 3rem;
    font-weight: 400;
}

.weather-box{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19);

}

.weather-left {
    border-radius: 20px;
    color: #fff;
    background-image: url('../assets/skybg.png');
    background-size: cover;
    background-position: center;
    background-blend-mode: overlay;
    background-color: rgba(0, 0, 0, 0.5);
    background-repeat: no-repeat;
    width: 50%;
    margin-right: 1px;
    
}

.temp {
    margin-top: 1.5rem;
}

.weather-left:hover {
    transform: scale(1.1);
    transition: transform 0.5s ease;
    z-index: 1;
}
.desc{
    color: #f8f9fa !important;
}
.weather-right {
    background-color: #212730;
    border-radius: 20px;
    flex: 1;
    color: #000;
    width: 50%;
}

.card-details {
    margin-left: 19px;
}

.table {
    position: relative;
    border-collapse: separate;
    border-spacing: 15px;
    width: 90%;
    text-align: left;
    max-width: 600px;
    margin: 5%;
}

th,
td {
    font-size: 18px;
    color: #fff;
}

td {
    text-align: right;
}

th {
    text-align: left;
}

table,
tr:hover {
    color: red;
}

.changeLocaBtn {

    margin: 1rem auto;
}

.changeLocaBtn:hover {
    transform: scale(0.9);
    transition: transform 0.1s ease;
}

.weather-pop {
    padding: 0;
}

.small-pop {
    display: flex;
}

.place {
    margin-top: 1rem;
}

</style>