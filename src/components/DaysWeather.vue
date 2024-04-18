<template>
    <div class="days">
        <div v-if='loading' class="loading">Loading..</div>
        <ul v-else class="each-day">
            <li v-for="day in forecast" :key='day.date' class="li-active">
                <div class="each-deta"><img :src="day.iconUrl"></div>
                <div class="each-deta">{{getDayName(day.date)}}</div>
                <div class="each-deta">{{day.temperature}}&deg;C</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import moment from 'moment';

    export default defineComponent({
        name:'DaysWeather',
        props:{
            cityname: String,
        },
        data(){
            return {
                forecast : [],
                loading : true,
                iconUrl : null,
            }
        },
        mounted(){
            this.fetchWeatherData();
        },
        methods:{
            async fetchWeatherData(){
                const apiKey = 'f67e61cc51768e03f63add9847d177ea';
                const city = this.cityname;
                const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&id&appid=${apiKey}`;
                await axios.get(apiUrl).then(Response =>{
                    const forecastData = Response.data.list;
                    const filteredData = forecastData.map(item =>{
                        return {
                            date : moment(item.dt_txt.split(' ')[0]),
                            temperature : Math.round(item.main.temp),
                            description : item.weather[0].description,
                            iconUrl:`http://api.openweathermap.org/img/w/${item.weather[0].icon}.png`,
                        };
                    }).reduce((acc,item)=>{
                        if(!acc.some(day => day.date.isSame(item.date, 'day'))){
                            acc.push(item);
                        }
                        return acc;
                    },[]).slice(1,5);
                    console.log(filteredData, "working");
                    this.forecast = filteredData;
                    this.loading = false;
                }).catch(error =>{
                    console.error('Error fetching weather data: ', error);
                    this.loading = false;
                });
            },
            getDayName(date){
                return date.format('ddd')
            }
        }
    })
</script>

<style lang="scss" scoped>
    .days{
        width: 90%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19);
        border-radius: 20px;
        width: 90%;
        margin: auto;
        
    }
    .loading{
        color: #fff;
    }
    ul{
        margin: 0;
    }
    li{
        display: inline-block;
        list-style: none;
        height: 100%;
        width: 21%;
        max-width: 21%;
        font-size: 1vw;
        line-height: 1.2;
        text-align: center;
    }
    span{
        display: block;
        margin-bottom: 5px;
        font: 100% sans-serif;
        height: 35px;
    }
    .li-active {
        background:#253d5c;
        border-radius: 10px;
        margin: 0.5rem;
        color: #fff;
    }
    .li-active:hover{
        transform: scale(1.1);
        transition: transform 0.2s ease;
    }
    
    .each-day{
        padding: 0;
    }
    .each-deta{
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
</style>