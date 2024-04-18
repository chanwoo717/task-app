<template>
  <div class="weatherView">
    <div class="headerWeather">
      <h1 class="weat-search"> Today's Weather </h1>
      <div class="weat-search search-city">
        <div class="searchbar">
          <input type="text" class="input" @keyup.enter="searchWeather" v-model="city" placeholder="Enter a City">
        </div>
        <button class="btn-search origin-search" @click="searchWeather">Search <img src='../assets/search_icon.png' alt=''> </button>
      </div>
    </div>
    <br>
    <WeatherApp :city="cityName"  />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import WeatherApp from '../components/WeatherApp.vue';

export default defineComponent({
  name: 'WeatherView',
  components: {
    WeatherApp,
  },

  data() {
    return {
      city: '',
      cityName:'',
      showWeather: false,
    }
  },

  methods: {
    async searchWeather() {
      this.cityName = this.city;
    },
  }

})

</script>
<style>


.headerWeather {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.25rem;
  background-color: #212730;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  margin-top: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19);

}

h1.weat-search{
  margin: 0 auto 30px;
}

.search-city{
  display: flex;
}

.searchbar>input{
  width: 300px;
  font-size: 1.25rem;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: none;
}

.btn-search {
  height: 43px;
  background-image: linear-gradient(to right, rgb(4, 175, 175), rgb(255, 118, 84));
  border-style: hidden;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 5px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
}

.origin-search{
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-search:hover {
  transform: scale(0.9);
  transition: transform 0.1s ease;
}

.btn-search>img{
  width: 18px;
  margin-left: 5px;
}

</style>